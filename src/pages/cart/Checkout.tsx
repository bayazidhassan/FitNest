import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/features/cart/addToCartSlice";
import { allowSuccessOrder } from "../../redux/features/order/successOrderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const DELIVERY_CHARGE = 60;

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.auth);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalPrice = subtotal + DELIVERY_CHARGE;

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street_address: "",
    upazila: "",
    district: "",
    comment: "", // comment box
    paymentMethod: "cod", // default
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const { firstName, lastName, email, phone, street_address, upazila, district } =
      form;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !street_address ||
      !upazila ||
      !district
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    const orderInfo = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      address: form.street_address,
      upazila: form.upazila,
      district: form.district,
      comment: form.comment,
      cartItems: cartItems,
      totalPrice: totalPrice,
    };
    console.log(orderInfo);

    dispatch(clearCart());
    dispatch(allowSuccessOrder());
    navigate("/checkout/successOrder");
  };

  return (
    <div className="px-2 md:px-0 max-w-6xl mx-auto my-6">
      <Toaster position="top-center" />

      {/* Page Heading */}
      <h1 className="mb-4 text-3xl font-bold text-[#0D9488]">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT: Form */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow flex flex-col gap-4">
          <h2 className="text-xl font-semibold">
            Shipping & Billing Information
          </h2>

          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="border p-2 rounded w-1/2"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="border p-2 rounded w-1/2"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={form.street_address}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <div className="flex gap-4">
            <input
              type="text"
              name="upazila"
              placeholder="Upazila / Thana"
              value={form.upazila}
              onChange={handleChange}
              className="border p-2 rounded w-1/2"
              required
            />
            <input
              type="text"
              name="district"
              placeholder="District / City"
              value={form.district}
              onChange={handleChange}
              className="border p-2 rounded w-1/2"
              required
            />
          </div>

          {/* Comment Box */}
          <textarea
            name="comment"
            placeholder="Add a comment (optional)"
            value={form.comment}
            onChange={handleChange}
            className="border p-2 rounded w-full h-24"
          />
        </div>

        {/* RIGHT: Order Summary + Payment */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow flex flex-col gap-4">
          {/* Payment Method at Top */}
          <div>
            <span className="block mb-2 font-semibold">Payment Method:</span>
            <div className="flex flex-col gap-2">
              <label
                className={`flex items-center gap-3 p-2 border rounded cursor-pointer hover:bg-gray-50 ${
                  form.paymentMethod === "cod"
                    ? "border-[#F97316]"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="accent-[#F97316]"
                />
                <span>Cash on Delivery</span>
              </label>

              <label
                className={`flex items-center gap-3 p-2 border rounded cursor-pointer hover:bg-gray-50 ${
                  form.paymentMethod === "online"
                    ? "border-[#F97316]"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={form.paymentMethod === "online"}
                  onChange={handleChange}
                  className="accent-[#F97316]"
                />
                <span>Online Payment</span>
              </label>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-4">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.product_id} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>Tk. {item.price * item.quantity}</span>
            </div>
          ))}

          <div className="flex justify-between pt-2 border-t">
            <span>Subtotal:</span>
            <span>Tk. {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Home Delivery:</span>
            <span>Tk. {DELIVERY_CHARGE}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total:</span>
            <span>Tk. {totalPrice}</span>
          </div>

          {/* Place Order Button below Order Summary */}
          <button
            onClick={handlePlaceOrder}
            className="mt-4 px-4 py-2 bg-[#F97316] hover:bg-[#ea5f0d] text-white rounded"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
