import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { ToastContainer } from "react-toastify";
import { Profile, Layout, Register, Login } from "./components";
import UserContextProvider from "./context/UserContextProvider.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </UserContextProvider>
    <ToastContainer />
  </StrictMode>
);
