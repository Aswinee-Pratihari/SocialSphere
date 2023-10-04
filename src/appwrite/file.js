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

  filePreview(fileId) {
    return this.bucket.deleteFile(conf.appwrite_bucket_id, fileId);
  }
}

const photos = new File();
export default photos;
