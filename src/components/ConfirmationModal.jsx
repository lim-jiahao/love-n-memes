import React from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';

const ConfirmationModal = ({
  matchId, isOpen, setIsOpen, setSelectedMatch,
}) => {
  const handleConfirmation = async () => {
    try {
      const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
      await axios.delete(`/api/match/${matchId}`, headers);
      console.log('here');
      setSelectedMatch(null);
    } catch (err) {
      console.error(err.response);
    }
  };

  return (
    <Dialog
      className="fixed inset-0 top-40 z-10"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50" />

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Are you sure?
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500 border-t pt-2">
              Once you unmatch this user, you cannot undo this action.
            </p>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full mr-2"
              onClick={handleConfirmation}
            >
              Confirm
            </button>
            <button
              type="button"
              className="bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;
