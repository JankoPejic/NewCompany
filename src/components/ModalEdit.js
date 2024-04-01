import React, { useState } from "react";

import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import axiosInstance from "../Api/axios";

const ModalEdit = ({
  isModalOpen,
  closeModal,
  supplier,
  getData,
  headerText,
  subHeaderText,
}) => {
  const [name, setName] = useState(supplier.name);
  const handleSubmit = async () => {
    try {
      // Check if the name field is empty
      if (!name.trim()) {
        console.error("Name field cannot be empty");
        return;
      }

      const res = await axiosInstance.put(`/suppliers/${supplier.id}`, {
        name,
      });

      if (res.status === 200) {
        closeModal();
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
      <div className="bg-white w-[400px] h-[250px] rounded-xl p-6 flex flex-col relative">
        <div className="pb-6">
          <p className="pb-4 text-lg font-semibold text-center">
            Edit Supplier
          </p>
          <input
            type="name"
            defaultValue={supplier.name}
            className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
            placeholder="Supplier name..."
            onChange={(e) => setName(e.target.value)}
          />
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
