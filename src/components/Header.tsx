import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/authSlice";

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="h-18 flex justify-between items-center px-20 shadow-md ">
      <h1 className="uppercase text-3xl font-bold">Blog</h1>

      <nav className="text-white px-4">
        <ul className="flex space-x-10 items-center ">
          {user ? (
            <>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "btn px-5" : "px-5")}
              >
                Home
              </NavLink>
              <NavLink
                to="/my-blogs"
                className={({ isActive }) => (isActive ? "btn px-5" : "px-5")}
              >
                My Post
              </NavLink>

              <button
                onClick={() => {
                  dispatch(logout());
                }}
                className="btn btn-primary text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </ul>
      </nav>
    </header>
  );
};
