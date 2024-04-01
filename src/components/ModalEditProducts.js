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
  const [supplierId, setSupplierId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [price, setPrice] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    // Fetch suppliers
    axiosInstance
      .get("/suppliers")
      .then((response) => {
        setSuppliers(response.data.suppliers);
        console.log(response.data, "suppliers");
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });

    // Fetch countries
    axiosInstance
      .get("/countries")
      .then((response) => {
        setCountry(response.data.countries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });

    // Set initial product values if available
    if (product) {
      setName(product.product_name);
      setSupplierId(product.supplier_id);
      setCountryId(product.country_id);
      setPrice(product.price);
    }
  }, [product, supplierList, countries]);

  const handleSubmit = async () => {
    // Handle form submission
    if (!product) {
      console.error("Product is undefined");
      return;
    }

    try {
      const res = await axiosInstance.put(`/products/${product.id}`, {
        product_name: name,
        supplier_id: supplierId,
        country_id: countryId,
        price: parseFloat(price),
      });
      console.log(res.data); // Log server response
      // Rest of the code...
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
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-3">
              <select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
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
