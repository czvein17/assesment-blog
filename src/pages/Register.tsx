import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { register } from "../redux/thunks/authThunks";

import { UserIcon } from "../components/icons/UserIcon";
import { PasswordIcon } from "../components/icons/PasswordIcon";
import { EmailIcon } from "../components/icons/EmailIcon";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, error, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const [localError, setLocalError] = useState<string | null>(null);
  const [creadentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cfmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    cfmPassword: false,
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(creadentials);

    if (
      !creadentials.name ||
      !creadentials.email ||
      !creadentials.password ||
      !creadentials.cfmPassword
    ) {
      setLocalError("All fields are required");
      return;
    }

    if (creadentials.password !== creadentials.cfmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    setLocalError(null);
    dispatch(
      register({
        name: creadentials.name,
        email: creadentials.email,
        password: creadentials.password,
      })
    );
  };

  useEffect(() => {
    if (!user && !loading && !error) return;
    navigate("/");
  }, [user, loading, error, navigate]);

  return (
    <div className="p-5 space-y-2 shadow-md card w-96 bg-base-100 card-xs">
      <h1 className="mx-auto font-bold uppercase">Register</h1>
      <form className="m-3 space-y-4 flex flex-col" onSubmit={handleRegister}>
        <div className="flex items-center w-full input input-md">
          <UserIcon />
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setCredentials((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
        </div>

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
            type={showPassword.password ? "text" : "password"}
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
            onClick={() =>
              setShowPassword((v) => ({ ...v, password: !v.password }))
            }
          >
            {showPassword.password ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex items-center w-full input input-md">
          <PasswordIcon />
          <input
            type={showPassword.cfmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="grow"
            value={creadentials.cfmPassword}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                cfmPassword: e.target.value,
              }))
            }
          />
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            tabIndex={-1}
            onClick={() =>
              setShowPassword((v) => ({ ...v, cfmPassword: !v.cfmPassword }))
            }
          >
            {showPassword.cfmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {localError && <p className="text-red-500">{localError}</p>}
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-gray-500">Registering...</p>}

        <button
          className="w-full mt-4 font-bold rounded-lg btn btn-primary"
          type="submit"
          name="register"
        >
          Register
        </button>

        <span className="mx-auto">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};
