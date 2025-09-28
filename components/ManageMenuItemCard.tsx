import React, { useState, useRef, useEffect } from 'react';
import type { MenuItem } from '../types';

interface ManageMenuItemCardProps {
    item: MenuItem;
    onEdit: () => void;
    onDelete: () => void;
}

const ManageMenuItemCard: React.FC<ManageMenuItemCardProps> = ({ item, onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col justify-between relative">
            <div>
                 <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 pr-8">{item.name}</h3>
                    <div className="relative" ref={menuRef}>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-300">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-stone-700 rounded-md shadow-lg border border-stone-200 dark:border-stone-600 z-10">
                                <button onClick={() => { onEdit(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600">Edit</button>
                                <button onClick={() => { onDelete(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50">Delete</button>
                            </div>
                        )}
                    </div>
                </div>

                {item.isVeg && (
                    <div className="inline-flex items-center gap-1 mt-1 border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-0.5 rounded-md">
                       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                       Veg
                    </div>
                )}
                <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">{item.description}</p>
            </div>
            <div className="flex justify-between items-end mt-4">
                <p className="text-xl font-bold text-stone-800 dark:text-stone-200">{item.price}</p>
                <p className="text-xs text-stone-400 bg-stone-100 dark:bg-stone-700 dark:text-stone-400 px-2 py-1 rounded">{item.category}</p>
            </div>
        </div>
    );
};

export default ManageMenuItemCard;