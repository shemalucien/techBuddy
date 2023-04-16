"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var videoController_1 = require("../controlllers/videoController");
var storage = multer_1.default.diskStorage({});
var router = (0, express_1.Router)();
var fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("video")) {
        cb(null, true);
    }
    else {
        cb("invalid video file!", false);
    }
};
var uploads = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
router.post("/videoUpload", uploads.single("video"), videoController_1.uploadVideo);
router.get("/getallVideos", videoController_1.getAllVideos);
exports.default = router;
