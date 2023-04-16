"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var imageController_1 = require("../controlllers/imageController");
var multer_1 = __importDefault(require("multer"));
var express_1 = require("express");
var storage = multer_1.default.diskStorage({});
var router = (0, express_1.Router)();
var fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb("invalid image file!", false);
    }
};
var uploads = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
router.post("/imageUpload", uploads.single("photo"), imageController_1.upload);
router.get("/getallImages", imageController_1.getAllImages);
exports.default = router;
