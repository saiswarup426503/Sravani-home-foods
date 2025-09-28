import React, { useState, useMemo } from 'react';
import type { Order, OrderStatus } from '../types';
import OrderCard from './OrderCard';

interface OrderManagementProps {
    orders: Order[];
    onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderManagement: React.FC<OrderManagementProps> = ({ orders, onUpdateStatus }) => {
    const [filter, setFilter] = useState<OrderStatus | 'All Orders'>('All Orders');
    const [notification, setNotification] = useState<{ message: string; key: number } | null>(null);

    const filteredOrders = useMemo(() => {
        if (filter === 'All Orders') {
            return orders;
        }
        return orders.filter(order => order.status === filter);
    }, [orders, filter]);

    const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
        onUpdateStatus(orderId, status);
        const order = orders.find(o => o.id === orderId);
        
        setNotification({
            message: `Order ${order?.id || ''} status updated to ${status}.`,
            key: Date.now()
        });

        setTimeout(() => {
            setNotification(null);
        }, 4000); // Hide after 4 seconds
    };

    return (
        <div>
            {notification && (
                 <div key={notification.key} className="fixed top-24 right-8 bg-green-600 text-white py-3 px-5 rounded-lg shadow-lg z-50 flex items-center justify-between notification-animation">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{notification.message}</span>
                    <button onClick={() => setNotification(null)} className="ml-4 -mr-2 p-1 rounded-full hover:bg-green-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone-200 dark:border-stone-700">
                <div>
                    <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-200">Order Management</h1>
                    <p className="text-stone-500 dark:text-stone-400 mt-1">Track and manage customer orders</p>
                </div>
                <div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as OrderStatus | 'All Orders')}
                        className="p-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="All Orders">All Orders</option>
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="space-y-6">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <OrderCard key={order.id} order={order} onUpdateStatus={handleUpdateStatus} />
                    ))
                ) : (
                    <div className="text-center py-16 px-6 bg-stone-50 dark:bg-stone-800 rounded-lg">
                        <h3 className="text-xl font-semibold text-stone-700 dark:text-stone-300">No orders found</h3>
                        <p className="text-stone-500 dark:text-stone-400 mt-2">There are no orders matching the current filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderManagement;