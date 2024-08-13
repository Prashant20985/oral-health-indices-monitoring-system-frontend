import { makeAutoObservable, reaction } from "mobx";

/**
 * Represents the CommonStore class.
 * This class is responsible for managing common state and functionality in the application.
 */
export default class CommonStore {
  // Represents the token property.
  token: string | null = localStorage.getItem("jwtToken");

  // Represents the applocationLoaded property.
  applocationLoaded = false;

  constructor() {
    makeAutoObservable(this);

    // Reaction to the token property.
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

  // Represents the setToken method
  setToken = (token: string | null) => {
    this.token = token;
  };

  // Represents the setAppLoaded method
  setAppLoaded = () => {
    this.applocationLoaded = true;
  };
}
