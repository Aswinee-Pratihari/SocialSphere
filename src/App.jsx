import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import conf from "./conf/conf";
import Loader from "./components/Loader";
import authService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { logOut, login } from "./redux/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./components/Sidebar";
import AuthLayout from "./components/AuthLayout";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getUser();
        // console.log(user);
        if (user != null) {
          setUser(user);
          dispatch(login(user));
          navigate("/");
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
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex  justify-center">
            {authStatus && (
              <div className="flex-1">
                <SideBar />
              </div>
            )}
            <div className="flex-[4]">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
