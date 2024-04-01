import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import axiosInstance from "../Api/axios";

const ModalEdit = ({
  isModalOpen,
  product,
  getData,
  supplierList,
  countries,
  closeModal,
}) => {
  const [name, setName] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [existingSuppliers, setExistingSuppliers] = useState([]);
  const [existingCountries, setExistingCountries] = useState([]);

  useEffect(() => {
    // Set existing suppliers and countries when component mounts
    setExistingSuppliers(supplierList.map((supplier) => supplier.name));
    setExistingCountries(countries.map((country) => country.name));

    // Set product data to input fields when product prop changes
    if (product) {
      setName(product.product_name || "");
      setSelectedSupplier(product.supplier_name || "");
      setCountry(product.country_name || "");
      setPrice(product.price || "");
    }
  }, [product, supplierList, countries]);

  const handleSubmit = async () => {
    // Handle form submission
    if (!product) {
      console.error("Product is undefined");
      return;
    }
    // Find the supplier id and country id based on the selected names
    const selectedSupplierId = supplierList.find(
      (supplier) => supplier.name === selectedSupplier
    )?.id;
    const selectedCountryId = countries.find(
      (countryItem) => countryItem.name === country
    )?.id;

    if (!selectedSupplierId || !selectedCountryId) {
      console.error("Selected supplier or country is not found in the list");
      return;
    }
    //ganje
    try {
      const res = await axiosInstance.put(`/products/${product.id}`, {
        product_name: name,
        supplier_id: selectedSupplierId,
        country_id: selectedCountryId,
        price: parseFloat(price),
      });
      console.log(res.data);
      closeModal();
      getData();
    } catch (error) {
      console.error(error.response.data);
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
              <select
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
              >
                <option value="">Select a supplier...</option>
                {existingSuppliers.map((supplier, index) => (
                  <option key={index} value={supplier}>
                    {supplier}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-3">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
              >
                <option value="">Select a country...</option>
                {existingCountries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
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
