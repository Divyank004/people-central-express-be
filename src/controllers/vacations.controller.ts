import { Request, Response } from 'express'
import db from '../models/db'
import HttpStatusCodes from '../helpers/httpStatusCodes'
import { vacationsCount, VacationsList } from '../types/vacations';
import Holidays from 'date-holidays';

async function getVacationsCount(req: Request, res: Response) {
    const { userId } = req.params;
    try {
        if (!userId) {
           return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'UserId is empty.'});
        }
        const user = await db.select('users.name')
            .from('users')
            .where({ 'users.id': userId })
            .first();
        
        if (!user) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'User does not exist. Please register.'});
        }
        
        const vacationsList: VacationsList[] = await db.select(['vacations.start_date',
            'vacations.end_date', 'vacation_type.type'])
            .from('vacations')
            .leftJoin('employees', 'employees.id', 'vacations.employee_id')
            .leftJoin('users', 'users.id', 'employees.user_id')
            .leftJoin('vacation_type', 'vacation_type.id' ,'vacations.vacation_type_id')
            .where({ 'users.id': userId })
            .andWhere('vacations.req_status_id', 2);
        
        const noPendingRequests = await db.count(['vacations.start_date'])
            .from('vacations')
            .leftJoin('employees', 'employees.id', 'vacations.employee_id')
            .leftJoin('users', 'users.id', 'employees.user_id')
            .where({ 'users.id': userId })
            .andWhere('vacations.req_status_id', 1);
        // TODO Fetch country and state from DB
        const hd = new Holidays('DE', 'NW');
        
        // Get holidays for this year
        const currentYear = new Date().getFullYear();
        const years = [currentYear];
        
        const holidayDates = new Set();
        years.forEach(year => {
            const yearHolidays = hd.getHolidays(year);
            yearHolidays.forEach(holiday => {
                // Only include public holidays
                if (holiday.type === 'public') { 
                    holidayDates.add(holiday.date.toString());
                }
            });
        });
        console.log('holidayDates', holidayDates)
        // Calculate vacation days excluding public holidays
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
        
        // Initialize counters for each vacation type
        const vacationsCount: vacationsCount = {
            'PAID': 0,
            'UNPAID': 0,
            'SICK': 0,
            'PENDING': 0
        };
        
        // Calculate days for each vacation
        vacationsList.forEach((vacation: VacationsList) => {
            const startDate = new Date(vacation.start_date);
            const endDate =  new Date(vacation.end_date);
            const vacationDays = calculateVacationDays(startDate, endDate);
            const vacationType = vacation.type;
            if (Object.prototype.hasOwnProperty.call(vacationsCount, vacationType)) {
                vacationsCount[vacationType] += vacationDays;
            }
        });
        vacationsCount['PENDING'] = noPendingRequests[0].count
        const resp = [
            {
                id: 1,
                vacationType: 'Paid',
                noOfDaysTaken: vacationsCount['PAID']
            },
            {
                id: 2,
                vacationType: 'UnPaid',
                noOfDaysTaken: vacationsCount['UNPAID']
            },
            {
                id: 3,
                vacationType: 'Sick',
                noOfDaysTaken: vacationsCount['SICK']
            },
            {
                id: 4,
                vacationType: 'Pending',
                noOfDaysTaken: vacationsCount['PENDING']
            }
        ];
        
        console.log('vacationsList', vacationsList);
        res.json(resp);
    } catch(e) {
        console.error(e);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}

export { getVacationsCount };