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
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const normalizedPayload = Object.assign(Object.assign({}, payload), { email: (_a = payload === null || payload === void 0 ? void 0 : payload.email) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase() });
    const result = yield user_model_1.User.create(normalizedPayload);
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findById(id);
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find();
});
const createChatMsg = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f;
    const userExist = yield user_model_1.User.findById(id);
    if (!userExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const userMessage = payload === null || payload === void 0 ? void 0 : payload.data;
    const content = (_c = (_b = userMessage === null || userMessage === void 0 ? void 0 : userMessage.content) === null || _b === void 0 ? void 0 : _b.toString()) === null || _c === void 0 ? void 0 : _c.trim();
    if (!content) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Message content is required');
    }
    const normalizedUserMessage = {
        role: 'user',
        content,
    };
    // Include recent context for continuity while limiting token usage.
    const recentHistory = (userExist.chat || []).slice(-10);
    let assistantContent = "I'm here for you. Share a bit more and we can process this together.";
    if (config_1.default.gemini.api_key) {
        const geminiContents = [
            ...recentHistory.map(item => ({
                role: (item === null || item === void 0 ? void 0 : item.role) === 'assistant' ? 'model' : 'user',
                parts: [{ text: (item === null || item === void 0 ? void 0 : item.content) || '' }],
            })),
            {
                role: 'user',
                parts: [{ text: content }],
            },
        ];
        const response = yield fetch(`https://generativelanguage.googleapis.com/v1beta/models/${config_1.default.gemini.model}:generateContent?key=${config_1.default.gemini.api_key}`, {
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
        });
        if (!response.ok) {
            const errorBody = yield response.text();
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Gemini API request failed: ${errorBody}`);
        }
        const geminiData = yield response.json();
        const parts = ((_f = (_e = (_d = geminiData === null || geminiData === void 0 ? void 0 : geminiData.candidates) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.content) === null || _f === void 0 ? void 0 : _f.parts) || [];
        const textFromGemini = parts
            .map((part) => (part === null || part === void 0 ? void 0 : part.text) || '')
            .join('')
            .trim();
        assistantContent = textFromGemini || assistantContent;
    }
    else {
        assistantContent =
            'GEMINI_API_KEY is not configured in backend .env. Add it to enable real AI responses.';
    }
    const assistantMessage = {
        role: 'assistant',
        content: assistantContent,
    };
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, { $push: { chat: { $each: [normalizedUserMessage, assistantMessage] } } }, { new: true });
    return updatedUser;
});
const clearChatMsg = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.User.findById(id);
    if (!userExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    userExist.chat = [];
    yield userExist.save();
    return userExist;
});
exports.UserServices = {
    createUser,
    getSingleUser,
    getAllUsers,
    createChatMsg,
    clearChatMsg,
};
