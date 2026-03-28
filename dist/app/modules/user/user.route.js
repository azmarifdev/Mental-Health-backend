"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_controler_1 = require("./user.controler");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.validateRequest)(user_validation_1.UserValidation.createUserZodSchema), user_controler_1.UserControler.createUser);
router.post('/chat-with-ai/:id', (0, auth_1.auth)('user'), user_controler_1.UserControler.createChatMsg);
router.delete('/chat-with-ai/:id', (0, auth_1.auth)('user'), user_controler_1.UserControler.clearChatMsg);
router.get('/:id', (0, auth_1.auth)('user'), user_controler_1.UserControler.getSingleUser);
router.get('/', user_controler_1.UserControler.getAllUsers);
exports.UserRoutes = router;
