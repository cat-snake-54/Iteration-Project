import User from '../models/loginmodel.ts';
import { Request, Response, NextFunction } from 'express';

type LoginControllerType = {
  createUser: (req: Request, res: Response, next: NextFunction) => void;
};
const loginController: LoginControllerType = {} as LoginControllerType;

loginController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next({ err: 'Missing username or password!' });
    }
    if (password.length < 6)
      return next({ err: 'password must be at least 6 characters long' });
    const data = await User.create({ username, password });
    res.locals.userNew = data;
    console.log('New user saved', data);
    return next();
  } catch (err: any) {
    console.error('Error with createUser', err.message);
    res.status(500).json({ error: 'Create user failed' });
  }
};

export default loginController;
