import Employee from '../models/employeemodel.ts';
import { Request, Response, NextFunction } from 'express';

//define type for employeeController

type EmployeeControllerType = {
  submitEmployee: (req: Request, res: Response, next: NextFunction) => void;
};

const employeeController: EmployeeControllerType = {} as EmployeeControllerType;

employeeController.submitEmployee = (req, res, next) => {
  const { firstName, lastName, role, age } = req.body;

  Employee.create({ firstName, lastName, role, age })
    .then((data) => {
      console.log('Submit employee success at /employee/👌', data);
      res.locals.employeeNew = data;

      return next();
    })
    .catch((err: Error) => {
      console.error('Error with submitEmployee', err.message);
      res.status(500).json({ error: 'Submit Employee failed' });
    });
};

export default employeeController;
