import { Client, Databases } from "appwrite";
import conf from "../conf/conf";

export class Database {
  client = new Client();

  databases;
  constructor() {
    this.client
      .setEndpoint(conf.appwrite_url) // Your API Endpoint
      .setProject(conf.appwrite_project_id);

    this.databases = new Databases(this.client);
  }

  async createPost({ caption, slug, Image, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwrite_database_id,
        conf.appwrite_post_collection_id,
        slug,
        {
          caption,
          Image,
          userId,
        }
      );
    } catch (error) {
      console.log("createPostError", error);
      return null;
    }
  }

  async getSinglePost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwrite_database_id,
        conf.appwrite_post_collection_id,
        slug
      );
    } catch (error) {
      console.log("getSinglePostError", error);
      return null;
    }
  }

  async updatePost(slug, { caption, Image, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwrite_database_id,
        conf.appwrite_post_collection_id,
        slug,
        {
          caption,
          Image,
          userId,
        }
      );
    } catch (error) {
      console.log("UpdateDocumentError", error);
      return null;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwrite_database_id,
        conf.appwrite_post_collection_id,
        slug
      );

      return true;
    } catch (error) {
      console.log("DeletePostError", error);
      return false;
    }
  }

  async getAllPost() {
    try {
      return await this.databases.listDocuments(
        conf.appwrite_database_id,
        conf.appwrite_post_collection_id
      );
    } catch (error) {
      console.log("getAllPostError", error);
      return null;
    }
  }
}

const database = new Database();
export default database;