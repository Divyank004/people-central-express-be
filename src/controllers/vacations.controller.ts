import { Request, Response } from "express";
import db from "../models/db";
import HttpStatusCodes from "../helpers/httpStatusCodes";
import {
  VacationRequest,
  vacationsCount,
  VacationsList,
  VacationRequestSchema,
  VacationTypeId,
  VacationStatusId,
  VacationStatus,
  VacationsDB,
  Vacation,
  VacationType,
} from "../types/vacations";
import Holidays from "date-holidays";
import { UserResult } from "../types/user";
import { CountResult } from "../types/queries";

interface VacationHistoryDB {
  id: number;
  start_date: string;
  end_date: string;
  comments: string | null;
  vacation_type: string;
  status: string;
}

async function getVacationsCount(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "UserId is empty." });
    }
    const user = (await db
      .select("users.name")
      .from("users")
      .where({ "users.id": userId })
      .first()) as UserResult | undefined;

    if (!user) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "User does not exist. Please register." });
    }

    const vacationsList = (await db
      .select([
        "vacations.start_date",
        "vacations.end_date",
        "vacation_type.type",
      ])
      .from("vacations")
      .leftJoin("employees", "employees.id", "vacations.employee_id")
      .leftJoin("users", "users.id", "employees.user_id")
      .leftJoin(
        "vacation_type",
        "vacation_type.id",
        "vacations.vacation_type_id",
      )
      .where({ "users.id": userId })
      .andWhere("vacations.req_status_id", 2)) as VacationsList[];

    const noPendingRequests = (await db
      .count("vacations.id as count")
      .from("vacations")
      .leftJoin("employees", "employees.id", "vacations.employee_id")
      .leftJoin("users", "users.id", "employees.user_id")
      .where({ "users.id": userId })
      .andWhere("vacations.req_status_id", 1)
      .first()) as CountResult | undefined;
    // TODO Fetch country and state from DB
    const hd = new Holidays("DE", "NW");

    // Get holidays for this year
    const currentYear = new Date().getFullYear();
    const years = [currentYear];

    const holidayDates = new Set();
    years.forEach((year) => {
      const yearHolidays = hd.getHolidays(year);
      yearHolidays.forEach((holiday) => {
        // Only include public holidays
        if (holiday.type === "public") {
          holidayDates.add(holiday.date.toString());
        }
      });
    });
    console.log("holidayDates", holidayDates);
    function calculateVacationDays(startDate: Date, endDate: Date): number {
      let count = 0;
      const current = new Date(startDate);
      while (current <= endDate) {
        const dayOfWeek = current.getDay();
        // Skip weekends (0 = Sunday, 6 = Saturday)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          // Skip public holidays
          if (!holidayDates.has(current.toString())) {
            count++;
          }
        }
        current.setDate(current.getDate() + 1);
      }
      return count;
    }

    const vacationsCount: vacationsCount = {
      PAID: 0,
      UNPAID: 0,
      SICK: 0,
      PENDING: 0,
      MATERNITY: 0,
    };

    // Calculate days for each vacation
    vacationsList.forEach((vacation: VacationsList) => {
      const startDate = new Date(vacation.start_date);
      const endDate = new Date(vacation.end_date);
      const vacationDays = calculateVacationDays(startDate, endDate);
      const vacationType = vacation.type;
      if (Object.prototype.hasOwnProperty.call(vacationsCount, vacationType)) {
        vacationsCount[vacationType] += vacationDays;
      }
    });
    vacationsCount["PENDING"] = noPendingRequests
      ? parseInt(noPendingRequests.count, 10)
      : 0;
    const resp = [
      {
        id: 1,
        vacationType: "Paid",
        noOfDaysTaken: vacationsCount["PAID"],
      },
      {
        id: 2,
        vacationType: "UnPaid",
        noOfDaysTaken: vacationsCount["UNPAID"],
      },
      {
        id: 3,
        vacationType: "Sick",
        noOfDaysTaken: vacationsCount["SICK"],
      },
      {
        id: 4,
        vacationType: "Pending",
        noOfDaysTaken: vacationsCount["PENDING"],
      },
    ];

    console.log("vacationsList", vacationsList);
    res.json(resp);
  } catch (e) {
    console.error(e);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
}

