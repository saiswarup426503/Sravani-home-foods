import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: (email: string) => void;
    onGuestLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onGuestLogin }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() && email.includes('@')) {
            onLogin(email);
        } else {
            alert('Please enter a valid email address.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#FEFBF6] dark:bg-stone-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-200 dark:border-stone-700 mx-4">
                <div className="text-center">
                     <div className="w-16 h-16 bg-amber-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold font-serif text-stone-800 dark:text-stone-200">Sravani Home Food's</h1>
                    <p className="mt-2 text-stone-500 dark:text-stone-400">Please log in to continue</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-400 to-amber-500 hover:shadow-lg transition-shadow"
                        >
                            Login or Sign Up
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center">
                    <div className="text-sm">
                        <button
                            onClick={onGuestLogin}
                            className="font-medium text-amber-600 hover:text-amber-500"
                        >
                            or Continue as Guest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;