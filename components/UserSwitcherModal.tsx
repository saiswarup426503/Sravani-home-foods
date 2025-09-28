import React from 'react';
import type { User } from '../types';

interface UserSwitcherModalProps {
    isOpen: boolean;
    onClose: () => void;
    users: User[];
    currentUser: User;
    onSelectUser: (user: User) => void;
    onLogout: () => void;
}

const UserSwitcherModal: React.FC<UserSwitcherModalProps> = ({ isOpen, onClose, users, currentUser, onSelectUser, onLogout }) => {
    if (!isOpen) return null;

    const isOwner = currentUser.role === 'Owner';

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex justify-center items-center z-50 transition-opacity"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-stone-800 rounded-2xl shadow-2xl p-6 transform transition-all w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold font-serif text-stone-800 dark:text-stone-200 mb-4">
                    {isOwner ? 'Switch User' : 'Your Profile'}
                </h2>
                <div className="space-y-2">
                    {isOwner && users.map(user => (
                        user.role !== 'Guest' && (
                            <button
                                key={user.id}
                                onClick={() => onSelectUser(user)}
                                className={`w-full flex items-center justify-between p-4 rounded-lg text-left transition-colors ${
                                    currentUser.id === user.id
                                        ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-400 border-2'
                                        : 'bg-stone-50 dark:bg-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                                        user.role === 'Owner' ? 'bg-orange-500' : 'bg-sky-500'
                                    }`}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-stone-800 dark:text-stone-200">{user.name}</p>
                                        <p className="text-sm text-stone-500 dark:text-stone-400">{user.role}</p>
                                    </div>
                                </div>
                                {currentUser.id === user.id && (
                                    <span className="text-amber-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        )
                    ))}
                    {!isOwner && (
                         <div className="w-full flex items-center gap-4 p-4 rounded-lg bg-stone-50 dark:bg-stone-700">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-sky-500">
                                {currentUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold text-stone-800 dark:text-stone-200">{currentUser.name}</p>
                                <p className="text-sm text-stone-500 dark:text-stone-400">{currentUser.email}</p>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={onLogout}
                    className="mt-6 w-full bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-200 font-bold py-3 px-6 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors flex items-center justify-center gap-2"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserSwitcherModal;