/* eslint-disable no-unused-vars */
import { IUser } from '../user';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
