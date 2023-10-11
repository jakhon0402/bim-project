import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "rsuite/dist/rsuite.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import LoginPage from "./pages/Login/LoginPage.jsx";
import {
  AuthenticatedRoutes,
  ProtectRoutes,
} from "./config/protectedRoutes.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectRoutes />}>
            <Route path='/*' element={<App />} />
          </Route>
          <Route element={<AuthenticatedRoutes />}>
            <Route path='/login' element={<LoginPage />} />
          </Route>
        </Routes>
        <ToastContainer
          // style={{ fontWeight: 500, color: "black" }}
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
