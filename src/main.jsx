import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import {
  Home,
  Search,
  SignUp,
  Login,
  Profile,
  LikedPostPage,
} from "./pages/index.js";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx";
import ChatApp from "./pages/ChatPage.jsx";
import UserList from "./pages/UserList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={true}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signUp",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/search",
        element: (
          <AuthLayout authentication={true}>
            <Search />
          </AuthLayout>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/likedPost",
        element: (
          <AuthLayout authentication={true}>
            <LikedPostPage />
          </AuthLayout>
        ),
      },
      {
        path: "/chat",
        element: (
          <AuthLayout authentication={true}>
            <UserList />
          </AuthLayout>
        ),
      },
      {
        path: "/chat/:id",
        element: (
          <AuthLayout authentication={true}>
            <ChatApp />
          </AuthLayout>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
