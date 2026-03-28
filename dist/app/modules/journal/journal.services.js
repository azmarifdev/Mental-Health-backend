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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const journal_model_1 = require("./journal.model");
const createJournal = (paloasd) => {
    return journal_model_1.Journal.create(paloasd);
};
const getAllJournal = () => {
    return journal_model_1.Journal.find().sort({ createdAt: -1 }).populate('user');
};
const getSingleJournal = (id) => {
    return journal_model_1.Journal.findOne({ _id: id });
};
const getJournalByUser = (userId) => {
    return journal_model_1.Journal.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate('user');
};
const deleteJournal = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId);
    const isExist = yield journal_model_1.Journal.findById(userId);
    // console.log(isExist);
    if (!isExist)
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Journal does not exist');
    return yield journal_model_1.Journal.deleteOne({ _id: userId });
});
exports.JournalServices = {
    createJournal,
    getAllJournal,
    getSingleJournal,
    getJournalByUser,
    deleteJournal,
};
