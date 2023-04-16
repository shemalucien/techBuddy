"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var MONGO_URI = process.env.MONGO_URI;
var app = (0, express_1.default)();
app.use(express_1.default.json());
//CONNECT TO MONGODB
mongoose_1.default.connect(MONGO_URI, {}).then(function () {
    console.log('Connected to MongoDB');
})
    .catch(function (err) {
    console.log(err);
});
