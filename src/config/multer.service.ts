import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as multer from 'multer';

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'image',
      format: 'png',
      public_id: file.originalname,
    };
  },
});

export const MulterConfig = {
  storage: cloudinaryStorage,
};