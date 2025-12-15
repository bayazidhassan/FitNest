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
} from "../../../redux/api/products/productsApi";

const ProductManagement = () => {
  const [createNewProduct, { isLoading }] = useCreateNewProductMutation();
  const { data: response } = useGetAllProductsQuery();
  const products = response?.data || [];

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      handleClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create new product!");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={(e) => {
            e.currentTarget.blur(); // fixes aria-hidden warning
            handleOpen();
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
                  <button className="text-blue-600 hover:underline">
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

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={isLoading ? undefined : handleClose}
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
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#F97316",
                color: "#fff",
                "&:hover": { backgroundColor: "#ea5f0d" },
              }}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Add Product"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
