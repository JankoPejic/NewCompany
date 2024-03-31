import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import axiosInstance from "../Api/axios";

const ModalEdit = ({ isModalOpen, closeModal, product, getData }) => {
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.product_name);
      setSupplier(product.supplier_name);
      setCountry(product.country_name);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = async () => {
    if (!product) {
      console.error("Product is undefined");
      return;
    } // Log form values
    try {
      const res = await axiosInstance.put(`/products/${product.id}`, {
        product_name: name,
        supplier_name: supplier,
        country_name: country,
        price: parseFloat(price), // Convert price to a number
      });
      console.log(res.data); // Log server response
      // Rest of the code...
    } catch (error) {
      console.error(error.response.data); // Log server error message
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => closeModal()}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="bg-white w-[400px] h-[390px] rounded-xl p-6 flex flex-col relative">
        <div className="pb-6">
          <p className="pb-4 text-lg font-semibold text-center">Edit Product</p>
          <div className="flex-col">
            <div className="pt-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
                placeholder="Product name..."
              />
            </div>
            <div className="pt-3">
              <input
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
                placeholder="Supplier name..."
              />
            </div>
            <div className="pt-3">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
                placeholder="Country..."
              />
            </div>
            <div className="pt-3">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
                placeholder="Price..."
              />
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
            Edit
          </button>
        </Box>
      </div>
    </Modal>
  );
};

export default ModalEdit;
