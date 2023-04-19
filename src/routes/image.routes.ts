import {upload,getAllImages } from "../controlllers/imageController";
import multer from "multer"
import {Router} from "express";
import {adminauthorize,authorize} from "../middleware/auth";
const storage = multer.diskStorage({});
const router = Router();

const fileFilter = (req:any, file:any, cb:any) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("invalid image file!", false);
    }
};
const uploads = multer({ storage, fileFilter });
router.post("/imageUpload",  uploads.single("photo"),upload);
router.get("/getallImages", getAllImages);

export default router; 