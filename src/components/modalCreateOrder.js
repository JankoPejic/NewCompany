import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import axiosInstance from "../services/axiosInstance";
import Select from "react-select";
import "../index.css";

const ModalCreateOrder = ({
  isModalOpen,
  closeModal,
  getData,
  suppliers,
  countries,
  customers,
  products
}) => {
  const [customer, setCustomer] = useState("Select Customer");
  const [country, setCountry] = useState("Select Country");
  const [orderDate, setOrderDate] = useState("");
  const [orderItems, setOrderItems] = useState([{ productId: "", quantity: "" }]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const todayDate = new Date()
  console.log('todayDate :>> ', todayDate.toUTCString());
  useEffect(() => {
    let total = 0;
    orderItems.forEach(item => {
      const product = products?.find(product => product.id === item.productId);
      if (product) {
        total += (product.price * item.quantity);
      }
    });
    setTotalAmount(total);
  }, [orderItems]);

  const customerOptions = customers.map(customer => ({
    label: customer.name,
    value: customer.id
  }));

  const countryOptions = countries.map(country => ({
    label: country.name,
    value: country.id
  }));

  const handleAddProduct = () => {
    setOrderItems([...orderItems, { productId: "", quantity: "" }]);
    
    setTimeout(() => {
      let hiddenButtons = document.getElementsByClassName("hide-button");
      let buttonCount = 0;
      for (let i = 0; i < hiddenButtons.length; i++) {
        buttonCount++;
        hiddenButtons[i].classList.remove("invisible");
      }
    }, 0);
  };
  
  const handleRemoveProduct = (index) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems.splice(index, 1);
    setOrderItems(updatedOrderItems);
    if (updatedOrderItems.length === 1) {
      const buttons = document.getElementsByClassName("hide-button");
      buttons[0].classList.add("invisible");
    }
  };

  const handleProductChange = (index, productId) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index].productId = productId;
    setOrderItems(updatedOrderItems);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index].quantity = quantity;
    setOrderItems(updatedOrderItems);
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post(`/orders`, {
        customer_name: customer ? customer.label : "",
        order_date: orderDate,
        products: orderItems.filter(item => item.productId !== "" && item.quantity !== "")
      });
      if (res.status === 201) {
        closeModal();
        setCustomer("Select Customer");
        setCountry("Select Country");
        setOrderDate("");
        setOrderItems([{ productId: "", quantity: "" }]);
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
      <div className="bg-white w-[800px] rounded-xl p-6 flex flex-col relative overflow-hidden">
        <div className="pb-6">
          <p className="pb-4 text-lg font-semibold text-center">New Order</p>
          <div className="flex-col">
            <Select
              options={customerOptions}
              value={customer}
              onChange={setCustomer}
              placeholder="Select Customer..."
            />
            <Select
              options={countryOptions}
              value={country}
              onChange={setCountry}
              placeholder="Select Country..."
            />
            <div className="relative">
              <input
                type="text"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                onClick={() => setShowDatePicker(!showDatePicker)}
                placeholder="Select Order Date..."
                className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400 mb-4"
              />
              {showDatePicker && (
                <input
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full left-0 w-full hover:border-gray-600 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
                />
              )}
            </div>
            <div className="w-full border-2 rounded-xl mb-4 p-2">
              <p className="mb-2 font-semibold">Select Products:</p>
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <select
                    value={item.productId}
                    onChange={(e) => handleProductChange(index, e.target.value)}
                    className="mr-2 hover:border-gray-600 h-10 border-2 w-[500px] rounded-xl py-1 pl-2 pr-4 outline-none border-gray-400"
                  >
                    <option value="">Select Product...</option>
                    {products?.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.product_name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    min="0"
                    className="mr-2 hover:border-gray-600 h-10 w-[103px] border-2 rounded-xl py-1 pl-2 pr-4 outline-none border-gray-400 w-20"
                    placeholder="Quantity"
                  />
                  <div className="flex w-24 justify-between">
                    <button
                      onClick={() => handleRemoveProduct(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md w-10 hide-button invisible"
                    >
                      -
                    </button>
                    <button
                      onClick={handleAddProduct}
                      className="bg-green-500 text-white px-2 py-1 rounded-md w-10"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>Total Order Amount: {totalAmount}</div>
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

export default ModalCreateOrder;
