import React, { useState } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import axiosInstance from "../services/axiosInstance";

const ModalCreateProduct = ({
  isModalOpen,
  closeModal,
  getData,
  suppliers,
  countries,
}) => {
  const [productName, setProductName] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post(`/products`, {
        product_name: productName,
        supplier_id: supplierId,
        country_id: countryId,
        price: price,
      });
      if (res.status === 201) {
        closeModal();
        setProductName();
        setSupplierId();
        setCountryId();
        setPrice();
        getData();
      } else {
        console.error(res);
      }
    } catch (error) {
      console.error(error);
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
      <div className="bg-white w-[400px] h-[440px] rounded-xl p-6 flex flex-col relative">
        <div className="pb-6">
          <p className="pb-4 text-lg font-semibold text-center">New Product</p>
          <div className="flex-col">
            <input
              type="text"
              className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400 mb-4"
              placeholder="Enter Product Name..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <select
              className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400 mb-4"
              onChange={(e) => setSupplierId(e.target.value)}
              value={supplierId}
            >
              <option value="">Select Supplier...</option>
              {suppliers &&
                suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
            </select>
            <select
              className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400 mb-4"
              onChange={(e) => setCountryId(e.target.value)}
              value={countryId}
            >
              <option value="">Select Country...</option>
              {countries &&
                countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
            <input
              type="number"
              className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
              placeholder="Enter Price..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <Box className="flex justify-center mt-[50px] gap-5">
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

export default ModalCreateProduct;
