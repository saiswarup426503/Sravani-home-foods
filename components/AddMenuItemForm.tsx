import React, { useState, useEffect } from 'react';
import type { MenuItem } from '../types';

interface AddMenuItemFormProps {
    itemToEdit: MenuItem | null;
    onSave: (item: MenuItem | Omit<MenuItem, 'id'>) => void;
    onCancel: () => void;
}

const categories = [
    'Starters', 'Main Course', 'Rice & Noodles', 'Breads', 'Beverages', 'Desserts'
];

const AddMenuItemForm: React.FC<AddMenuItemFormProps> = ({ itemToEdit, onSave, onCancel }) => {
    const [item, setItem] = useState({
        name: '',
        price: '',
        description: '',
        category: 'Main Course',
        isAvailable: true,
        isVeg: false,
        isSpicy: false,
    });
    
    useEffect(() => {
        if (itemToEdit) {
            setItem({
                name: itemToEdit.name,
                price: itemToEdit.price.replace('₹', ''),
                description: itemToEdit.description,
                category: itemToEdit.category,
                isAvailable: itemToEdit.isAvailable,
                isVeg: itemToEdit.isVeg,
                isSpicy: itemToEdit.isSpicy,
            });
        }
    }, [itemToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setItem(prev => ({ ...prev, [name]: checked }));
        } else {
            setItem(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!item.name || !item.price) {
            // Basic validation
            alert("Item Name and Price are required.");
            return;
        }

        const itemData = {
            ...item,
            price: `₹${item.price}`,
        };

        if (itemToEdit) {
            onSave({ ...itemData, id: itemToEdit.id });
        } else {
            onSave(itemData);
        }
    };

    return (
        <div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700">
            <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-200 mb-6">{itemToEdit ? 'Edit Menu Item' : 'Add New Menu Item'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Item Name *</label>
                        <input type="text" name="name" id="name" value={item.name} onChange={handleChange} required
                            className="w-full p-3 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                     <div>
                        <label htmlFor="price" className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Price (₹) *</label>
                        <input type="number" name="price" id="price" value={item.price} onChange={handleChange} required
                            className="w-full p-3 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Description</label>
                    <textarea name="description" id="description" value={item.description} onChange={handleChange} rows={3}
                        className="w-full p-3 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Category</label>
                    <select name="category" id="category" value={item.category} onChange={handleChange}
                        className="w-full p-3 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                
                <div className="flex items-center gap-6 text-sm dark:text-stone-300">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="isAvailable" checked={item.isAvailable} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 dark:border-stone-500 text-amber-600 focus:ring-amber-500" />
                        Available Today
                    </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="isVeg" checked={item.isVeg} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 dark:border-stone-500 text-amber-600 focus:ring-amber-500" />
                        Vegetarian
                    </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="isSpicy" checked={item.isSpicy} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 dark:border-stone-500 text-amber-600 focus:ring-amber-500" />
                        Spicy
                    </label>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onCancel}
                        className="bg-stone-100 dark:bg-stone-600 text-stone-700 dark:text-stone-200 font-bold py-3 px-6 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-500 transition-colors">
                        Cancel
                    </button>
                     <button type="submit"
                        className="bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow">
                        {itemToEdit ? 'Save Changes' : 'Add Item'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMenuItemForm;