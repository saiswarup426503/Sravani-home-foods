import React from 'react';

interface CategoryFiltersProps {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

// A simple mapping from category name to an emoji icon
const categoryIcons: Record<string, string> = {
    'All Items': '🍜',
    'Starters': '🥗',
    'Main Course': '🥘',
    'Rice & Noodles': '🍚',
    'Breads': '🍞',
    'Beverages': '🍹',
    'Desserts': '🍰',
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categories, activeCategory, onSelectCategory }) => {
    return (
        <div className="py-6 border-b border-stone-200 dark:border-stone-700">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                            activeCategory === category 
                                ? 'bg-amber-400 text-white shadow' 
                                : 'bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-600'
                        }`}
                    >
                        <span>{categoryIcons[category] || '🍽️'}</span>
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilters;