import { imageUpload } from "../config/multerConfig";
import imageModel from "../database/models/imageModel";

export const upload = async (req: any, res: any) => {
    try{
    const imageUrl = await imageUpload(req);
    const { originalname } = req.file;
    console.log(`Uploading ${originalname}`);
    const image = await imageModel.findOne({ imageName: originalname });
    if (image) {
        res.status(400).json({
            message: "Image already exists"
        });
    }
    else {
        const image = await imageModel.create({
            imageName: originalname,
            imageUrl
        });
        res.status(200).json({
            message: "Image uploaded successfully",
            data: image
        });
    }}
    catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
}
export const getAllImages = async (req: any, res: any) => {
    try {
        const images = await imageModel.find();
        res.status(200).json({
            message: "Images fetched successfully",
            data: images
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
}