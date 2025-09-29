const { get, set } = require('@vercel/edge-config');

const initialMenu = [
    {
        id: '1',
        name: 'Dal Rice',
        description: 'abc',
        price: '₹70',
        category: 'Main Course',
        isVeg: true,
        isAvailable: true,
        isSpicy: false,
    },
    {
        id: '2',
        name: 'Chicken Biryani',
        description: 'Fragrant basmati rice with tender chicken and traditional spices',
        price: '₹320',
        category: 'Rice & Noodles',
        isVeg: false,
        isAvailable: true,
        isSpicy: true,
    },
    {
        id: '3',
        name: 'Masala Chai',
        description: 'Traditional spiced tea with milk',
        price: '₹25',
        category: 'Beverages',
        isVeg: true,
        isAvailable: true,
        isSpicy: false,
    },
];

module.exports = async (req, res) => {
    try {
        const { method } = req;

        if (method === 'GET') {
            let menu = await get('restaurantMenu');
            if (!menu) {
                menu = initialMenu;
                await set('restaurantMenu', menu);
            }
            res.status(200).json(menu);
        } else if (method === 'POST') {
            const { action, item, itemId } = req.body;

            let menu = await get('restaurantMenu');
            if (!menu) {
                menu = initialMenu;
            }

            if (action === 'add') {
                const newItem = { ...item, id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
                menu.unshift(newItem);
            } else if (action === 'update') {
                const index = menu.findIndex(m => m.id === item.id);
                if (index !== -1) {
                    menu[index] = item;
                }
            } else if (action === 'delete') {
                menu = menu.filter(m => m.id !== itemId);
            }

            await set('restaurantMenu', menu);
            res.status(200).json(menu);
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
