import React, { useState } from 'react';
import type { RestaurantSettings } from '../types';

interface SettingsProps {
    settings: RestaurantSettings;
    onSave: (settings: RestaurantSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onSave }) => {
    const [formState, setFormState] = useState<RestaurantSettings>(settings);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formState);
    };

    return (
        <div>
            <div className="mb-6 pb-4 border-b border-stone-200 dark:border-stone-700">
                <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-200">Settings</h1>
                <p className="text-stone-500 dark:text-stone-400 mt-1">Manage your restaurant information and payment settings.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700">
                    <h2 className="text-xl font-bold text-stone-700 dark:text-stone-300 mb-6 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        Restaurant Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Restaurant Name *</label>
                            <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} required className="w-full p-3 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 rounded-lg" />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Address</label>
                            <textarea name="address" id="address" value={formState.address} onChange={handleChange} rows={2} className="w-full p-3 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 rounded-lg"></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Phone Number</label>
                                <input type="text" name="phone" id="phone" value={formState.phone} onChange={handleChange} className="w-full p-3 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 rounded-lg" />
                            </div>
                            <div>
                                <label htmlFor="openingHours" className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Opening Hours</label>
                                <input type="text" name="openingHours" id="openingHours" value={formState.openingHours} onChange={handleChange} className="w-full p-3 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700">
                    <h2 className="text-xl font-bold text-stone-700 dark:text-stone-300 mb-6 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                        Payment Settings
                    </h2>
                    <div>
                        <label htmlFor="upiId" className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">UPI ID</label>
                        <input
                            type="text"
                            name="upiId"
                            id="upiId"
                            value={formState.upiId}
                            onChange={handleChange}
                            placeholder="your-name@oksbi"
                            required
                            readOnly
                            className="w-full p-3 border border-stone-300 dark:border-stone-600 bg-stone-100 dark:bg-stone-800 rounded-lg cursor-not-allowed"
                        />
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">This UPI ID will be used to generate payment links for customers.</p>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;