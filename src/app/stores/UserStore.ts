import axiosAgent from "../api/axiosAgent";
import {
  ChangePasswordValues,
  LoginFormValues,
  ResetPasswordValues,
  UserResposne,
} from "../models/User";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./Store";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

/**
 * Represents a UserStore class that manages user-related operations.
 */
export default class UserStore {
  // Represents the user property.
  user: UserResposne | null = null;

  // Represents the refreshTokenTimeout property.
  refreshTokenTimeout: NodeJS.Timeout | number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  // Gets the login status of the user.
  get isUserLoggedIn() {
    return !!this.user;
  }

  /**
   * Logs in the user with the provided credentials.
   * 
   * @param credentials - The login form values containing the user's credentials.
   * @returns A Promise that resolves to the logged-in user.
   * @throws An error if the login fails.
   */
  login = async (credentials: LoginFormValues) => {
    try {
      const user = await axiosAgent.AccountOperations.login(credentials);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
      router.navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /**
   * Logs out the user by clearing the token, setting the user to null, and navigating to the login page.
   */
  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/login");
  };

  /**
   * Retrieves the current user from the server.
   * 
   * @returns {Promise<void>} A promise that resolves when the current user is retrieved successfully.
   * @throws {Error} If there is an error while retrieving the current user.
   */
  getCurrentUser = async () => {
    try {
      const user = await axiosAgent.AccountOperations.currentUser();
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Sends a forgot password email to the specified email address.
   * 
   * @param email - The email address to send the forgot password email to.
   * @throws If an error occurs while sending the email.
   */
  forgotPassword = async (email: string) => {
    try {
      await axiosAgent.AccountOperations.forgotPassword(email);
      toast.success("Email sent successfully");
      router.navigate("/login");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /**
   * Resets the user's password.
   * 
   * @param resetPassValues - The values needed to reset the password.
   * @returns A Promise that resolves when the password is reset successfully.
   * @throws If an error occurs during the password reset process.
   */
  resetPassword = async (resetPassValues: ResetPasswordValues) => {
    try {
      await axiosAgent.AccountOperations.resetPassword(resetPassValues);
      toast.success("Password reset successful");
      router.navigate("/login");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /**
   * Changes the password for the user.
   * 
   * @param changePassValues - The values required to change the password.
   * @throws {Error} - If an error occurs while changing the password.
   */
  changePassword = async (changePassValues: ChangePasswordValues) => {
    try {
      await axiosAgent.AccountOperations.changePassword(changePassValues);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /**
   * Refreshes the user's token.
   * 
   * This method stops the refresh token timer, sends a request to the server to refresh the token,
   * updates the user object with the new token, sets the new token in the common store,
   * and starts the refresh token timer again.
   * 
   * @returns {Promise<void>} A promise that resolves when the token is successfully refreshed.
   * @throws {Error} If an error occurs during the token refresh process.
   */
  refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
      const user = await axiosAgent.AccountOperations.refreshToken();
      runInAction(() => (this.user = user));
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Starts the refresh token timer for the user.
   * 
   * @param user - The user response object.
   */
  private startRefreshTokenTimer(user: UserResposne) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }

  /**
   * Stops the refresh token timer.
   */
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
