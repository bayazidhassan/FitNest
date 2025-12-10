import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetSuccessOrder } from "../../redux/features/order/successOrderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const SuccessOrder = () => {
  const { successOrderAllowed } = useAppSelector((state) => state.successOrder);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!successOrderAllowed) {
      navigate("/");
      return;
    }
    dispatch(resetSuccessOrder());
  }, []);

  return (
    <div className="px-8 py-16 md:py-24 text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-3 text-[#F97316]">
        Order Placed!
      </h1>
      <p className="text-base md:text-lg text-gray-700">
        Your order has been received but is not confirmed yet. It will be
        confirmed once the admin approves it.
      </p>
    </div>
  );
};

export default SuccessOrder;
