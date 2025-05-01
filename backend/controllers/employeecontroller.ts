import Employee from '../models/employeemodel.ts';
import { Request, Response, NextFunction } from 'express';

//define type for employeeController

type EmployeeControllerType = {
  submitEmployee: (req: Request, res: Response, next: NextFunction) => void;
  getEmployees: (req: Request, res: Response) => void; //* added a getEmployees type
};

const employeeController: EmployeeControllerType = {} as EmployeeControllerType;

employeeController.submitEmployee = (req, res, next) => {
  const { firstName, lastName, role, severity } = req.body;

  Employee.create({ firstName, lastName, role, severity })
    .then((data) => {
      console.log('Submit employee success at /employee/👌', data);
      res.locals.employeeNew = data;

      return next();
    })
    .catch((err: any) => {
      console.error('Error with submitEmployee', err.message);
      res.status(500).json({ error: 'Submit Employee failed' });
    });
};

//* added a getEmployees controller
employeeController.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err: any) {
    console.error('❌ Error fetching employees:', err.message);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

export default employeeController;
