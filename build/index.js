"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var image_routes_1 = __importDefault(require("./routes/image.routes"));
var video_routes_1 = __importDefault(require("./routes/video.routes"));
dotenv_1.default.config();
require("./database");
var PORT = process.env.PORT;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', user_routes_1.default);
app.use('/image', image_routes_1.default);
app.use('/video', video_routes_1.default);
app.listen(process.env.PORT, function () {
    console.log('Server listening on port ' + PORT);
});
app.get('/', function (req, res) {
    res.status(200).json({ success: true, message: "Hello World!" });
});
