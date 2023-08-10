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

export default class UserStore {
  user: UserResposne | null = null;
  refreshTokenTimeout: any;

  constructor() {
    makeAutoObservable(this);
  }

  get isUserLoggedIn() {
    return !!this.user;
  }

  login = async (credentials: LoginFormValues) => {
    try {
      const user = await axiosAgent.AccountOperations.login(credentials);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
    } catch (error: any) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
  };

  getCurrentUser = async () => {
    try {
      const user = await axiosAgent.AccountOperations.currentUser();
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
    } catch (error: any) {
      console.log(error);
    }
  };

  forgotPassword = async (email: string) => {
    try {
      await axiosAgent.AccountOperations.forgotPassword(email);
      toast.success("Email sent successfully");
    } catch (error) {
      throw error;
    }
  };

  resetPassword = async (resetPassValues: ResetPasswordValues) => {
    try {
      await axiosAgent.AccountOperations.resetPassword(resetPassValues);
      toast.success("Password reset successful");
    } catch (error: any) {
      throw error;
    }
  };

  changePassword = async (changePassValues: ChangePasswordValues) => {
    try {
      await axiosAgent.AccountOperations.changePassword(changePassValues);
    } catch (error) {
      throw error;
    }
  };

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

  private startRefreshTokenTimer(user: UserResposne) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
