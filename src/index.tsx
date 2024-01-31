import ReactDOM from "react-dom/client";
import { StoreContext, store } from "./app/stores/Store";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";
import "./app/layout/App.css";
import "react-toastify/dist/ReactToastify.min.css";
import React from "react";

import global_en from "./language/en/global.json";
import global_pl from "./language/pl/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

const storedLang = localStorage.getItem("selectedLang");

i18next.init({
  interpolation: { escapeValue: false },
  lng: storedLang || "en",
  resources: {
    en: {
      global: global_en,
    },
    pl: {
      global: global_pl,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
      </StoreContext.Provider>
    </I18nextProvider>
  </React.StrictMode>
);
