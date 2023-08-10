import ReactDOM from "react-dom/client";
import { StoreContext, store } from "./app/stores/Store";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";
import "./app/layout/App.css";
import "react-toastify/dist/ReactToastify.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
