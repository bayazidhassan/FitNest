import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
  useCreateNewProductMutation,
  useGetAllProductsQuery,
  useUpdateAProductMutation,
} from "../../../redux/api/products/productsApi";

const ProductManagement = () => {
  const { data: response } = useGetAllProductsQuery();
  const products = response?.data || [];
  const [createNewProduct, { isLoading: isLoadingAddProduct }] =
    useCreateNewProductMutation();

  //add new product
  const [addProductOpen, setAddProductOpen] = useState(false);
  const handleAddProductOpen = () => setAddProductOpen(true);
  const handleAddProductClose = () => setAddProductOpen(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock_quantity: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image!");
      return;
    }
    const form = new FormData();
    // form.append("name", name);
    // form.append("price", price);
    // form.append("category", category);
    // form.append("stock_quantity", stock_quantity);
    // form.append("description", description);
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    form.append("image", image);
    try {
      await createNewProduct(form).unwrap();
      toast.success("New product created successfully!");
      setFormData({
        name: "",
        price: "",
        category: "",
        stock_quantity: "",
        description: "",
      });
      setImage(null);
      handleAddProductClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create new product!");
    }
  };

  //update a product
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateAProductMutation();
  const [updateProductOpen, setUpdateProductOpen] = useState(false);
  const handleUpdateProductOpen = () => setUpdateProductOpen(true);
  const handleUpdateProductClose = () => setUpdateProductOpen(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock_quantity: "",
    description: "",
  });
  const handleUpdateChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      const payload = {
        ...updateFormData,
        price: Number(updateFormData.price),
        stock_quantity: Number(updateFormData.stock_quantity),
      };
      await updateProduct({
        id: selectedProduct._id,
        //updateData: updateFormData, //wrong -> Types of property 'price' are incompatible. Type 'string' is not assignable to type 'number'.
        updateData: payload,
      }).unwrap();

      toast.success("Product updated successfully!");
      handleUpdateProductClose();
      setSelectedProduct(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update product!");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={(e) => {
            e.currentTarget.blur(); //fixes aria-hidden warning
            handleAddProductOpen();
          }}
          className="bg-[#0D9488] hover:bg-[#0a766f] text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
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
                  <button
                    onClick={(e) => {
                      e.currentTarget.blur(); //fixes aria-hidden warning
                      setSelectedProduct(product);
                      setUpdateFormData({
                        name: product.name,
                        price: product.price,
                        category: product.category,
                        stock_quantity: product.stock_quantity,
                        description: product.description,
                      });
                      handleUpdateProductOpen();
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog for update product */}
      <Dialog
        open={updateProductOpen}
        onClose={handleUpdateProductClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update Existing Product</DialogTitle>
        <DialogContent dividers>
          <div className="mt-2 flex gap-2">
            <TextField
              label="Product Name"
              name="name"
              value={updateFormData.name}
              onChange={handleUpdateChange}
              fullWidth
              required
            />
            <TextField
              label="Category"
              name="category"
              value={updateFormData.category}
              onChange={handleUpdateChange}
              fullWidth
              required
            />
          </div>
          <div className="mt-4 flex gap-2">
            <TextField
              label="Price"
              name="price"
              type="number"
              value={updateFormData.price}
              onChange={handleUpdateChange}
              fullWidth
              required
            />
            <TextField
              label="Stock Quantity"
              name="stock_quantity"
              type="number"
              value={updateFormData.stock_quantity}
              onChange={handleUpdateChange}
              fullWidth
              required
            />
          </div>
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            value={updateFormData.description}
            onChange={handleUpdateChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpdateProductClose}
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
            onClick={handleUpdateProduct}
            variant="contained"
            sx={{
              backgroundColor: "#F97316",
              color: "#fff",
              "&:hover": { backgroundColor: "#ea5f0d" },
            }}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for add product */}
      <Dialog
        open={addProductOpen}
        onClose={isLoadingAddProduct ? undefined : handleAddProductClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Product</DialogTitle>
        <form onSubmit={handleAddProduct}>
          <DialogContent dividers>
            <DialogContentText>
              Fill in the details to add a new product.
            </DialogContentText>
            <div className="mt-4 flex gap-2">
              <TextField
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth={false}
                className="w-3/5"
                autoFocus
              />
              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                fullWidth={false}
                className="w-2/5"
              />
            </div>
            <div className="mt-4 flex gap-2">
              <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                fullWidth={false}
                className="flex-1"
              />
              <TextField
                label="Stock Quantity"
                name="stock_quantity"
                type="number"
                value={formData.stock_quantity}
                onChange={handleChange}
                required
                fullWidth={false}
                className="flex-1"
              />
            </div>
            <div className="mt-4">
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  borderStyle: "dashed",
                  py: 2,
                  textTransform: "none",
                }}
              >
                {image ? "Change Image" : "Upload Product Image"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </Button>
              {image && (
                <div className="mt-3 flex items-center gap-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <span className="text-sm text-gray-600">{image.name}</span>
                </div>
              )}
            </div>
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleAddProductClose}
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
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#F97316",
                color: "#fff",
                "&:hover": { backgroundColor: "#ea5f0d" },
              }}
              disabled={isLoadingAddProduct}
            >
              {isLoadingAddProduct ? "Saving..." : "Add Product"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
