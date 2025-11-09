import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false); // avatar dropdown
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
          setOpen(false);
          setMenuOpen(false);
          toast.success("Logged out successfully!");
          navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <nav className="bg-green-900 text-white shadow-md py-3 px-6 flex justify-between items-center relative z-50">
      <Link to="/" className="text-2xl font-bold text-green-300">
        GreenNest
      </Link>

      <div className="hidden md:flex gap-6 text-lg">
        <Link to="/" className="hover:text-green-300 transition-colors">
          Home
        </Link>
        {user && (
          <>
            <Link to="/plants" className="hover:text-green-300 transition-colors">
              Plants
            </Link>
            <Link to="/profile" className="hover:text-green-300 transition-colors">
              My Profile
            </Link>
          </>
        )}
      </div>

      <div className="hidden md:flex relative">
        {user ? (
          <div className="flex items-center gap-3 relative">
            <img
                src={user.photoURL || "https://i.ibb.co/0Jmshvb/avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="absolute right-0 top-12 bg-white text-gray-800 rounded-lg shadow-lg p-3 w-48 z-50">
                  <p className="font-semibold border-b pb-2">
                    {user.displayName || "User"}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full bg-green-700 text-white rounded-lg py-1 hover:bg-green-800"
                  >
                    Logout
                  </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
                to="/auth/login"
                className="bg-green-700 px-4 py-1 rounded-lg hover:bg-green-800 transition-colors"
              >
                Login
            </Link>
            <Link
                to="/auth/registration"
                className="border border-green-500 px-4 py-1 rounded-lg hover:bg-green-700 transition-colors"
              >
                Register
            </Link>
          </div>
        )}
      </div>

      {/* Small Device Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-green-900 text-white flex flex-col items-start px-6 py-4 gap-3 md:hidden">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-300 transition-colors"
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                to="/plants"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-300 transition-colors"
              >
                Plants
              </Link>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-300 transition-colors"
              >
                My Profile
              </Link>
            </>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="mt-2 bg-green-700 text-white rounded-lg py-1 px-4 hover:bg-green-800 w-full text-left"
            >
              Logout
            </button>
          ) : (
            <>
                 <Link
                      to="/auth/login"
                      onClick={() => setMenuOpen(false)}
                      className="bg-green-700 px-4 py-1 rounded-lg hover:bg-green-800 transition-colors w-full text-center"
                  >
                    Login
                </Link>
                <Link
                      to="/auth/registration"
                      onClick={() => setMenuOpen(false)}
                      className="border border-green-500 px-4 py-1 rounded-lg hover:bg-green-700 transition-colors w-full text-center"
                  >
                    Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;