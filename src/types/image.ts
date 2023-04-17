import mongoose from "mongoose";
export interface IImage{
    imageName: string;
    imageId: mongoose.Types.ObjectId;
    imageUrl: string;
}
