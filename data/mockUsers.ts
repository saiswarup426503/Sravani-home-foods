import type { User } from '../types';

export const guestUser: User = { 
    id: 'user-0', 
    name: 'Guest User', 
    email: '', 
    role: 'Guest' 
};

export let mockUsers: User[] = [
  { id: 'user-1', name: 'Sai Swarup', email: 'pamminasaiswarup@gmail.com', role: 'Owner' },
  { id: 'user-2', name: 'Priya Sharma', email: 'priya.sharma@example.com', role: 'Customer' },
  { id: 'user-3', name: 'Amit Kumar', email: 'amit.kumar@example.com', role: 'Customer' },
];