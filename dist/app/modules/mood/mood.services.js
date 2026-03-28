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
exports.MoodServices = void 0;
const mood_model_1 = require("./mood.model");
const createMood = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield mood_model_1.Mood.create(payload);
});
const getAllMoodByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield mood_model_1.Mood.find({ userId });
});
const getLastOne = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield mood_model_1.Mood.findOne({ userId }).sort({ createdAt: -1 });
});
const createWriteMood = (paload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield mood_model_1.WriteMood.create(paload);
});
const getSingleWriteMood = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield mood_model_1.WriteMood.findById(id);
});
const getWriteMoodByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield mood_model_1.WriteMood.find({ userId }).sort({ createdAt: -1 });
});
const deleteSingleWriteMood = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield mood_model_1.WriteMood.findByIdAndDelete(userId);
});
exports.MoodServices = {
    createMood,
    getAllMoodByUser,
    getLastOne,
    createWriteMood,
    getSingleWriteMood,
    getWriteMoodByUser,
    deleteSingleWriteMood,
};
