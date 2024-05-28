/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser | null> => {
   const result = await User.create(payload);
   return result;
};
const getSingleUser = async (id: string): Promise<IUser | null> => {
   return await User.findById(id);
};
const getAllUsers = async (): Promise<IUser[] | null> => {
   return await User.find();
};

const createChatMsg = async (
   id: string,
   payload: any
): Promise<IUser | null> => {
   const userExist = await User.findById(id);

   if (!userExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
   }

   await User.findByIdAndUpdate(
      id,
      { $push: { chat: payload.data } },
      { new: true }
   );

   await userExist.save();
   return userExist;
};
const clearChatMsg = async (id: string): Promise<IUser | null> => {
   const userExist = await User.findById(id);

   if (!userExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
   }

   userExist.chat = [];

   await userExist.save();
   return userExist;
};

export const UserServices = {
   createUser,
   getSingleUser,
   getAllUsers,
   createChatMsg,
   clearChatMsg,
};
