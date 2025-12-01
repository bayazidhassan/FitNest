import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-[#0D9488] mb-4">
          Login
        </h2>

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
