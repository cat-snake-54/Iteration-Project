import express from 'express';
import employeeController from '../controllers/employeecontroller.ts';
const router = express.Router();

router.post('/employee', employeeController.submitEmployee, (req, res) => {
  //console.log('Submit employee success at /employee/👌');
  res.status(200).json(res.locals.employeeNew);
});

export default router;
