"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteMood = exports.Mood = void 0;
const mongoose_1 = require("mongoose");
const moodSchemas = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    mood: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const writeMoodSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Mood = (0, mongoose_1.model)('Mood', moodSchemas);
exports.WriteMood = (0, mongoose_1.model)('WriteMood', writeMoodSchema);
