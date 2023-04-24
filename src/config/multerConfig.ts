import cloudinary from "cloudinary";
import "dotenv/config";
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
cloudinary.v2.config({
 cloud_name: CLOUDINARY_CLOUD_NAME,
 api_key: CLOUDINARY_API_KEY,
 api_secret: CLOUDINARY_API_SECRET
})

export const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: string | null, arg1: boolean) => void) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("invalid image file!", false);
	}
};

export const videoFilter = (req: any, file: { mimetype: string; }, cb: (arg0: string | null, arg1: boolean) => void) => {
	if (file.mimetype.startsWith("video")) {
		cb(null, true);
	} else {
		cb("invalid video file!", false);
	}
};

export const imageUpload = async (req: { file: { path: any; }; }) => {
	let imageUrl = "";
	await cloudinary.v2.uploader.upload(
		req.file.path,
		async function (err: any, image: { url: string; }) {
			if (err) {
				console.log(err);
			}
			imageUrl = image.url;
		}
	);
	return imageUrl;
};

export const videoUpload = async (req: { file: { path: any } }) => {
  let videoUrl = "";
  await cloudinary.v2.uploader.upload(
    req.file.path,
    {
      resource_type: "video",
      folder: "video_uploads",
      eager: [{ format: "mp4", quality: "auto" }],
    },
    async function (error: any, result: any) {
      if (error) {
        console.error(error);
      } else {
        videoUrl = result.eager[0].url;
      }
    }
  );
  return videoUrl;
};
