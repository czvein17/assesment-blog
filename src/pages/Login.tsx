import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import type { AppDispatch, RootState } from "../redux/store";

import { EmailIcon } from "../components/icons/EmailIcon";
import { PasswordIcon } from "../components/icons/PasswordIcon";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [creadentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(login(creadentials));
    if (login.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="p-5 space-y-10 shadow-md card w-96 bg-base-100 card-xs">
      <h1 className="mx-auto font-bold uppercase">LOGIN</h1>
      <form className="m-3 space-y-4 flex flex-col" onSubmit={handleSumbit}>
        <div className="flex items-center w-full input input-md">
          <EmailIcon />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setCredentials((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
        </div>

        <div className="flex items-center w-full input input-md">
          <PasswordIcon />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="grow"
            value={creadentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <button
          className="w-full mt-4 font-bold rounded-lg btn btn-primary"
          type="submit"
          name="login"
        >
          Login
        </button>

        <span className="mx-auto ">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};
