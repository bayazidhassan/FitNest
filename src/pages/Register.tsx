import { useState, type ChangeEvent, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/user/userApi";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const form = new FormData();
    /*
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("address", formData.address);
    form.append("phone", formData.phone);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("confirmPassword", formData.confirmPassword);
    */
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    if (image) form.append("image", image);

    try {
      await register(form).unwrap();
      toast.success("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-right" />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-[#0D9488] mb-6">
          Register
        </h2>

        <form
          onSubmit={handleRegister}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* LEFT COLUMN */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            {/* First Name */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border rounded cursor-pointer"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="col-span-2 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0D9488] text-white py-3 rounded hover:bg-[#0a766f] transition"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#0D9488] cursor-pointer hover:underline"
          >
            Login
          </Link>
          <Link to="/" className="mt-2 flex justify-center space-x-2">
            <img
              src={"https://i.ibb.co/qMK6nT44/Fit-Nest-Logo.png"}
              alt="Logo"
              className="w-5 h-5 rounded-full"
            />
            <span className="text-[#0D9488] font-bold">FitNest</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
