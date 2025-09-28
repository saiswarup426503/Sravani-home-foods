import React, { useState } from 'react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (email: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() && email.includes('@')) {
            onLogin(email);
        } else {
            alert('Please enter a valid email address.');
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex justify-center items-center z-50 transition-opacity"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-stone-800 rounded-2xl shadow-2xl p-8 transform transition-all w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold font-serif text-stone-800 dark:text-stone-200 text-center mb-2">Login or Sign Up</h2>
                <p className="text-center text-stone-500 dark:text-stone-400 mb-6">Enter your email to continue.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="w-full p-3 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;