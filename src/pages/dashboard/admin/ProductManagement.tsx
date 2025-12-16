import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useDeleteAProductMutation,
  useGetAllProductsQuery,
} from "../../../redux/api/products/productsApi";
import ProductAddUpdateForm from "./ProductAddUpdateForm";

const ProductManagement = () => {
  const { data: response } = useGetAllProductsQuery();
  const products = response?.data || [];

  //for add/update
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const handleAddProductOpen = () => {
    setSelectedProduct(null);
    setFormOpen(true);
  };
  const handleEditProductOpen = (product: any) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };
  const handleFormClose = () => setFormOpen(false);

  //for delete
  const [deleteAProduct, { isLoading: isDeleting }] =
    useDeleteAProductMutation();
  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const handleDeleteFormClose = () => {
    setSelectedProduct(null);
    setDeleteFormOpen(false);
  };
  const handleDeleteConfirm = async () => {
    try {
      await deleteAProduct(selectedProduct._id);
      setSelectedProduct(null);
      setDeleteFormOpen(false);
      toast.success("Product is deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete product!");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddProductOpen}
        >
          + Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Stock Quantity</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any, index: number) => (
              <tr key={product._id} className="text-center">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">${product.price}</td>
                <td className="px-4 py-2 border">{product.category}</td>
                <td className="px-4 py-2 border">{product.stock_quantity}</td>
                <td className="px-4 py-2 border space-x-2">
                  <Button
                    color="primary"
                    onClick={() => handleEditProductOpen(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      setSelectedProduct(product);
                      setDeleteFormOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reusable Add/Edit Form */}
      {formOpen && (
        <ProductAddUpdateForm
          open={formOpen}
          onClose={handleFormClose}
          product={selectedProduct}
        />
      )}

      {/* for delete a product */}
      <Dialog open={deleteFormOpen} onClose={handleDeleteFormClose}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>{selectedProduct?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteFormClose}>Cancel</Button>
          <Button
            disabled={isDeleting}
            color="error"
            onClick={handleDeleteConfirm}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
