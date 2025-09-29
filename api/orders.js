const { get, set } = require('@vercel/edge-config');

const initialOrders = [
    {
        id: '#68d9382d',
        date: 'Sep 28, 2025 at 1:29 PM',
        customerDetails: {
            name: 'sai',
            phone: '7013434594',
            email: 'pamm@gmail.com',
            type: 'Takeaway',
        },
        items: [
            { name: 'Dal rice', quantity: 1, price: '₹70' },
        ],
        total: '₹70',
        specialInstructions: 'afa',
        status: 'Delivered',
    },
    {
        id: '#a1b4c5d6',
        date: 'Sep 28, 2025 at 11:05 AM',
        customerDetails: {
            name: 'Jane Doe',
            phone: '9876543210',
            email: 'jane.d@example.com',
            type: 'Delivery',
        },
        items: [
            { name: 'Chicken Biryani', quantity: 2, price: '₹320' },
            { name: 'Garlic Naan', quantity: 4, price: '₹40' },
        ],
        total: '₹800',
        specialInstructions: 'Please make it extra spicy.',
        status: 'Preparing',
    },
    {
        id: '#f7e8d9c1',
        date: 'Sep 27, 2025 at 8:15 PM',
        customerDetails: {
            name: 'Peter Jones',
            phone: '5551234567',
            email: 'p.jones@example.com',
            type: 'Takeaway',
        },
        items: [
            { name: 'Paneer Tikka', quantity: 1, price: '₹220' },
            { name: 'Mango Lassi', quantity: 2, price: '₹120' },
        ],
        total: '₹460',
        specialInstructions: '',
        status: 'Pending',
    },
];

module.exports = async (req, res) => {
    try {
        const { method } = req;

        if (method === 'GET') {
            let orders = await get('restaurantOrders');
            if (!orders) {
                orders = initialOrders;
                await set('restaurantOrders', orders);
            }
            res.status(200).json(orders);
        } else if (method === 'POST') {
            const { action, order, orderId, status } = req.body;

            let orders = await get('restaurantOrders');
            if (!orders) {
                orders = initialOrders;
            }

            if (action === 'add') {
                orders.unshift(order);
            } else if (action === 'updateStatus') {
                const index = orders.findIndex(o => o.id === orderId);
                if (index !== -1) {
                    orders[index].status = status;
                }
            }

            await set('restaurantOrders', orders);
            res.status(200).json(orders);
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
