"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodRoutes = void 0;
const express_1 = __importDefault(require("express"));
const mood_controller_1 = require("./mood.controller");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)('user'), mood_controller_1.MoodControler.createMood);
router.get('/:id', (0, auth_1.auth)('user'), mood_controller_1.MoodControler.getAllMoodByUser);
router.get('/get-last/:id', (0, auth_1.auth)('user'), mood_controller_1.MoodControler.getLastOne);
// write mood routes
router.post('/write', (0, auth_1.auth)('user'), mood_controller_1.MoodControler.createWriteMood);
router.get('/write/user/:id', (0, auth_1.auth)('user'), mood_controller_1.MoodControler.getWriteMoodByUser);
router.get('/write/:id', (0, auth_1.auth)('user'), mood_controller_1.MoodControler.getSingleWriteMood);
router.delete('/write/:id', (0, auth_1.auth)('user'), mood_controller_1.MoodControler.deleteSingleWriteMood);
exports.MoodRoutes = router;
