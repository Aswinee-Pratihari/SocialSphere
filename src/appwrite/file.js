import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class File {
  client = new Client();

  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwrite_url) // Your API Endpoint
      .setProject(conf.appwrite_project_id);

    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwrite_bucket_id,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("file upload error: ", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwrite_bucket_id, fileId);
      return true;
    } catch (error) {
      console.log("file delete error: ", error);
      return false;
    }
  }

  filePreview(Image) {
    return this.bucket.getFilePreview(
      conf.appwrite_bucket_id,
      Image,
      1800, // width, will be resized using this value.
      0, // height, ignored when 0
      "center", // crop center
      "40", // slight compression
      0, // border width
      "CDCA30", // border color
      15, // border radius
      1, // full opacity
      0, // no rotation
      "FFFFFF", // background color
      "jpg"
    );
  }
}

const photos = new File();
export default photos;
