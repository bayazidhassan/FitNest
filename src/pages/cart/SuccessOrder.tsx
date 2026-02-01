import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetOrderIdByStripeSessionQuery } from '../../redux/api/payment/paymentApi';
import { clearCart } from '../../redux/features/cart/addToCartSlice';
import { resetSuccessOrder } from '../../redux/features/order/successOrderSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';

const SuccessOrder = () => {
  const { successOrderAllowed } = useAppSelector((state) => state.successOrder);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const hasRun = useRef(false); //prevents double execution

  //get order id by using stripe session (only for online payment)
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const {
    data: orderResponse,
    isLoading: isOrderLoading,
    isError,
  } = useGetOrderIdByStripeSessionQuery(sessionId!, {
    skip: !sessionId || state?.type === 'cod',
  });

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (!successOrderAllowed) {
      navigate('/cart', { replace: true });
      return;
    }

    dispatch(clearCart());
    dispatch(resetSuccessOrder());

    if (state?.type === 'cod') {
      toast.success(state.msg || 'Order placed successfully!');
    } else {
      toast.success('Payment successful!');
    }
  }, [successOrderAllowed, dispatch, navigate, state]);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to fetch order Id.');
    }
  }, [isError]);

  return (
    <div className="px-8 py-16 md:py-24 text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-3 text-[#0D9488]">Order Placed!</h1>
      {state?.type === 'cod' ? (
        <p className="text-base md:text-lg text-gray-700">
          Thanks for your order! We’ll confirm it shortly.
          <br />
          Order ID: <span className="text-black font-semibold">{state.order_id}</span>
        </p>
      ) : (
        <p className="text-base md:text-lg text-gray-700">
          Thank you! Your payment has been received. We are processing your order now.
          <br />
          {isOrderLoading ? (
            <span className="text-gray-500">Fetching order details...</span>
          ) : orderResponse?.data ? (
            <>
              Order ID: <span className="text-black font-semibold">{orderResponse.data}</span>
            </>
          ) : (
            <span className="text-gray-500">Order ID is not available.</span>
          )}
        </p>
      )}
    </div>
  );
};

export default SuccessOrder;
