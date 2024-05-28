import { Document, Model, ObjectId } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IJournal = {
   user: ObjectId | IUser;
   title: string;
   desc: string;
} & Document;

export type JournalModel = Model<IJournal>;
