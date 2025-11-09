import ThemeToggle from "./ThemeToggle";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@redux/slices/authSlice";
import { clearCart } from "@redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "@components/LoginModal";

export default function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const count = useSelector((s) => s.cart?.items?.length ?? 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart()); // clears everything: items, count, subtotal on logout
  };

  return (
    <>
    <div
      className="
        sticky top-0 z-50
        backdrop-blur-md bg-lightCard/85 dark:bg-darkBg2/80
        border-b border-lightBorder dark:border-darkBorder
        shadow-[0_2px_6px_rgba(15,23,42,0.07)]
        px-6
      "
    >
      <div className="h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          E-Store
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-lightPrimary dark:text-darkPrimary">
                Hi, {user.name || user.email}
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg border border-lightBorder dark:border-darkBorder"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setOpenLogin(true)}
              className="px-4 py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600 shadow-subtle"
            >
              Login
            </button>
          )}
          <button onClick={() => navigate("/cart")} className="px-4 py-2 rounded-lg border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard">
            Cart ({count})
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
    <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
}
