import { Router } from "express";
import multer, { StorageEngine } from "multer";
import {uploadVideo,getAllVideos } from "../controlllers/videoController";
import {adminauthorize,authorize} from "../middleware/auth";
const storage = multer.diskStorage({});
const router = Router();

const fileFilter = (req:any, file:any, cb:any) => {
    if (file.mimetype.startsWith("video")) {
        cb(null, true);
    } else {
        cb("invalid video file!", false);
    }
};
const uploads = multer({ storage, fileFilter });

router.post("/videoUpload",authorize,uploads.single("video"),uploadVideo);
router.get("/getallVideos",authorize,getAllVideos);

export default router;