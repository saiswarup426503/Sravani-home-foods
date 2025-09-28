import React from 'react';
import type { MenuItem } from '../types';

interface MenuItemCardProps {
    item: MenuItem;
    onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
    return (
        <div className="bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col justify-between p-4">
            <div>
                <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200">{item.name}</h3>
                {item.isVeg && (
                    <div className="inline-flex items-center gap-1 mt-1 border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-0.5 rounded-md">
                       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                       Veg
                    </div>
                )}
                <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">{item.description}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-bold text-stone-800 dark:text-stone-200">{item.price}</p>
                <button 
                    onClick={() => onAddToCart(item)}
                    className="bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold py-2 px-5 rounded-lg hover:shadow-md transition-shadow text-sm"
                >
                    + Add
                </button>
            </div>
        </div>
    );
};

export default MenuItemCard;