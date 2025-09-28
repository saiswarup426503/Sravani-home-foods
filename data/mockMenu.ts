import type { MenuItem } from '../types';

export const initialMenu: MenuItem[] = [
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
