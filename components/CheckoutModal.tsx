import React, { useState, useMemo, useEffect } from 'react';
import type { CartItem, MenuItem, CustomerDetails, OrderType, User } from '../types';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    menu: MenuItem[];
    onProceedToPay: (customerDetails: CustomerDetails, specialInstructions: string) => void;
    currentUser: User;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, menu, onProceedToPay, currentUser }) => {
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        name: '',
        phone: '',
        email: '',
        type: 'Dine In' as OrderType,
        address: '',
    });
    const [specialInstructions, setSpecialInstructions] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (currentUser.role === 'Customer') {
                setCustomerDetails({
                    name: currentUser.name,
                    phone: '', // Phone is kept separate as it might not be stored with the user profile
                    email: currentUser.email,
                    type: 'Dine In',
                    address: '',
                });
            } else {
                // Reset for Owner or guest user
                setCustomerDetails({
                    name: '',
                    phone: '',
                    email: '',
                    type: 'Dine In' as OrderType,
                    address: '',
                });
            }
            setSpecialInstructions('');
        }
    }, [isOpen, currentUser]);

    const cartDetails = useMemo(() => {
        return cart.map(cartItem => {
            const menuItem = menu.find(m => m.id === cartItem.id);
            return { ...menuItem, ...cartItem };
        }).filter(item => item.name);
    }, [cart, menu]);

    const totalAmount = useMemo(() => {
        return cartDetails.reduce((acc, item) => {
            const price = parseFloat(item.price?.replace('₹', '') || '0');
            return acc + (price * item.quantity);
        }, 0);
    }, [cartDetails]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCustomerDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!customerDetails.name || !customerDetails.phone) {
            alert('Full Name and Phone Number are required.');
            return;
        }
        if (customerDetails.type === 'Delivery' && !customerDetails.address) {
            alert('Delivery Address is required for delivery orders.');
            return;
        }
        onProceedToPay(customerDetails, specialInstructions);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-80 flex justify-center items-center z-50 transition-opacity"
            onClick={onClose}
        >
            <div
                className="bg-[#FDFCF9] dark:bg-stone-800 rounded-xl shadow-2xl p-8 transform transition-all w-full max-w-lg mx-4 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-700 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                    <h2 className="text-2xl font-bold font-serif text-stone-800 dark:text-stone-200">Order Details</h2>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="name" placeholder="Full Name *" value={customerDetails.name} onChange={handleChange} className="w-full p-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg dark:placeholder-stone-400" />
                        <input type="tel" name="phone" placeholder="Phone Number *" value={customerDetails.phone} onChange={handleChange} className="w-full p-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg dark:placeholder-stone-400" />
                    </div>
                    <input type="email" name="email" placeholder="Email Address" value={customerDetails.email} onChange={handleChange} className="w-full p-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg dark:placeholder-stone-400" />
                    <select name="type" value={customerDetails.type} onChange={handleChange} className="w-full p-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg appearance-none">
                        <option value="Dine In">Dine In</option>
                        <option value="Takeaway">Takeaway</option>
                        <option value="Delivery">Delivery</option>
                    </select>
                    {customerDetails.type === 'Delivery' && (
                        <input type="text" name="address" placeholder="Delivery Address *" value={customerDetails.address} onChange={handleChange} className="w-full p-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg dark:placeholder-stone-400" />
                    )}
                    <textarea placeholder="Special Instructions..." value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)} rows={3} className="w-full p-3 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg dark:placeholder-stone-400"></textarea>
                </div>

                <div className="bg-amber-50 dark:bg-stone-700/50 border border-amber-200 dark:border-stone-700 rounded-lg p-4 my-6">
                    <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">Order Summary</h3>
                    <div className="space-y-1 text-sm text-stone-600 dark:text-stone-300">
                        {cartDetails.map(item => (
                            <div key={item.id} className="flex justify-between">
                                <span>{item.name} x {item.quantity}</span>
                                <span className="font-medium">₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-dashed border-amber-300 dark:border-stone-600 my-2"></div>
                    <div className="flex justify-between font-bold text-stone-800 dark:text-stone-200">
                        <span>Total Amount:</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                    Proceed to Pay
                </button>
            </div>
        </div>
    );
};

export default CheckoutModal;