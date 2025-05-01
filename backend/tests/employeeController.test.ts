import employeeController from '../controllers/employeecontroller';
import Employee from '../models/employeemodel';
import { Request, Response, NextFunction } from 'express';

jest.mock('../models/employeemodel');

describe('employeeController.submitEmployee', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'Engineer',
        age: 30,
      },
    };

    res = {
      locals: {},
      //* jest.fn creates a mock function and mockreturnthis is the return
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it('should create a new employee and call next()', (done) => {
    const mockData = { ...req.body, _id: '1234' };
    (Employee.create as jest.Mock).mockResolvedValue(mockData);

    employeeController.submitEmployee(req as Request, res as Response, next);

    process.nextTick(() => {
      expect(Employee.create).toHaveBeenCalledWith(req.body);
      expect(res.locals?.employeeNew).toEqual(mockData);
      expect(next).toHaveBeenCalled();
      done();
    });
  });

  //* can use with try & Catch or if no promise is returned
  // it('should return 500 and error message on failure', async () => {
  //   (Employee.create as jest.Mock).mockRejectedValue(new Error('Database error'));

  //   await employeeController.submitEmployee(req as Request, res as Response, next);

  //   expect(Employee.create).toHaveBeenCalled();
  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.json).toHaveBeenCalledWith({ error: 'Submit Employee failed' });
  //   expect(next).not.toHaveBeenCalled();
  // });

  it('should return 500 and error message on failure', (done) => {
    (Employee.create as jest.Mock).mockRejectedValue(new Error('Database error'));

    employeeController.submitEmployee(req as Request, res as Response, next);

    process.nextTick(() => {
      expect(Employee.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Submit Employee failed',
      });
      expect(next).not.toHaveBeenCalled();
      done();
    });
  });
});
