import * as z from "zod";

export interface vacationsCount {
  PAID: number;
  UNPAID: number;
  SICK: number;
  PENDING: number;
  MATERNITY: number;
}

export const VacationTypeSchema = z.union([
  z.literal("PAID"),
  z.literal("UNPAID"),
  z.literal("SICK"),
  z.literal("PENDING"),
  z.literal("MATERNITY"),
]);
export type VacationType = z.infer<typeof VacationTypeSchema>;

export interface VacationsList {
  start_date: Date;
  end_date: Date;
  type: VacationType;
}

export const VacationRequestSchema = z.object({
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format for fromDate",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format for toDate",
  }),
  document: z.string().optional(),
  vacationType: VacationTypeSchema,
  comments: z.string().optional(),
  halfDay: z.boolean().optional(),
  replacementId: z.number().optional(),
});
export type VacationRequest = z.infer<typeof VacationRequestSchema>;

export type VacationTypeId = {
  id: number;
};

export enum VacationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
export type VacationStatusId = {
  id: number;
};

export interface VacationsDB {
  id?: number;
  employee_id: number;
  start_date: string;
  end_date: string;
  vacation_type_id: number;
  req_status_id: number;
  comments?: string | null;
  half_day?: boolean;
  replacement_id?: number | null;
  validfrom?: Date;
  validuntil?: Date;
}

export interface Vacation {
  id: number;
  startDate: string;
  endDate: string;
  document?: string;
  comments?: string;
  duration: string;
  vacationType: VacationType;
  status: VacationStatus;
}
