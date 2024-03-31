import React from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import axiosInstance from "../Api/axios";

const ModalDelete = ({ isModalOpen, closeModal, customer, getData }) => {
  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/customers/${customer.id}`);

      if (res.status === 200) {
        closeModal();
        getData();
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
        <Box className="flex justify-center mt-4 gap-4 flex-col">
          <div className="justify-center pb-6">
            <h2>Are you sure you want to delete this customer?</h2>
          </div>
          <button
            onClick={() => closeModal()}
            className="bg-transparent hover:bg-blue-500 transition hover:text-white border border-blue-500 rounded-lg text-blue-500 font-semibold px-10 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-transparent hover:bg-blue-500 transition hover:text-white border border-blue-500 rounded-lg text-blue-500 font-semibold px-10 py-2"
          >
            Delete
          </button>
        </Box>
      </div>
    </Modal>
  );
};

export default ModalDelete;
