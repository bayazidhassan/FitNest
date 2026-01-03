import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/features/cart/addToCartSlice";
import { resetSuccessOrder } from "../../redux/features/order/successOrderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const SuccessOrder = () => {
  const { successOrderAllowed } = useAppSelector((state) => state.successOrder);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const hasRun = useRef(false); //prevents double execution

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    //check page protection at first
    if (!successOrderAllowed) {
      navigate("/cart", { replace: true });
      return;
    }

    //clear cart
    dispatch(clearCart());

    //show correct message
    if (state?.type === "cod") {
      toast.success(state.msg || "Order placed successfully!");
    } else {
      toast.success("Payment successful!");
    }

    //lock page again
    dispatch(resetSuccessOrder());
  }, [successOrderAllowed, dispatch, navigate, state]);

  return (
    <div className="px-8 py-16 md:py-24 text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-3 text-[#F97316]">
        Order Placed!
      </h1>
      {state?.type === "cod" ? (
        <p className="text-base md:text-lg text-gray-700">
          Your order has been received and will be confirmed after admin
          approval.
        </p>
      ) : (
        <p className="text-base md:text-lg text-gray-700">
          Payment completed successfully. Your order is being processed.
        </p>
      )}
    </div>
  );
};

export default SuccessOrder;
