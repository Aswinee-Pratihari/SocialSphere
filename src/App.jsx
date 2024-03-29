import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import conf from "./conf/conf";
import Loader from "./components/Loader";
import authService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { logOut, login } from "./redux/authSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./components/Sidebar";
import AuthLayout from "./components/AuthLayout";
import BottomBar from "./components/BottomBar";

import { ToastBar, Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastVisitedRoute", location.pathname);
    const lastVisitedRoute = localStorage.getItem("lastVisitedRoute");
    if (lastVisitedRoute && lastVisitedRoute !== location.pathname) {
      // Redirect to the last visited route
      navigate(lastVisitedRoute);
    }
    const fetchUser = async () => {
      try {
        const user = await authService.getUser();
        // console.log(user);
        if (user != null) {
          setUser(user);
          dispatch(login(user));
        } else {
          dispatch(logOut());
          navigate("/login");
        }
      } catch (error) {
        setError(error?.message);
      }
      setLoading(false);
    };

    fetchUser();
  }, [location, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex  justify-center">
            {authStatus && (
              <>
                <div
                  className={`${
                    location.pathname !== "/chat" && "flex-1"
                  } sm:block hidden`}
                >
                  <SideBar lastVisitedRoute={location.pathname} />
                </div>

                <div className="fixed bg-gray-200 rounded-md shadow-md bottom-0  sm:hidden block w-full">
                  <BottomBar />
                </div>
              </>
            )}
            <div className="pb-10 sm:pb-0 sm:flex-[4]">
              <Toaster
                position="top-right" // Used to adapt the animation
              />
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
