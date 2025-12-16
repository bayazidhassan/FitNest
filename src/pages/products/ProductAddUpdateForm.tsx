import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
  useCreateNewProductMutation,
  useUpdateAProductMutation,
} from "../../redux/api/products/productsApi";
import { getChangedFields } from "../../utils/getChangedFields";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  product?: any; // pass selected product for update
}

const ProductAddUpdateForm = ({ open, onClose, product }: ProductFormProps) => {
  const isUpdate = !!product;

  const [createNewProduct, { isLoading: isAdding }] =
    useCreateNewProductMutation();
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateAProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock_quantity: "",
    description: "",
  });

  const [previousImages, setPreviousImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  // Prefill form on update
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        stock_quantity: product.stock_quantity,
        description: product.description,
      });
      setPreviousImages(product.images || []);
      setRemovedImages([]);
      setNewImages([]);
    }
  }, [product]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemovePreviousImage = (img: string) => {
    setRemovedImages([...removedImages, img]);
    setPreviousImages(previousImages.filter((i) => i !== img));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isUpdate && newImages.length === 0) {
      toast.error("Please select at least one image!");
      return;
    }

    try {
      if (isUpdate) {
        // prepare changed fields
        const changedData = getChangedFields(
          {
            name: product.name,
            price: product.price,
            category: product.category,
            stock_quantity: product.stock_quantity,
            description: product.description,
          },
          formData
        );

        if (
          Object.keys(changedData).length === 0 &&
          newImages.length === 0 &&
          removedImages.length === 0
        ) {
          toast.error("No changes detected!");
          return;
        }

        const form = new FormData();
        Object.entries(changedData).forEach(([key, value]) => {
          form.append(key, value as any);
        });
        removedImages.forEach((img) => form.append("removedImages", img));
        newImages.forEach((file) => form.append("images", file));

        await updateProduct({ id: product._id, updateData: form }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        // Add product
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) =>
          form.append(key, value as any)
        );
        newImages.forEach((file) => form.append("images", file));
        await createNewProduct(form).unwrap();
        toast.success("Product added successfully!");
      }

      onClose();
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message || "Failed!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isUpdate ? "Update Product" : "Add Product"}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>Fill in the details below.</DialogContentText>

          {/* Name & Category */}
          <div className="mt-2 flex gap-2">
            <TextField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>

          {/* Price & Stock */}
          <div className="mt-4 flex gap-2">
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Stock Quantity"
              name="stock_quantity"
              type="number"
              value={formData.stock_quantity}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>

          {/* Images */}
          <div className="mt-4">
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ borderStyle: "dashed", py: 2, textTransform: "none" }}
            >
              {newImages.length > 0
                ? `${newImages.length} new image(s) selected`
                : isUpdate
                ? "Upload New Images"
                : "Upload Product Images"}
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) setNewImages(Array.from(e.target.files));
                }}
              />
            </Button>

            {/* Previous images */}
            {previousImages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {previousImages.map((img) => (
                  <div
                    key={img}
                    className="flex flex-col items-center gap-1 relative"
                  >
                    <img
                      src={img}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <Button
                      variant="text"
                      size="small"
                      color="error"
                      onClick={() => handleRemovePreviousImage(img)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* New images preview */}
            {newImages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {newImages.map((img, index) => (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`preview-${index}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <span className="text-xs text-gray-600 truncate w-20">
                      {img.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isAdding || isUpdating}
          >
            {isUpdate
              ? isUpdating
                ? "Updating..."
                : "Update"
              : isAdding
              ? "Adding..."
              : "Add Product"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductAddUpdateForm;
