import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRoutes } from "./routers/AppRoutes";
import { ToastContainer } from "react-toastify";
import { clearAuth } from "./redux/auth/authSlice";
import { fetchCurrentUser } from "./redux/auth/authOps";
import { getStoredToken } from "./utils/authUtils";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const { token, isLoggedIn, isRefreshing } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (token && !isLoggedIn && !isRefreshing) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, isLoggedIn, isRefreshing]);

  useEffect(() => {
    const checkAuthOnLoad = () => {
      try {
        const storedToken = getStoredToken();
        if (storedToken && !isLoggedIn) {
          dispatch(fetchCurrentUser());
        }
      } catch (error) {
        console.error("Error checking auth on load:", error);
        dispatch(clearAuth());
      }
    };

    checkAuthOnLoad();
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <div>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;
