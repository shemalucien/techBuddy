"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminauthorize = exports.authorize = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var JWT_SECRET = "amalitech";
var authorize = function (req, res, next) {
    var token = req.headers.authorization;
    token = token === null || token === void 0 ? void 0 : token.replace("Bearer ", "");
    console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token",
        });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log(decoded);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        req.body.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: error,
        });
    }
};
exports.authorize = authorize;
var adminauthorize = function (req, res, next) {
    var token = req.headers.authorization;
    token = token === null || token === void 0 ? void 0 : token.replace("Bearer ", "");
    console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token",
        });
    }
    var decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    if (decoded) {
        var jsonObject = JSON.stringify(decoded);
        var obj = JSON.parse(jsonObject);
        var role = obj.role;
        console.log("role", role);
        if (role === "admin") {
            next();
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
    }
};
exports.adminauthorize = adminauthorize;
