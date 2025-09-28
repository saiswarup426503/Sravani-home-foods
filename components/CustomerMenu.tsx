import React, { useState, useMemo } from 'react';
import type { MenuItem, RestaurantSettings } from '../types';
import Header from './Header';
import CategoryFilters from './CategoryFilters';
import MenuItemCard from './MenuItemCard';
import ErrorDisplay from './ErrorDisplay';

interface CustomerMenuProps {
    menu: MenuItem[] | null;
    settings: RestaurantSettings;
    onAddToCart: (item: MenuItem) => void;
}

const CustomerMenu: React.FC<CustomerMenuProps> = ({ menu, settings, onAddToCart }) => {
    const [activeCategory, setActiveCategory] = useState<string>('All Items');

    const menuCategories = useMemo(() => {
        if (!menu) return [];
        const categories = menu.reduce((acc, item) => {
            acc.add(item.category);
            return acc;
        }, new Set<string>());
        return ['All Items', ...Array.from(categories)];
    }, [menu]);
    
    const groupedMenu = useMemo(() => {
        if (!menu) return {};
        return menu.reduce((acc, item) => {
            if(item.isAvailable) {
              (acc[item.category] = acc[item.category] || []).push(item);
            }
            return acc;
        }, {} as Record<string, MenuItem[]>);
    }, [menu]);

    const categoriesToDisplay = activeCategory === 'All Items' ? Object.keys(groupedMenu) : [activeCategory];
    const availableItemsCount = menu?.filter(item => item.isAvailable).length || 0;

    return (
        <div>
            <Header 
                name={settings.name}
                address={settings.address}
                phone={settings.phone}
                openingHours={settings.openingHours}
            />

            {availableItemsCount > 0 && menu ? (
                <>
                    <CategoryFilters categories={menuCategories} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
                    <div className="mt-6 space-y-8">
                        {categoriesToDisplay.map(category => (
                            groupedMenu[category]?.length > 0 && (
                                <div key={category}>
                                    <h2 className="text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4 flex items-center gap-3">
                                        <span>🍽️</span> {category}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {groupedMenu[category].map((item) => (
                                            <MenuItemCard key={item.id} item={item} onAddToCart={onAddToCart} />
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </>
            ) : (
                 <div className="text-center py-16 px-6 bg-stone-100 dark:bg-stone-800 rounded-lg mt-8">
                    <h3 className="text-2xl font-serif text-stone-700 dark:text-stone-300">Welcome to {settings.name}!</h3>
                    <p className="text-stone-500 dark:text-stone-400 mt-2 max-w-md mx-auto">The menu for today hasn't been set yet. Please check back soon!</p>
                </div>
            )}
        </div>
    );
};

export default CustomerMenu;