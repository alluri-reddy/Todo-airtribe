import React from 'react';

const DeleteAlert = ({ setShowAlert, handleDeleteConfirmation }) => {
  const handleConfirmDelete = () => {
    handleDeleteConfirmation();
    setShowAlert(false);
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-500 bg-opacity-50 z-10">
      <div className="bg-black p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Are you sure you want to delete the status column?</h2>
        <p>This action cannot be undone.</p>
        <div className="flex justify-end mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleConfirmDelete}>
            Delete
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