async function createVacationRequest(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const { startDate, endDate, vacationType }: VacationRequest =
      VacationRequestSchema.parse(req.body);
    if (!userId || !startDate || !endDate || !vacationType) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "Missing required fields." });
    }
    const user = (await db
      .select("users.id", "employees.id as employee_id")
      .from("users")
      .leftJoin("employees", "employees.user_id", "users.id")
      .where({ "users.id": userId })
      .first()) as UserResult | undefined;

    if (!user || !user.employee_id) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "User does not exist." });
      // TODO logging
    }
    const vacationTypeIdResult = (await db
      .select("id")
      .from("vacation_type")
      .where("type", String(vacationType))
      .first()) as VacationTypeId | undefined;
    const vacationTypeId = vacationTypeIdResult
      ? vacationTypeIdResult.id
      : null;
    if (!vacationTypeId) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "Invalid vacation type chosen." });
    }
    const vacationStatusIdResult = (await db
      .select("id")
      .from("vacation_status")
      .where("status", VacationStatus.PENDING)
      .first()) as VacationStatusId | undefined;
    const vacationStatusId = vacationStatusIdResult
      ? vacationStatusIdResult.id
      : null;
    if (!vacationStatusId) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "Vacation status not found." });
    }
    const vacationReqData: VacationsDB = {
      employee_id: user.employee_id,
      start_date: startDate,
      end_date: endDate,
      vacation_type_id: vacationTypeId,
      req_status_id: vacationStatusId,
      validfrom: new Date(),
      validuntil: new Date("3000-12-31"),
    };
    const vacationCreated = await db("vacations")
      .insert(vacationReqData)
      .returning("id");
    return res.status(HttpStatusCodes.CREATED).json(vacationCreated[0]);
  } catch (e) {
    console.error(e);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
}

async function getVacationHistory(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "UserId is empty." });
    }

    const user = (await db
      .select("users.name")
      .from("users")
      .where({ "users.id": userId })
      .first()) as UserResult | undefined;

    if (!user) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "User does not exist. Please register." });
    }

    const vacationsHistory = (await db
      .select([
        "vacations.id",
        "vacations.start_date",
        "vacations.end_date",
        "vacations.comments",
        "vacation_type.type as vacation_type",
        "vacation_status.status as status",
      ])
      .from("vacations")
      .leftJoin("employees", "employees.id", "vacations.employee_id")
      .leftJoin("users", "users.id", "employees.user_id")
      .leftJoin("vacation_type", "vacation_type.id", "vacations.vacation_type_id")
      .leftJoin("vacation_status", "vacation_status.id", "vacations.req_status_id")
      .where({ "users.id": userId })
      .orderBy("vacations.start_date", "desc")) as VacationHistoryDB[];
    // TODO Fetch country and state from DB
    const hd = new Holidays("DE", "NW");
    const currentYear = new Date().getFullYear();
    const years = [currentYear];

    const holidayDates = new Set();
    years.forEach((year) => {
      const yearHolidays = hd.getHolidays(year);
      yearHolidays.forEach((holiday) => {
        if (holiday.type === "public") {
          holidayDates.add(holiday.date.toString());
        }
      });
    });
    // TODO Move the function to createVacation endpoint and store the duration in DB
    function calculateVacationDays(startDate: Date, endDate: Date): number {
      let count = 0;
      const current = new Date(startDate);
      while (current <= endDate) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          if (!holidayDates.has(current.toString())) {
            count++;
          }
        }
        current.setDate(current.getDate() + 1);
      }
      return count;
    }

    const formattedVacations: Vacation[] = vacationsHistory.map((vacation: VacationHistoryDB) => {
      const startDate = new Date(vacation.start_date);
      const endDate = new Date(vacation.end_date);
      const duration = calculateVacationDays(startDate, endDate);

      return {
        id: vacation.id,
        startDate: vacation.start_date,
        endDate: vacation.end_date,
        comments: vacation.comments || undefined,
        duration: `${duration} ${duration === 1 ? 'day' : 'days'}`,
        vacationType: vacation.vacation_type as VacationType,
        status: vacation.status as VacationStatus,
      };
    });

    res.json(formattedVacations);
  } catch (e) {
    console.error(e);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
}

export { getVacationsCount, createVacationRequest, getVacationHistory };
