import React from 'react';

interface OrderConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    transactionId: string;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ isOpen, onClose, transactionId }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-80 flex justify-center items-center z-50 transition-opacity"
            onClick={onClose}
        >
            <div
                className="bg-[#FDFCF9] dark:bg-stone-800 rounded-xl shadow-2xl p-8 transform transition-all w-full max-w-md mx-4 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold font-serif text-stone-800 dark:text-stone-200 mb-4">Payment Successful</h2>
                <p className="text-stone-700 dark:text-stone-300 mb-6">
                    Thank you for your payment. Your transaction ID is:
                </p>
                <p className="text-lg font-mono font-semibold text-amber-700 dark:text-amber-400 mb-6 break-all">{transactionId}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmationModal;
