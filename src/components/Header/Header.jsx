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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="flex justify-between p-6 border border-transparent bg-[#1F1F1F] w-full h-[74px] rounded-[15px]">
        <div className="flex items-center gap-1">
          <svg width="42" height="17" className="">
            <use href="/sprite.svg#icon-Frame-8" />
          </svg>
          <p className="hidden lg:block text-lg font-bold">READ JOURNEY</p>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
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

        {/* Desktop User Info */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile Burger Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <div className="w-[40px] h-[40px] text-[#F9F9F9] border border-[#F9F9F9]/20 rounded-full bg-[#262626] text-[16px] flex items-center justify-center">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : user?.email
                ? user.email.charAt(0).toUpperCase()
                : "?"}
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-[#F9F9F9] hover:text-white transition-colors"
          >
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-menu" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleMobileMenu}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 w-80 h-full bg-[#1F1F1F] border-l border-[#F9F9F9]/20 p-6">
            {/* Close Button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-[#F9F9F9] hover:text-white transition-colors"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col py-[280px] px-[70px] items-center gap-6 mb-8">
              <NavLink
                to="/recommended"
                onClick={toggleMobileMenu}
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
                onClick={toggleMobileMenu}
                className={({ isActive }) =>
                  `pb-2 border-b-[3px] border-solid text-white transition ${
                    isActive ? "border-[#4F92F7]" : "border-transparent"
                  }`
                }
              >
                My library
              </NavLink>
            </nav>

            {/* Logout Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLogoutOpen(true);
                }}
                className="w-[91px] md:w-full h-[42px] border border-[#F9F9F9]/20 hover:bg-[#F9F9F9] hover:text-[#1F1F1F] rounded-[30px] cursor-pointer transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}

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
