import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cart/addToCartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      dispatch(removeFromCart(deleteId));
    }
    handleClose();
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-xl font-semibold text-gray-700">
          Your cart is empty!
        </h1>
        <p className="text-gray-500 mt-2">Add some items to get started.</p>

        <Link
          to="/products"
          className="inline-block mt-4 px-4 py-2 bg-[#F97316] text-white rounded-md hover:bg-[#ea5f0d] transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="px-2 md:px-0 border my-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      {/* LEFT SIDE – CART ITEMS */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        {cartItems.map((product, index) => (
          <div
            key={product.product_id}
            className="flex justify-between items-center p-4 border rounded-lg shadow hover:shadow-md transition bg-white"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <h1 className="text-gray-500 text-lg">{index + 1}.</h1>
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h1 className="font-semibold text-gray-700">{product.name}</h1>
                <p className="text-gray-500">Tk. {product.price}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end gap-2">
              {/* DELETE */}
              <button
                onClick={() => handleOpen(product.product_id)}
                className="px-2 py-1 bg-[#F97316] text-white rounded hover:bg-[#ea5f0d] transition text-sm"
              >
                Delete
              </button>

              {/* QUANTITY */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({ id: product.product_id, type: "dec" })
                    )
                  }
                  disabled={product.quantity === 1}
                  className="px-2 py-1 bg-gray-200 rounded disabled:opacity-40"
                >
                  -
                </button>

                <span className="px-3 py-1 border rounded text-gray-700">
                  {product.quantity}
                </span>

                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({ id: product.product_id, type: "inc" })
                    )
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              {/* LINE TOTAL */}
              <p className="font-semibold text-gray-800">
                Tk. {product.price * product.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE – SUMMARY */}
      <div className="w-full md:w-1/3 p-6 border rounded-lg shadow bg-white h-fit">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Cart Summary
        </h2>

        <div className="flex justify-between text-gray-600 mb-2">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between font-semibold text-gray-800 text-lg mb-4">
          <span>Total Price:</span>
          <span>Tk. {totalPrice}</span>
        </div>

        <button
          onClick={() => dispatch(clearCart())}
          className="w-full px-4 py-2 mb-3 bg-[#F97316] text-white rounded hover:bg-[#ea5f0d] transition"
        >
          Clear Cart
        </button>

        <Link
          to="/checkout"
          className="block text-center w-full px-4 py-2 bg-[#0D9488] text-white rounded hover:bg-[#0a766f] transition"
        >
          Proceed to Checkout
        </Link>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Item</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this item from your cart?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              color: "#4B5563",
              borderColor: "#D1D5DB",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#F3F4F6",
                borderColor: "#D1D5DB",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "#F97316",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#ea5f0d",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
