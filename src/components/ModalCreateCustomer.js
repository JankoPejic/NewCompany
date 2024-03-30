import React, { useState } from 'react';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import axiosInstance from '../services/axiosInstance';

const ModalCreate = ({ isModalOpen, closeModal, getData }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    const res = await axiosInstance.post(`/customers`, {
      name,
      address,
    });
    if (res.status === 201) {
      closeModal();
      setName('');
      setAddress('');
      getData();
    } else {
      console.error(res);
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
      <div className="bg-white w-[400px] h-[300px] rounded-xl p-6 flex flex-col relative">
        <div className="pb-6">
          <p className="pb-4 text-lg font-semibold text-center">
            Create Customer
          </p>
          <input
            type="text"
            className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400 mb-4"
            placeholder="Enter Customer Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full hover:border-gray-600 h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
            placeholder="Enter Customer Address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            Add
          </button>
        </Box>
      </div>
    </Modal>
  );
};

export default ModalCreate;
