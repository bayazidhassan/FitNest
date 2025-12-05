import { useAppSelector } from "../../redux/hook";

const cart = () => {
  const cartItem = useAppSelector((state) => state.cart);
  return (
    <div>
      {cartItem.map((cart) => (
        <div key={cart.product_id}>
          <h1>{cart.product_id}</h1>
          <h1>{cart.quantity}</h1>
        </div>
      ))}
    </div>
  );
};

export default cart;
