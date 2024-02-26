import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
  });

export const uploadImage = async filePath => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};
export const deleteImage = async id=>{
    await cloudinary.uploader.destroy(id)
}

