import express from 'express';
import loginController from '../controllers/logincontroller.ts';
const router = express.Router();

router.post('/signup', loginController.createUser, (req, res) => {
  res.status(200).json('User created ' + res.locals.userNew);
});

router.post('/login', loginController.verifyUser, (req, res) => {
  res.status(200).json('User verified ' + res.locals.user);
});
export default router;
