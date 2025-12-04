import { useState, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/api/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";

const Login = () => {
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const loginInfo = {
      email,
      password,
    };

    try {
      const user = await login(loginInfo).unwrap();
      const userInfo = {
        name: `${user.data.name.firstName} ${user.data.name.lastName}`,
        email: user.data.email,
        image: user.data.image,
      };
      dispatch(setUser(userInfo));
      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-center" />
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-center text-[#0D9488] mb-6">
            Login
          </h2>
          <Link to="/">
            <img
              src={"https://i.ibb.co/qMK6nT44/Fit-Nest-Logo.png"}
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-[#0D9488]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-[#0D9488]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#0D9488] text-white py-2 rounded hover:bg-[#0a766f] transition"
          >
            Login
          </button>
        </form>

        {/* Extra link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#0D9488] cursor-pointer hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
