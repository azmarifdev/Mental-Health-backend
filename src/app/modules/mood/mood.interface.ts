import { Document, Model } from 'mongoose';

export type Imood = {
   userId: string;
   mood: string;
} & Document;

export type MoodModel = Model<Imood>;

export type IWriteMood = {
   userId: string;
   mood: string;
   stepFirst: [];
   stepSecond: [];
   stepThird: [];
   stepFourth: [];
   stepFifth: [];
   stepSixth: [];
   stepSeventh: [];
   stepEighth: [];
} & Document;

export type WriteModel = Model<IWriteMood>;
