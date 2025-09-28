import React from 'react';
import type { Order, OrderStatus } from '../types';

interface OrderCardProps {
    order: Order;
    onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const statusStyles: Record<OrderStatus, string> = {
    Delivered: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Preparing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const CustomerDetailLine: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
        <span className="text-stone-400 dark:text-stone-500">{icon}</span>
        <span>{text}</span>
    </div>
);


const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdateStatus }) => {
    return (
        <div className="bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                        <span>Order {order.id}</span>
                        {order.specialInstructions && (
                            <span title="This order has special instructions.">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.08-3.242A8.995 8.995 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.832 14.168L5.92 11.284A6.963 6.963 0 004 10c0-2.899 2.686-5.25 6-5.25s6 2.351 6 5.25-2.686 5.25-6 5.25a7.007 7.007 0 00-2.168-.332z" clipRule="evenodd" />
                                </svg>
                            </span>
                        )}
                    </h2>
                    <p className="text-sm text-stone-500 dark:text-stone-400">{order.date}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[order.status]}`}>
                        {order.status.toLowerCase()}
                    </span>
                    <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                        className="p-1 border border-stone-300 dark:border-stone-600 rounded-md bg-white dark:bg-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="border-t border-stone-200 dark:border-stone-700 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-stone-700 dark:text-stone-300 mb-3">Customer Details</h3>
                        <div className="space-y-2">
                            <CustomerDetailLine icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} text={order.customerDetails.name} />
                            <CustomerDetailLine icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg>} text={order.customerDetails.phone} />
                            <CustomerDetailLine icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>} text={order.customerDetails.email} />
                            <CustomerDetailLine icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} text={order.customerDetails.type} />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-stone-700 dark:text-stone-300 mb-3">Order Items</h3>
                        <div className="space-y-1 text-stone-600 dark:text-stone-300">
                           {order.items.map((item, index) => (
                               <div key={index} className="flex justify-between">
                                   <span>{item.name} x {item.quantity}</span>
                                   <span className="font-medium text-stone-700 dark:text-stone-200">{item.price}</span>
                               </div>
                           ))}
                        </div>
                        <div className="border-t border-dashed border-stone-300 dark:border-stone-600 my-2"></div>
                         <div className="flex justify-between font-bold text-stone-800 dark:text-stone-200">
                            <span>Total:</span>
                            <span>{order.total}</span>
                        </div>
                        
                        {order.specialInstructions && (
                            <div className="mt-4">
                                <h3 className="font-semibold text-stone-700 dark:text-stone-300">Special Instructions:</h3>
                                <p className="text-sm text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-700 p-2 rounded-md mt-1">{order.specialInstructions}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;