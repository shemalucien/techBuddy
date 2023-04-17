import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  imageName: string;
  imageId: string;
  imageUrl: string;
}

const ImageSchema: Schema = new Schema({
  imageName: {
    type: String,
  },
  imageId: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
},
{
  timestamps: true,
}
);

export default mongoose.model<IImage>('Image', ImageSchema);
