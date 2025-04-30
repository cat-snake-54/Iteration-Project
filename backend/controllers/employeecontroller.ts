import Employee from '../models/employeemodel.js';

const employeeController = {};

employeeController.submitEmployee = (req, res, next) => {
  const { firstName, lastName, role, age } = req.body;

  Employee.create({ firstName, lastName, role, age })
    .then((data) => {
      console.log('Submit employee success at /employee/👌', data);
      res.locals.employeeNew = data;

      return next();
    })
    .catch((err) => {
      console.error('Error with submitEmployee', err.message);
      res.status(500).json({ error: 'Submit Employee failed' });
    });
};

export default employeeController;
