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
        <Box className="bg-white w-[400px] h-[250px] rounded-xl p-6 flex items-center flex-col justify-center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {headerText}
          </Typography>
          <Typography
            className="!text-sm"
            id="modal-modal-description"
            sx={{ mt: 1 }}
          >
            {subHeaderText}
          </Typography>
          <Box className="flex justify-center mt-4 gap-4">
            <button
              onClick={() => closeModal()}
              className="bg-transparent hover:bg-blue-500 transition hover:text-white border border-blue-500 rounded-lg text-blue-500 font-semibold px-10 py-2"
            >
              No
            </button>
            <button
              onClick={() => onConfirm()}
              className="bg-blue-500 font-semibold hover:bg-blue-600 transition border border-blue-500 rounded-lg text-white px-10 py-2"
            >
              Yes
            </button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AreYouSureModal;
