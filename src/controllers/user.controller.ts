import { Request, Response } from 'express'
import db from '../models/db'
import HttpStatusCodes from '../helpers/httpStatusCodes'

async function getUser(req: Request, res: Response)
{
    const { userId } = req.params;
    try {
        if (!userId) {
           return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'UserId is empty.'});
        }
        const user = await db.select(['users.name', 'username', 'users.id as user_id', 'orgs.name as org_name', 'employees.employee_role', 'employees.no_vacation_days_left', 'employees.id as employee_id'])
            .from('users')
            .leftJoin('orgs', 'orgs.id', 'users.org_id')
            .leftJoin('employees', 'employees.user_id', 'users.id')
            .where({ 'users.id': userId })
            .first();
        
        if (!user) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'User does not exist. Please register.'});
        }
        const payload = { 
            userId: user.user_id, 
            employeeId: user.employee_id,
            userName: user.username, 
            name: user.name, 
            orgName: user.org_name, 
            employeeRole: user.employee_role, 
            noVacationDaysLeft: user.no_vacation_days_left 
        };
        res.json(payload)
    } catch(e) {
        console.error(e);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}

export { getUser };