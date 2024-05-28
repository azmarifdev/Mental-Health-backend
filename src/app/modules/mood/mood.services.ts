import { IWriteMood, Imood } from './mood.interface';
import { Mood, WriteMood } from './mood.model';

const createMood = async (payload: Imood) => {
   return await Mood.create(payload);
};
const getAllMoodByUser = async (userId: string): Promise<Imood[] | null> => {
   return await Mood.find({ userId });
};
const getLastOne = async (userId: string): Promise<Imood | null> => {
   return await Mood.findOne({ userId }).sort({ createdAt: -1 });
};
const createWriteMood = async (
   paload: IWriteMood
): Promise<IWriteMood | null> => {
   return await WriteMood.create(paload);
};
const getSingleWriteMood = async (id: string): Promise<IWriteMood | null> => {
   return await WriteMood.findById(id);
};
const getWriteMoodByUser = async (
   userId: string
): Promise<IWriteMood[] | null> => {
   return await WriteMood.find({ userId }).sort({ createdAt: -1 });
};
const deleteSingleWriteMood = async (userId: string) => {
   return await WriteMood.findByIdAndDelete(userId);
};

export const MoodServices = {
   createMood,
   getAllMoodByUser,
   getLastOne,
   createWriteMood,
   getSingleWriteMood,
   getWriteMoodByUser,
   deleteSingleWriteMood,
};
