import React from 'react';

import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AreYouSureModal = ({
  isModalOpen,
  closeModal,
  onConfirm,
  headerText,
  subHeaderText,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={() => closeModal()}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Box className="bg-white  w-[500px] h-[500px] p-6">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {headerText}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {subHeaderText}
          </Typography>
        </Box>

        <Box className="flex justify-center mt-4">
          <button
            onClick={() => onConfirm()}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Yes
          </button>
          <button
            onClick={() => closeModal()}
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
          >
            No
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AreYouSureModal;
