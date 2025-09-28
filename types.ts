export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  isVeg: boolean;
  isAvailable: boolean;
  isSpicy: boolean;
}

export interface CartItem {
  id: string; // Corresponds to MenuItem id
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Delivered' | 'Cancelled';
export type OrderType = 'Dine In' | 'Takeaway' | 'Delivery';

export interface CustomerDetails {
    name: string;
    phone: string;
    email: string;
    type: OrderType;
}

export interface Order {
  id: string;
  date: string;
  customerDetails: CustomerDetails;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
  total: string;
  specialInstructions: string;
  status: OrderStatus;
}

export type UserRole = 'Owner' | 'Customer' | 'Guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface RestaurantSettings {
    name: string;
    address: string;
    phone: string;
    openingHours: string;
    upiId: string;
}