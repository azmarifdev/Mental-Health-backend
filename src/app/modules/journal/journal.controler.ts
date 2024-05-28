import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { JournalServices } from './journal.services';
import { sendResponse } from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { IJournal } from './journal.interface';

const createJournal = catchAsync(async (req: Request, res: Response) => {
   const result = await JournalServices.createJournal(req.body);

   sendResponse<IJournal>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Create journal successfully..!!',
      data: result,
   });
});
const gelAllJournal = catchAsync(async (req: Request, res: Response) => {
   const result = await JournalServices.getAllJournal();

   sendResponse<IJournal[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Get all journal successfully..!!',
      data: result,
   });
});
const getSingleJournal = catchAsync(async (req: Request, res: Response) => {
   const result = await JournalServices.getSingleJournal(req.params.id);

   sendResponse<IJournal>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Get single journal successfully..!!',
      data: result,
   });
});

const getJournalByUser = catchAsync(async (req: Request, res: Response) => {
   const result = await JournalServices.getJournalByUser(req.params.id);

   sendResponse<IJournal[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Get all journal  by user successfully..!!',
      data: result,
   });
});
const deleteJournal = catchAsync(async (req: Request, res: Response) => {
   const result = await JournalServices.deleteJournal(req.params.id);

   sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Delete journal successfully..!!',
      data: result,
   });
});

export const JournalControler = {
   createJournal,
   gelAllJournal,
   getSingleJournal,
   getJournalByUser,
   deleteJournal,
};
