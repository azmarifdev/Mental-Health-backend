import { Schema, Types, model } from 'mongoose';
import { IJournal, JournalModel } from './journal.interface';

const journalSchema = new Schema<IJournal, JournalModel>(
   {
      user: {
         type: Types.ObjectId,
         ref: 'User',
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      desc: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

export const Journal = model<IJournal, JournalModel>('Journal', journalSchema);
