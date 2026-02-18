import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  useDeleteAProductMutation,
  useGetAllProductsQuery,
} from '../../../redux/api/products/productsApi';
import ProductAddUpdateForm from './ProductAddUpdateForm';

const ProductManagement = () => {
  const { data: response, isLoading, error } = useGetAllProductsQuery();
  const productsData = response?.data || [];

  const [searchText, setSearchText] = useState('');
  const products = useMemo(() => {
    return productsData.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [productsData, searchText]);

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
  const [deleteAProduct, { isLoading: isDeleting }] = useDeleteAProductMutation();
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
      toast.success('Product is deleted successfully.');
    } catch (err) {
      toast.error('Failed to delete product!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row mb-6 gap-6">
        <h1 className="w-1/2 text-xl md:text-2xl font-bold">Product Management</h1>
        <div className="md:w-1/2 flex justify-between items-center">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-2 py-1 rounded-md border border-gray-400 md:w-72"
            placeholder="Search products..."
            type="text"
          />
          <Button
            variant="contained"
            onClick={handleAddProductOpen}
            sx={{
              backgroundColor: '#0D9488',
              '&:hover': { backgroundColor: '#0a766f' },
              color: '#fff',
            }}
          >
            + Add Product
          </Button>
        </div>
      </div>

      {/* Products Section */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg font-medium">Loading products...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg text-red-500 font-medium">Error loading products.</p>
        </div>
      ) : products.length === 0 && searchText === '' ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg font-medium">No products found.</p>
        </div>
      ) : products.length === 0 && searchText !== '' ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-gray-500 text-lg font-medium">No products match "{searchText}"</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded overflow-x-auto">
          <div className="max-h-screen md:max-h-[85vh] overflow-y-auto">
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
                    <td className="px-2 md:px-4 py-2 border">{product.stock_quantity}</td>
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
        </div>
      )}

      {/* Reusable Add/Edit Form */}
      {formOpen && (
        <ProductAddUpdateForm open={formOpen} onClose={handleFormClose} product={selectedProduct} />
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteFormOpen} onClose={handleDeleteFormClose} fullWidth maxWidth="xs">
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteFormClose}>Cancel</Button>
          <Button disabled={isDeleting} color="error" onClick={handleDeleteConfirm}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
