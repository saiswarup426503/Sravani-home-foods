import React from 'react';

interface HeaderProps {
    name: string;
    address: string;
    phone: string;
    openingHours: string;
}

const Header: React.FC<HeaderProps> = ({ name, address, phone, openingHours }) => {
    return (
        <header className="bg-[#FEFBF6] dark:bg-stone-900 pt-6 pb-4 border-b border-stone-200 dark:border-stone-700">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold text-stone-800 dark:text-stone-200 font-serif">{name}</h1>
            </div>
            <div className="flex items-center gap-6 text-stone-500 dark:text-stone-400 text-sm">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{address}</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h1.382a1 1 0 01.949.658l1.456 3.64a1 1 0 01-.328 1.139l-1.897 1.897a10.024 10.024 0 005.192 5.192l1.897-1.897a1 1 0 011.139-.328l3.64 1.456A1 1 0 0117 15.618V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{openingHours}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;