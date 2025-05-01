import express from 'express';
import employeeController from '../controllers/employeecontroller.ts';
const router = express.Router();

router.post('/employee', employeeController.submitEmployee, (req, res) => {
  //console.log('Submit employee success at /employee/👌');
  res.status(200).json('Employee submitted!' + res.locals.employeeNew);
});

//* added a router to get the employees from database:
router.get('/profile', employeeController.getEmployees);

export default router;
