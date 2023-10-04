import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import conf from "./conf/conf";
import Loader from "./components/Loader";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { logOut, login } from "./redux/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getUser();
        console.log(user);
        if (user) {
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
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
