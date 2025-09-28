import React from 'react';
import type { User } from '../types';

type View = 'customer' | 'manager' | 'orders' | 'settings';

interface SidebarProps {
    currentUser: User;
    currentView: View;
    onSetView: (view: View) => void;
    onProfileClick: () => void;
    theme: string;
    onToggleTheme: () => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    description: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, description, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-colors ${
                isActive ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200' : 'hover:bg-stone-100 dark:hover:bg-stone-700'
            }`}
        >
            <div className={`flex-shrink-0 w-8 text-stone-500 dark:text-stone-400 ${isActive ? 'text-amber-800 dark:text-amber-300' : ''}`}>
                {icon}
            </div>
            <div>
                <p className="font-semibold text-stone-800 dark:text-stone-200">{label}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">{description}</p>
            </div>
        </button>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ currentUser, currentView, onSetView, onProfileClick, theme, onToggleTheme }) => {
    const isOwner = currentUser.role === 'Owner';
    const isGuest = currentUser.role === 'Guest';

    const ProfileIcon = () => {
         const initials = currentUser.name.charAt(0).toUpperCase();
         const bgColor = isOwner ? 'bg-orange-400' : (isGuest ? 'bg-stone-400' : 'bg-sky-500');

         if (isGuest) {
            return (
                 <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                 </div>
            )
         }

         return (
             <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                {initials}
            </div>
         )
    }

    return (
        <aside className="w-72 bg-white dark:bg-stone-800 border-r border-stone-200 dark:border-stone-700 flex flex-col p-4">
            <div className="flex items-center gap-3 p-3 mb-6">
                <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-stone-800 dark:text-stone-200">Restaurant Menu</h2>
                    <p className="text-sm text-stone-500 dark:text-stone-400">Daily Menu Manager</p>
                </div>
            </div>

            <nav className="flex-1">
                <p className="text-xs font-semibold text-stone-400 uppercase px-3 mb-2">Navigation</p>
                <div className="space-y-1">
                    <NavItem 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                        label="Customer Menu"
                        description="View as customer"
                        isActive={currentView === 'customer'}
                        onClick={() => onSetView('customer')}
                    />
                    {isOwner && (
                        <>
                            <NavItem 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>}
                                label="Manage Menu"
                                description="Edit daily menu"
                                isActive={currentView === 'manager'}
                                onClick={() => onSetView('manager')}
                            />
                             <NavItem 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                                label="Orders"
                                description="Manage orders"
                                isActive={currentView === 'orders'}
                                onClick={() => onSetView('orders')}
                            />
                             <NavItem 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                label="Settings"
                                description="Restaurant info & QR"
                                isActive={currentView === 'settings'}
                                onClick={() => onSetView('settings')}
                            />
                        </>
                    )}
                </div>
            </nav>

            <div className="mt-auto pt-4 border-t border-stone-200 dark:border-stone-700">
                 <div className="p-2 mb-2 flex items-center justify-between">
                    <label htmlFor="theme-toggle" className="text-sm font-semibold text-stone-600 dark:text-stone-400">
                        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </label>
                    <button
                        id="theme-toggle"
                        onClick={onToggleTheme}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                            theme === 'light' ? 'bg-stone-300' : 'bg-sky-500'
                        }`}
                    >
                        <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                                theme === 'light' ? 'translate-x-1' : 'translate-x-6'
                            }`}
                        />
                    </button>
                </div>
                <button 
                    onClick={onProfileClick}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                >
                     <div className="flex items-center gap-3">
                        <ProfileIcon />
                        <div>
                            <p className="font-semibold text-stone-800 dark:text-stone-200">{currentUser.name}</p>
                            <p className="text-xs text-stone-500 dark:text-stone-400">{isGuest ? 'Click to log in' : currentUser.role}</p>
                        </div>
                     </div>
                     <div className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200" title={isGuest ? 'Login' : 'Profile Options'}>
                        {isGuest ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        )}
                     </div>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;