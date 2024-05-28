import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IJournal } from './journal.interface';
import { Journal } from './journal.model';

const createJournal = (paloasd: IJournal): Promise<IJournal | null> => {
   return Journal.create(paloasd);
};
const getAllJournal = (): Promise<IJournal[] | null> => {
   return Journal.find().sort({ createdAt: -1 }).populate('user');
};
const getSingleJournal = (id: string): Promise<IJournal | null> => {
   return Journal.findOne({ _id: id });
};
const getJournalByUser = (userId: string): Promise<IJournal[] | null> => {
   return Journal.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user');
};
const deleteJournal = async (userId: string) => {
   console.log(userId);
   const isExist = await Journal.findById(userId);
   // console.log(isExist);
   if (!isExist)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Journal does not exist');

   return await Journal.deleteOne({ _id: userId });
};

export const JournalServices = {
   createJournal,
   getAllJournal,
   getSingleJournal,
   getJournalByUser,
   deleteJournal,
};
