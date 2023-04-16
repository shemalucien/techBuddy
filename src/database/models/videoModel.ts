import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
    videoName: string;
    videoId: string;
    videoUrl: string;
}

const VideoSchema: Schema = new Schema({
  videoName: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
},
{
  timestamps: true,
}
);

export default mongoose.model<IVideo>('Video', VideoSchema);