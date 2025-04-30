import express from 'express';
import loginController from '../controllers/logincontroller.ts';
const router = express.Router();

router.post('/signup', loginController.createUser, (req, res) => {
  res.status(200).json(res.locals.userNew);
});

export default router;
