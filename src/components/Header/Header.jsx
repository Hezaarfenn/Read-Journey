import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/auth/authOps";
import { NavLink } from "react-router-dom";
import { persistor } from "../../redux/store";
import { toast } from "react-toastify";
import BaseModal from "../BaseModal/BaseModal";
import Logout from "../Logout/Logout";

const Header = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      await persistor.purge();
      toast.success("Logout successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.", error);
    } finally {
      setIsLogoutOpen(false);
    }
  };

  return (
    <>
      <header className="flex justify-between p-6 border border-transparent bg-[#1F1F1F] w-full h-[74px] rounded-[15px]">
        <div className="flex items-center gap-1">
          <svg width="42" height="17" className="">
            <use href="/sprite.svg#icon-Frame-8" />
          </svg>
          <p className="text-lg font-bold">READ JOURNEY</p>
        </div>

        <div className="flex items-center gap-10">
          <NavLink
            to="/recommended"
            className={({ isActive }) =>
              `pb-2 border-b-[3px] border-solid text-white transition ${
                isActive ? "border-[#4F92F7]" : "border-transparent"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/library"
            className={({ isActive }) =>
              `pb-2 border-b-[3px] border-solid text-white transition ${
                isActive ? "border-[#4F92F7]" : "border-transparent"
              }`
            }
          >
            My library
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[40px] text-[#F9F9F9] border border-[#F9F9F9]/20 rounded-full bg-[#262626] text-[16px] flex items-center justify-center ">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : user?.email
                ? user.email.charAt(0).toUpperCase()
                : "?"}
          </div>
          <div className="text-[16px] font-bold text-[#F9F9F9]">
            {user?.name || user?.email}
          </div>
          <button
            onClick={() => setIsLogoutOpen(true)}
            className="w-[114px] h-[42px] border border-[#F9F9F9]/20 hover:bg-[#F9F9F9] hover:text-[#1F1F1F] rounded-[30px] cursor-pointer"
          >
            Log out
          </button>
        </div>
      </header>

      {isLogoutOpen && (
        <BaseModal
          isOpen={isLogoutOpen}
          onRequestClose={() => setIsLogoutOpen(false)}
        >
          <Logout
            onRequestClose={() => setIsLogoutOpen(false)}
            onConfirm={handleLogout}
          />
        </BaseModal>
      )}
    </>
  );
};

export default Header;
