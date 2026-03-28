"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mood_route_1 = require("./../modules/mood/mood.route");
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const journal_routes_1 = require("../modules/journal/journal.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/user',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes,
    },
    {
        path: '/mood',
        routes: mood_route_1.MoodRoutes,
    },
    {
        path: '/journal',
        routes: journal_routes_1.JournalRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
