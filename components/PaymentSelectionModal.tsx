import React, { useState, useEffect } from 'react';

// Mock icons for UPI apps
const GPayIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1280px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-8" />;
const PhonePeIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-8" />;
const PaytmIcon = () => <img src="data:image/png;base64,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HDU/b9cfBYszx/dnMlx4b/bWW/PLXyvNv4oznHcNkdBhhA5n0RkZhRXLec1cq1lo47wgF9ZuHbO1xuoh5Sa7K6M508zYhh/BGw1W2nELWNKQfMlKg+vJCJNffFBkrwiwmd2d539oUA4oh3F/WNx2d5ktdPvRQsxR86nl+K9LlyvGZrKPbza42+mZa23gjNAAPHjic7vAb+eh73SwtzxvnHC7RmkW864WCwPweH+BlRb7yYNkGX6OIzUlu9FjHdbnv/LY9/ahSu1w0H1cplzGLQeBO/7J7SjEZlnMsbBJZT/+dneFjR2Ara2Flb+dy38lDAq4FTDKTcpNyte08obVitQK7ugoaO8dV/+YjQ22tqhk3Eg4+7Xv5L05muXDD7+a1TZfaHPlK/8I7nfyflBqA9Sr1IL2nWr97aQPamcZGFkITKU30NUmSx3mAjwPC/B8LjvJuRcQ+mCYTwAdn390yejSj6jAr7eYs3i4ygBXfLTTZWg6PijAQLf49NB9uxVvMRoTVL18eUiG3nQcn165PL/RoGQced2W6kszgLrj0OOXSTvitERBpjEQbsZ/buxc+b65ycYOW2vdv06tTSr7lJuwQ62WJF6b3X/fuN6ugPiYb7K6ClAuZ99C2I2sG9GCxsO0A9XusM91WI7Oq824GJHxWWU3vYHebrMc4kOJy99Dk42UHc6xnwd4dwg3nLS0mYzd2CDOiQe7y28a34F12IJd+B58/wqFqfS0hV69PJmoJnF9iqIg0xgIiW/rtY9hh729QTdSYfUeVEbZTjVK67AcR4jVQ1Zr3Ktd0zs/KLNXZm8vCR7DETUOw/V2wm1yH5YOAaq77DXHt5lhs6cV9OoBJhpVsTucQAhsGstQvPJo/lUow9plWiCfZcYORDee6KIZ7BRLH8moXi3qROWpJUW6uiF9iCM1hbskItnIJMBkEl1ERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERE5Gb6/wG9py0ygiWdVQAAAABJRU5ErkJggg==" alt="Paytm" className="h-8" />;

interface PaymentSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount?: string;
    onConfirmPayment: (transactionId: string) => void;
    isVerifying?: boolean;
    upiId: string;
    restaurantName: string;
}

