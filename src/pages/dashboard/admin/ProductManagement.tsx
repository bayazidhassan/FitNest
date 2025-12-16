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

  // for add/update
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

  // for delete
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
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button
          variant="contained"
          onClick={handleAddProductOpen}
          sx={{
            backgroundColor: "#0D9488",
            "&:hover": { backgroundColor: "#0a766f" },
            color: "#fff",
          }}
        >
          + Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 md:px-4 py-2 border">#</th>
              <th className="px-2 md:px-4 py-2 border">Name</th>
              <th className="px-2 md:px-4 py-2 border">Price</th>
              <th className="px-2 md:px-4 py-2 border">Category</th>
              <th className="px-2 md:px-4 py-2 border">Stock Qty</th>
              <th className="px-2 md:px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any, index: number) => (
              <tr key={product._id} className="text-center">
                <td className="px-2 md:px-4 py-2 border">{index + 1}</td>
                <td className="px-2 md:px-4 py-2 border">{product.name}</td>
                <td className="px-2 md:px-4 py-2 border">${product.price}</td>
                <td className="px-2 md:px-4 py-2 border">{product.category}</td>
                <td className="px-2 md:px-4 py-2 border">
                  {product.stock_quantity}
                </td>
                <td className="px-2 md:px-4 py-2 border flex flex-col md:flex-row justify-center items-center gap-2 md:gap-1">
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => handleEditProductOpen(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    size="small"
                    onClick={(e) => {
                      e.currentTarget.blur();
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

      {/* Delete Dialog */}
      <Dialog
        open={deleteFormOpen}
        onClose={handleDeleteFormClose}
        fullWidth
        maxWidth="xs"
      >
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
