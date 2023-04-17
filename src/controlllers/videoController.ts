import { videoUpload } from "../config/multerConfig";
import videoModel from "../database/models/videoModel";

export const uploadVideo = async (req: any, res: any) => {
    try {
        const videoUrl = await videoUpload(req);
        const { originalname } = req.file;
        //console.log(`Uploading ${originalname}`);
        const video = await videoModel.findOne({ videoName: originalname });
        if (video) {
            res.status4(400).json({
                message: "Video already exists"
            });
        }
        else {


            const video = await videoModel.create({
                videoName: originalname,
                videoUrl
            })
            res.status(200).json({
                message: "Video uploaded successfully",
                data: video
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const getAllVideos = async (req: any, res: any) => {
    try {
        const videos = await videoModel.find();
        res.status(200).json({
            message: "Videos fetched successfully",
            data: videos
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
}