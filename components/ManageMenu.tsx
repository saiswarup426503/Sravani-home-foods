import React, { useState, useMemo } from 'react';
import type { MenuItem } from '../types';
import CategoryFilters from './CategoryFilters';
import ManageMenuItemCard from './ManageMenuItemCard';
import AddMenuItemForm from './AddMenuItemForm';

interface ManageMenuProps {
    menu: MenuItem[];
    onAddItem: (item: Omit<MenuItem, 'id'>) => void;
    onUpdateItem: (item: MenuItem) => void;
    onDeleteItem: (itemId: string) => void;
}

const ManageMenu: React.FC<ManageMenuProps> = ({ menu, onAddItem, onUpdateItem, onDeleteItem }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('All Items');

    const handleEdit = (item: MenuItem) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const handleSave = (item: MenuItem | Omit<MenuItem, 'id'>) => {
        if ('id' in item) {
            onUpdateItem(item);
        } else {
            onAddItem(item);
        }
        setIsFormOpen(false);
        setEditingItem(null);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingItem(null);
    };

    const menuCategories = useMemo(() => {
        const categories = menu.reduce((acc, item) => {
            acc.add(item.category);
            return acc;
        }, new Set<string>());
        return ['All Items', ...Array.from(categories)];
    }, [menu]);

    const filteredMenu = useMemo(() => {
        if (activeCategory === 'All Items') return menu;
        return menu.filter(item => item.category === activeCategory);
    }, [menu, activeCategory]);

    return (
        <div>
            {isFormOpen ? (
                <AddMenuItemForm 
                    itemToEdit={editingItem}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-200">Manage Menu</h1>
                            <p className="text-stone-500 dark:text-stone-400 mt-1">Add, edit, and manage your daily menu items</p>
                        </div>
                        <button
                            onClick={handleAddNew}
                            className="bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Menu Item
                        </button>
                    </div>
                    
                    <CategoryFilters categories={menuCategories} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {filteredMenu.map(item => (
                            <ManageMenuItemCard
                                key={item.id}
                                item={item}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => onDeleteItem(item.id)}
                            />
                        ))}
                    </div>

                     {filteredMenu.length === 0 && (
                        <div className="text-center py-16 px-6 bg-stone-50 dark:bg-stone-800 rounded-lg mt-8">
                            <h3 className="text-xl font-semibold text-stone-700 dark:text-stone-300">No items to display</h3>
                            <p className="text-stone-500 dark:text-stone-400 mt-2">Add a new item or select a different category.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ManageMenu;