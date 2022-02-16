import Router from 'express';
import passwordController from '@modules/users/controllers/ForgotPasswordController';
import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';


const passwordRouter = Router();
const forgotPasswordController = new passwordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required()
    }
  }),
  forgotPasswordController.create,
);

passwordRouter.patch(
  '/reset',
    
);

export default passwordRouter;
