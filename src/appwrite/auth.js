import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

//create a class which will be exported and used in all over the project
export class AuthServices {
  client = new Client();
  account;
  /*now we want to create a connection with client only when the object is being called
   *  for this we have to create a constructor inside the class
   */

  constructor() {
    this.client
      .setEndpoint(conf.appwrite_url) // Your API Endpoint
      .setProject(conf.appwrite_project_id); // Your project ID

    this.account = new Account(this.client);
  }

  //method for creating an account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //if user is already created then login the user
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("createAccountError : ", error);
    }
  }

  //login user
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("logInError : ", error);
    }
  }

  //get a user
  async getUser() {
    try {
      return this.account.get();
    } catch (error) {
      console.log("getUserError : ", error);
    }
  }

  //logout
  async logOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("logOutError : ", error);
    }

    return null;
  }
}

//creating an object out of the class
const authService = new AuthServices();

export default authService;
//exporting the object
