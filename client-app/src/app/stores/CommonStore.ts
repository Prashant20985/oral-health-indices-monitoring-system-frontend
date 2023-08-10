import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
  token: string | null = localStorage.getItem("jwtToken");
  applocationLoaded = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem("jwtToken", token);
        } else {
          localStorage.removeItem("jwtToken");
        }
      }
    );
  }

  setToken = (token: string | null) => {
    this.token = token;
  };

  setAppLoaded = () => {
    this.applocationLoaded = true;
  };
}
