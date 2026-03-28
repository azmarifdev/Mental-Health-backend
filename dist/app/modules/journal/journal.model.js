"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Journal = void 0;
const mongoose_1 = require("mongoose");
const journalSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
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
}, { timestamps: true });
exports.Journal = (0, mongoose_1.model)('Journal', journalSchema);
