import { Schema, model } from 'mongoose';
import { IWriteMood, Imood, MoodModel, WriteModel } from './mood.interface';

const moodSchemas = new Schema<Imood, MoodModel>(
   {
      userId: {
         type: String,
         required: true,
      },
      mood: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const writeMoodSchema = new Schema<IWriteMood, WriteModel>(
   {
      userId: {
         type: String,
         required: true,
      },
      mood: {
         type: String,
         required: true,
      },
      stepFirst: [],
      stepSecond: [],
      stepThird: [],
      stepFourth: [],
      stepFifth: [],
      stepSixth: [],
      stepSeventh: [],
      stepEighth: [],
   },
   {
      timestamps: true,
   }
);

export const Mood = model<Imood, MoodModel>('Mood', moodSchemas);
export const WriteMood = model<IWriteMood, WriteModel>(
   'WriteMood',
   writeMoodSchema
);
