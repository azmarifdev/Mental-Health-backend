"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { validateRequest } from '../../middleware/validateRequest';
const user_1 = require("../../../enums/user");
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidation.createLoginZodSchema), auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidation.createRefreshTokenZodSchema), (0, auth_1.auth)(user_1.USER_ROLE.USER), auth_controller_1.AuthController.refreshToken);
router.get('/logout', (0, auth_1.auth)(user_1.USER_ROLE.USER), auth_controller_1.AuthController.logout);
router.post('/change-password', (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidation.changePasswordZodSchema), (0, auth_1.auth)(user_1.USER_ROLE.USER), auth_controller_1.AuthController.changePassword);
exports.AuthRoutes = router;
