"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalControler = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const journal_services_1 = require("./journal.services");
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const createJournal = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield journal_services_1.JournalServices.createJournal(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Create journal successfully..!!',
        data: result,
    });
}));
const gelAllJournal = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield journal_services_1.JournalServices.getAllJournal();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Get all journal successfully..!!',
        data: result,
    });
}));
const getSingleJournal = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield journal_services_1.JournalServices.getSingleJournal(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Get single journal successfully..!!',
        data: result,
    });
}));
const getJournalByUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield journal_services_1.JournalServices.getJournalByUser(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Get all journal  by user successfully..!!',
        data: result,
    });
}));
const deleteJournal = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield journal_services_1.JournalServices.deleteJournal(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Delete journal successfully..!!',
        data: result,
    });
}));
exports.JournalControler = {
    createJournal,
    gelAllJournal,
    getSingleJournal,
    getJournalByUser,
    deleteJournal,
};
