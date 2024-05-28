/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const chatSchema = new Schema(
   {
      role: {
         type: String,
      },
      content: {
         type: String,
      },
   },
   { timestamps: true }
);

const userSchema = new Schema<IUser, UserModel>(
   {
      name: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         default: 'user',
      },
      email: {
         type: String,
         unique: true,
         required: true,
      },
      password: {
         type: String,
         required: true,
         select: 0,
      },
      avatar: {
         type: String,
         required: true,
      },

      chat: {
         type: [chatSchema],
         default: [],
      },
   },
   {
      timestamps: true,
      toJSON: {
         virtuals: true,
      },
   }
);

// userSchema.pre('save', async function (next) {
//    let user = this;
//    user.password = await bcrypt.hash(
//       user.password,
//       Number(config.bcrypt_salt_rounds)
//    );
//    next();
// });

userSchema.pre('save', async function (next) {
   let user = this;
   if (user.isModified('password')) {
      // Check if password is modified
      const saltRounds = Number(config.bcrypt_salt_rounds);
      user.password = await bcrypt.hash(user.password, saltRounds);
   }
   next();
});

export const User = model<IUser, UserModel>('User', userSchema);