const PaymentSelectionModal: React.FC<PaymentSelectionModalProps> = ({ isOpen, onClose, totalAmount, onConfirmPayment, isVerifying, upiId, restaurantName }) => {
    const [upiLink, setUpiLink] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [redirectingApp, setRedirectingApp] = useState<string | null>(null);
    const [showTransactionInput, setShowTransactionInput] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (isOpen && totalAmount && upiId) {
            const amount = totalAmount.replace('₹', '');
            const transactionNote = `Order at ${restaurantName}`;

            const generatedUpiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(restaurantName)}&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

            setUpiLink(generatedUpiLink);

            const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatedUpiLink)}`;
            setQrCodeUrl(qrApiUrl);
        } else if (!isOpen) {
            // Reset state when modal closes
            setRedirectingApp(null);
            setShowTransactionInput(false);
            setTransactionId('');
        }
    }, [isOpen, totalAmount, upiId, restaurantName]);

    const handleAppSelection = (appName: string) => {
        setRedirectingApp(appName);
        // Simulate the time it takes for the browser to prompt the user to open the app
        setTimeout(() => {
            // This will attempt to open the UPI app on a mobile device.
            window.location.href = upiLink;
            // The modal stays open, waiting for the user to return and confirm.
            // We can reset the redirecting state after a bit, though the user might have already switched apps.
            setTimeout(() => setRedirectingApp(null), 3000);
        }, 1500);
    };

    if (!isOpen) return null;

    const renderContent = () => {
        if (isVerifying) {
            return (
                <div className="text-center py-8">
                    <div className="w-12 h-12 border-4 border-amber-600 border-dashed rounded-full animate-spin mx-auto"></div>
                    <h2 className="text-2xl font-bold font-serif text-stone-800 dark:text-stone-200 mt-6 mb-2">Verifying Payment...</h2>
                    <p className="text-stone-500 dark:text-stone-400">Checking with the bank for UPI confirmation. Please wait.</p>
                </div>
            );
        }

        if (redirectingApp) {
            return (
                <div className="text-center py-8">
                    <div className="w-12 h-12 border-4 border-amber-600 border-dashed rounded-full animate-spin mx-auto"></div>
                    <h2 className="text-2xl font-bold font-serif text-stone-800 dark:text-stone-200 mt-6 mb-2">Opening {redirectingApp}...</h2>
                    <p className="text-stone-500 dark:text-stone-400">You will be redirected to complete your payment.</p>
                </div>
            );
        }

        return (
            <>
                <div className="text-center">
                    <h2 className="text-2xl font-bold font-serif text-stone-800 dark:text-stone-200 mb-2">Complete Your Payment</h2>
                    <p className="text-stone-500 dark:text-stone-400 mb-1">You need to pay</p>
                    <p className="text-4xl font-bold text-stone-800 dark:text-stone-200 mb-6">{totalAmount}</p>
                </div>

                <div className="text-center bg-stone-50 dark:bg-stone-700/50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-stone-600 dark:text-stone-300">Scan with any UPI app</h3>
                    {qrCodeUrl ? (
                        <img src={qrCodeUrl} alt="UPI QR Code" className="mx-auto mt-2 rounded-md bg-white p-2" />
                    ) : (
                        <div className="h-[200px] w-[200px] bg-stone-200 dark:bg-stone-600 animate-pulse mx-auto mt-2 rounded-md"></div>
                    )}
                </div>

                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-stone-200 dark:border-stone-700"></div>
                    <span className="flex-shrink mx-4 text-xs font-medium text-stone-400">OR</span>
                    <div className="flex-grow border-t border-stone-200 dark:border-stone-700"></div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-stone-600 dark:text-stone-300 text-center mb-3">Pay directly from your phone</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <button onClick={() => handleAppSelection('GPay')} className="flex items-center justify-center p-3 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-600 transition-colors">
                            <GPayIcon />
                        </button>
                        <button onClick={() => handleAppSelection('PhonePe')} className="flex items-center justify-center p-3 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-600 transition-colors">
                            <PhonePeIcon />
                        </button>
                        <button onClick={() => handleAppSelection('Paytm')} className="flex items-center justify-center p-3 bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-600 transition-colors">
                            <PaytmIcon />
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-center text-xs text-stone-500 dark:text-stone-400 mb-3">After paying, confirm below to place your order.</p>
                    {!showTransactionInput ? (
                        <button
                            onClick={() => setShowTransactionInput(true)}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow"
                        >
                            I've Paid, Enter Transaction ID
                        </button>
                    ) : (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter Transaction ID"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                className="w-full p-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg dark:placeholder-stone-400 mb-3"
                            />
                            <button
                                onClick={() => onConfirmPayment(transactionId)}
                                disabled={!transactionId.trim()}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm Transaction & Place Order
                            </button>
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="mt-3 w-full text-stone-600 dark:text-stone-400 font-semibold py-2"
                    >
                        Cancel Payment
                    </button>
                </div>
            </>
        );
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-300"
            onClick={isVerifying || redirectingApp ? undefined : onClose}
        >
            <div
                className="bg-white dark:bg-stone-800 rounded-2xl shadow-2xl p-8 transform transition-all duration-300 w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {renderContent()}
            </div>
        </div>
    );
};

export default PaymentSelectionModal;