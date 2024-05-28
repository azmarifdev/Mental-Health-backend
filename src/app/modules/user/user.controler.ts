import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserServices } from './user.services';

const createUser = catchAsync(async (req: Request, res: Response) => {
   const result = await UserServices.createUser(req.body);

   sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User Created successfully..!!',
      data: result,
   });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
   const result = await UserServices.getSingleUser(req.params.id);

   sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User fetch successfully..!!',
      data: result,
   });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
   const result = await UserServices.getAllUsers();

   sendResponse<IUser[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Users fetch successfully..!!',
      data: result,
   });
});

const createChatMsg = catchAsync(async (req: Request, res: Response) => {
   const result = await UserServices.createChatMsg(req.params.id, req.body);

   sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Create message successfully..!!',
      data: result,
   });
});
const clearChatMsg = catchAsync(async (req: Request, res: Response) => {
   const result = await UserServices.clearChatMsg(req.params.id);

   sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Clear chat message successfully..!!',
      data: result,
   });
});
export const UserControler = {
   createUser,
   getSingleUser,
   getAllUsers,
   createChatMsg,
   clearChatMsg,
};
