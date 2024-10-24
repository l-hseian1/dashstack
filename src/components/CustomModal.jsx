
import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, onConfirm }) => {
return (
<Modal
isOpen={isOpen}
onRequestClose={onRequestClose}
contentLabel="Delete Confirmation"
ariaHideApp={false}
className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg max-w-md w-full z-50"
overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
>
<h2 className="text-lg font-bold mb-4">Are you sure you want to delete this product?</h2>
<div className="flex justify-end mt-4">
<button 
    onClick={onRequestClose} 
    className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
>
    No
</button>
<button 
    onClick={onConfirm} 
    className="bg-red-500 text-white py-2 px-4 rounded"
>
    Yes
</button>
</div>
</Modal>
);
};

export default CustomModal;
