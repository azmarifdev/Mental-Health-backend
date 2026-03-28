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
exports.User = void 0;
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const chatSchema = new mongoose_1.Schema({
    role: {
        type: String,
    },
    content: {
        type: String,
    },
}, { timestamps: true });
const userSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// userSchema.pre('save', async function (next) {
//    let user = this;
//    user.password = await bcrypt.hash(
//       user.password,
//       Number(config.bcrypt_salt_rounds)
//    );
//    next();
// });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        if (user.isModified('password')) {
            // Check if password is modified
            const saltRounds = Number(config_1.default.bcrypt_salt_rounds);
            user.password = yield bcrypt_1.default.hash(user.password, saltRounds);
        }
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', userSchema);
