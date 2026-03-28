"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV || process.env.NODE_DEV || 'development',
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    frontend_url: process.env.FRONTEND_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    gemini: {
        api_key: process.env.GEMINI_API_KEY,
        model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    },
    jwt: {
        secret_token: process.env.JWT_SECKRET_TOKEN,
        secret_expires: process.env.JWT_EXPIRE_IN,
        refresh_token: process.env.JWT_REFRESH_TOKEN,
        refresh_expires: process.env.JWT_REFRESH_EXPIRE_IN,
    },
};
