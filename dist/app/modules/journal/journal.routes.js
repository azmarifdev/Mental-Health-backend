"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const journal_controler_1 = require("./journal.controler");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)('user'), journal_controler_1.JournalControler.createJournal);
router.get('/user/:id', (0, auth_1.auth)('user'), journal_controler_1.JournalControler.getJournalByUser);
router.get('/', (0, auth_1.auth)('user'), journal_controler_1.JournalControler.gelAllJournal);
router.get('/:id', (0, auth_1.auth)('user'), journal_controler_1.JournalControler.getSingleJournal);
router.delete('/:id', (0, auth_1.auth)('user'), journal_controler_1.JournalControler.deleteJournal);
exports.JournalRoutes = router;
