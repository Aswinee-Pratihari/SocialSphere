import { Client, Databases, ID, Query } from "appwrite";
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

  async createPost({ caption, Image, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwrite_database_id,
        conf.appwrite_post_collection_id,
        ID.unique(),
        {
          caption,
          Image,
          userId,
          users: userId,
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
      throw error;
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

  async deletePost(Image) {
    try {
      await this.databases.deleteDocument(
        conf.appwrite_database_id,
        conf.appwrite_post_collection_id,
        Image
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
        conf.appwrite_post_collection_id,
        [Query.orderDesc("$createdAt")]
      );
    } catch (error) {
      console.log("getAllPostError", error);
      return null;
    }
  }

  async createUser({ name, email, id }) {
    try {
      // console.log(userData);
      return await this.databases.createDocument(
        conf.appwrite_database_id,
        conf.appwrite_user_collection_id,
        // ID.unique(),
        id,
        { name, email }
      );
    } catch (error) {
      console.log("createUserError", error);
      throw error;
      return null;
    }
  }

  async getAllUsers(query) {
    try {
      if (query?.length > 0) {
        return await this.databases.listDocuments(
          conf.appwrite_database_id,
          conf.appwrite_user_collection_id,
          [Query.search("name", query)]
        );
      } else {
        return await this.databases.listDocuments(
          conf.appwrite_database_id,
          conf.appwrite_user_collection_id
        );
      }
    } catch (error) {
      console.log("getAllUsersError", error);
      throw error;
    }
  }

  async getSingleUser(userId) {
    try {
      return await this.databases.getDocument(
        conf.appwrite_database_id,
        conf.appwrite_user_collection_id,
        userId
      );
    } catch (error) {
      console.log("getSingleUserError", error);
      throw error;
      return null;
    }
  }
}

const database = new Database();
export default database;
