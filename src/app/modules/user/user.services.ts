/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser | null> => {
   const normalizedPayload = {
      ...payload,
      email: payload?.email?.trim().toLowerCase(),
   };
   const result = await User.create(normalizedPayload);
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

   const userMessage = payload?.data;
   const content = userMessage?.content?.toString()?.trim();

   if (!content) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Message content is required');
   }

   const normalizedUserMessage = {
      role: 'user',
      content,
   };

   // Include recent context for continuity while limiting token usage.
   const recentHistory = ((userExist.chat as any[]) || []).slice(-10);

   let assistantContent =
      "I'm here for you. Share a bit more and we can process this together.";

   if (config.gemini.api_key) {
      const geminiContents = [
         ...recentHistory.map(item => ({
            role: item?.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: item?.content || '' }],
         })),
         {
            role: 'user',
            parts: [{ text: content }],
         },
      ];

      const response = await fetch(
         `https://generativelanguage.googleapis.com/v1beta/models/${config.gemini.model}:generateContent?key=${config.gemini.api_key}`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               system_instruction: {
                  parts: [
                     {
                        text: 'You are a supportive mental health companion. Be empathetic, practical, calm, and concise. Do not provide diagnosis.',
                     },
                  ],
               },
               contents: geminiContents,
               generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 400,
               },
            }),
         }
      );

      if (!response.ok) {
         const errorBody = await response.text();
         throw new ApiError(
            StatusCodes.BAD_REQUEST,
            `Gemini API request failed: ${errorBody}`
         );
      }

      const geminiData = await response.json();
      const parts = geminiData?.candidates?.[0]?.content?.parts || [];
      const textFromGemini = parts
         .map((part: any) => part?.text || '')
         .join('')
         .trim();

      assistantContent = textFromGemini || assistantContent;
   } else {
      assistantContent =
         'GEMINI_API_KEY is not configured in backend .env. Add it to enable real AI responses.';
   }

   const assistantMessage = {
      role: 'assistant',
      content: assistantContent,
   };

   const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { chat: { $each: [normalizedUserMessage, assistantMessage] } } },
      { new: true }
   );

   return updatedUser;
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
