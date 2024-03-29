import React, { useState } from 'react';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import axiosInstance from '../services/axiosInstance';

const ModalCreate = ({
  isModalOpen,
  closeModal,
  getData,
  suppliers,
  onConfirm,
  headerText,
  subHeaderText,
}) => {
  const [name, setName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState(null);
  console.log(suppliers, 'suppliers');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('product_name', name);
      formData.append('supplier_name', supplierName);
      formData.append('customer_name', customerName);
      formData.append('country_name', locationName);
      formData.append('price', price);
      formData.append('images', images); // Append image data

      const res = await axiosInstance.post(`/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 201) {
        closeModal();
        setName('');
        setCustomerName('');
        setLocationName('');
        setPrice('');
        setImages(null);
        getData();
      } else {
        console.error(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    setImages(e.target.files[0]); // Set the image file
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => closeModal()}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="bg-white w-[400px] h-[440px] rounded-xl p-6 flex flex-col relative">
        <div className="pb-6">
          <div>
            <p className="pb-4 text-lg font-semibold text-center">
              New Product
            </p>
            <div className="flex-col">
              <div>
                <input
                  type="name"
                  className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400 mb-4"
                  placeholder="Product name..."
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <select
                  type="name"
                  className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400 mb-4"
                  placeholder="Supplier name..."
                  onChange={(e) => setSupplierName(e.target.value)}
                >
                  {suppliers &&
                    suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <input
                  type="name"
                  className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400 mb-4"
                  placeholder="Customer name..."
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="name"
                  className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400 mb-4"
                  placeholder="Location name..."
                  onChange={(e) => setLocationName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="name"
                  className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
                  placeholder="Price..."
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*" // Accept only image files
                  className="w-full h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400 mb-4"
                  onChange={handleImageChange} // Handle image selection
                />
              </div>
            </div>
          </div>
        </div>
        <Box className="flex justify-center mt-4 gap-4">
          <button
            onClick={() => closeModal()}
            className="bg-transparent hover:bg-blue-500 transition hover:text-white border border-blue-500 rounded-lg text-blue-500 font-semibold px-10 py-2"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-transparent hover:bg-blue-500 transition hover:text-white border border-blue-500 rounded-lg text-blue-500 font-semibold px-10 py-2"
          >
            Add
          </button>
        </Box>
      </div>
    </Modal>
  );
};

export default ModalCreate;
