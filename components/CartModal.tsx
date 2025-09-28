import React, { useMemo } from 'react';
import type { CartItem, MenuItem } from '../types';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    menu: MenuItem[];
    onUpdateQuantity: (itemId: string, newQuantity: number) => void;
    onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cart, menu, onUpdateQuantity, onCheckout }) => {
    if (!isOpen) return null;

    const cartDetails = useMemo(() => {
        return cart.map(cartItem => {
            const menuItem = menu.find(m => m.id === cartItem.id);
            return { ...menuItem, ...cartItem };
        }).filter(item => item.name); // Filter out any potential mismatches
    }, [cart, menu]);

    const subtotal = useMemo(() => {
        return cartDetails.reduce((acc, item) => {
            const price = parseFloat(item.price?.replace('₹', '') || '0');
            return acc + (price * item.quantity);
        }, 0);
    }, [cartDetails]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-stone-800 rounded-2xl shadow-2xl p-6 transform transition-all duration-300 w-full max-w-lg mx-4 flex flex-col h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b dark:border-stone-700 pb-4 mb-4">
                    <h2 className="text-2xl font-bold font-serif text-stone-800 dark:text-stone-200">Your Order</h2>
                    <button onClick={onClose} className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2">
                    {cartDetails.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-stone-500 dark:text-stone-400">Your cart is empty.</p>
                            <p className="text-sm text-stone-400 dark:text-stone-500 mt-2">Add some items from the menu to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartDetails.map(item => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <p className="font-semibold text-stone-800 dark:text-stone-200">{item.name}</p>
                                        <p className="text-sm text-stone-500 dark:text-stone-400">{item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-2 border border-stone-200 dark:border-stone-600 rounded-md">
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-l-md">-</button>
                                        <span className="px-3 font-medium dark:text-stone-300">{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-r-md">+</button>
                                    </div>
                                    <p className="w-20 text-right font-semibold dark:text-stone-200">₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {cartDetails.length > 0 && (
                    <div className="mt-auto border-t dark:border-stone-700 pt-4">
                        <div className="flex justify-between items-center font-bold text-xl mb-4 dark:text-stone-200">
                            <span>Subtotal:</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={onCheckout}
                            className="w-full bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow text-center"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;