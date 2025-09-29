import React, { useState, useCallback, useMemo, useLayoutEffect, useEffect } from 'react';
import type { MenuItem, Order, OrderStatus, CartItem, CustomerDetails, User, RestaurantSettings } from './types';
import Sidebar from './components/Sidebar';
import OrderManagement from './components/OrderManagement';
import { supabase } from './lib/supabase';
import ManageMenu from './components/ManageMenu';
import CustomerMenu from './components/CustomerMenu';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import { sendOrderConfirmationEmail } from './services/emailService';
import UserSwitcherModal from './components/UserSwitcherModal';
import Settings from './components/Settings';
import PaymentSelectionModal from './components/PaymentSelectionModal';
import LoginModal from './components/LoginModal';
import LoginPage from './components/LoginPage';

const initialSettings: RestaurantSettings = {
    name: "Sravani Home Food's",
    address: "Market Road, Narsingi, Ranga Reddy",
    phone: "6309412453",
    openingHours: "06:00 AM - 10:00 AM",
    upiId: "pamminasaiswarup-1@oksbi",
};

const mockUsers: User[] = [
    { id: 'user-1', name: 'Sai Swarup', email: 'pamminasaiswarup@gmail.com', role: 'Owner' },
    { id: 'user-2', name: 'Customer 1', email: 'customer1@example.com', role: 'Customer' },
];

const guestUser: User = { id: 'guest', name: 'Guest', email: '', role: 'Guest' };

const initialMenu: MenuItem[] = [];
const mockOrders: Order[] = [];


type View = 'customer' | 'manager' | 'orders' | 'settings';

const getInitialTheme = (): string => {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }
    } catch (error) {
        console.error("Could not access localStorage to get theme.", error);
    }
    return 'light';
};


const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('customer');
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [settings, setSettings] = useState<RestaurantSettings>(initialSettings);
    const [isPaymentSelectionOpen, setIsPaymentSelectionOpen] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
    const [isUserSwitcherOpen, setIsUserSwitcherOpen] = useState<boolean>(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isVerifyingPayment, setIsVerifyingPayment] = useState<boolean>(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [pendingOrder, setPendingOrder] = useState<Omit<Order, 'id' | 'date' | 'status'> | null>(null);
    const [postLoginAction, setPostLoginAction] = useState<(() => void) | null>(null);
    const [theme, setTheme] = useState(getInitialTheme);
    const [isMenuLoading, setIsMenuLoading] = useState(true);
    const [isOrdersLoading, setIsOrdersLoading] = useState(true);

    useLayoutEffect(() => {
        const root = window.document.documentElement;
        try {
            if (theme === 'dark') {
                root.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                root.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        } catch (error) {
            console.error("Could not access localStorage to set theme.", error);
        }
    }, [theme]);

    const fetchMenu = useCallback(async () => {
        try {
            setIsMenuLoading(true);
            const response = await fetch('/api/menu');
            if (response.ok) {
                const data = await response.json();
                setMenu(data);
                // Save to localStorage as fallback
                localStorage.setItem('restaurantMenu', JSON.stringify(data));
            } else {
                // Fallback to localStorage
                const saved = localStorage.getItem('restaurantMenu');
                if (saved) {
                    setMenu(JSON.parse(saved));
                } else {
                    setMenu(initialMenu);
                }
            }
        } catch (error) {
            console.error('Failed to fetch menu:', error);
            // Fallback to localStorage
            const saved = localStorage.getItem('restaurantMenu');
            if (saved) {
                setMenu(JSON.parse(saved));
            } else {
                setMenu(initialMenu);
            }
        } finally {
            setIsMenuLoading(false);
        }
    }, []);

    const fetchOrders = useCallback(async () => {
        try {
            setIsOrdersLoading(true);
            const response = await fetch('/api/orders');
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
                // Save to localStorage as fallback
                localStorage.setItem('restaurantOrders', JSON.stringify(data));
            } else {
                // Fallback to localStorage
                const saved = localStorage.getItem('restaurantOrders');
                if (saved) {
                    setOrders(JSON.parse(saved));
                } else {
                    setOrders(mockOrders);
                }
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            // Fallback to localStorage
            const saved = localStorage.getItem('restaurantOrders');
            if (saved) {
                setOrders(JSON.parse(saved));
            } else {
                setOrders(mockOrders);
            }
        } finally {
            setIsOrdersLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMenu();
        fetchOrders();

        // Realtime subscriptions
        const menuSubscription = supabase
            .channel('menu_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'menu' }, () => {
                fetchMenu();
            })
            .subscribe();

        const ordersSubscription = supabase
            .channel('orders_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
                fetchOrders();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(menuSubscription);
            supabase.removeChannel(ordersSubscription);
        };
    }, [fetchMenu, fetchOrders]);

    const updateMenu = useCallback(async (action: 'add' | 'update' | 'delete', itemOrId: MenuItem | string) => {
        try {
            const body = {
                action,
                ...(action === 'add' ? { item: itemOrId } : {}),
                ...(action === 'update' ? { item: itemOrId } : {}),
                ...(action === 'delete' ? { itemId: itemOrId } : {}),
            };
            const response = await fetch('/api/menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                await fetchMenu();
            } else {
                // Fallback local update
                if (action === 'add') {
                    const newItem: MenuItem = {
                        ...itemOrId as Omit<MenuItem, 'id'>,
                        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    };
                    setMenu(prev => {
                        const newMenu = [newItem, ...prev];
                        localStorage.setItem('restaurantMenu', JSON.stringify(newMenu));
                        return newMenu;
                    });
                } else if (action === 'update') {
                    setMenu(prev => {
                        const newMenu = prev.map(m => m.id === (itemOrId as MenuItem).id ? itemOrId as MenuItem : m);
                        localStorage.setItem('restaurantMenu', JSON.stringify(newMenu));
                        return newMenu;
                    });
                } else if (action === 'delete') {
                    setMenu(prev => {
                        const newMenu = prev.filter(m => m.id !== itemOrId);
                        localStorage.setItem('restaurantMenu', JSON.stringify(newMenu));
                        return newMenu;
                    });
                }
            }
        } catch (error) {
            console.error('Failed to update menu:', error);
            // Fallback local update (same as above)
            if (action === 'add') {
                const newItem: MenuItem = {
                    ...itemOrId as Omit<MenuItem, 'id'>,
                    id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                };
                setMenu(prev => {
                    const newMenu = [newItem, ...prev];
                    localStorage.setItem('restaurantMenu', JSON.stringify(newMenu));
                    return newMenu;
                });
            } else if (action === 'update') {
                setMenu(prev => {
                    const newMenu = prev.map(m => m.id === (itemOrId as MenuItem).id ? itemOrId as MenuItem : m);
                    localStorage.setItem('restaurantMenu', JSON.stringify(newMenu));
                    return newMenu;
                });
            } else if (action === 'delete') {
                setMenu(prev => {
                    const newMenu = prev.filter(m => m.id !== itemOrId);
                    localStorage.setItem('restaurantMenu', JSON.stringify(newMenu));
                    return newMenu;
                });
            }
        }
    }, [fetchMenu]);

    const updateOrders = useCallback(async (action: 'add' | 'updateStatus', orderOrId: Order | string, status?: OrderStatus) => {
        try {
            const body = {
                action,
                ...(action === 'add' ? { order: orderOrId } : {}),
                ...(action === 'updateStatus' ? { orderId: orderOrId, status } : {}),
            };
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                await fetchOrders();
            } else {
                // Fallback local update
                if (action === 'add') {
                    setOrders(prev => [orderOrId as Order, ...prev]);
                } else if (action === 'updateStatus') {
                    setOrders(prev => prev.map(o => o.id === orderOrId ? { ...o, status } : o));
                }
            }
        } catch (error) {
            console.error('Failed to update orders:', error);
            // Fallback local update (same as above)
            if (action === 'add') {
                setOrders(prev => [orderOrId as Order, ...prev]);
            } else if (action === 'updateStatus') {
                setOrders(prev => prev.map(o => o.id === orderOrId ? { ...o, status } : o));
            }
        }
    }, [fetchOrders]);

    const handleToggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const handleUpdateSettings = (newSettings: RestaurantSettings) => {
        setSettings(newSettings);
        alert('Settings saved successfully!');
    };

    const handleAddItem = (item: Omit<MenuItem, 'id'>) => {
        updateMenu('add', item);
    };

    const handleUpdateItem = (updatedItem: MenuItem) => {
        updateMenu('update', updatedItem);
    };

    const handleDeleteItem = (itemId: string) => {
        updateMenu('delete', itemId);
    };

    const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
        updateOrders('updateStatus', orderId, status);
    };

    const handleAddToCart = (itemToAdd: MenuItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { id: itemToAdd.id, quantity: 1 }];
        });
    };

    const handleUpdateCartQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            setCart(prevCart => prevCart.filter(item => item.id !== itemId));
        } else {
            setCart(prevCart => prevCart.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const handleProceedToCheckout = () => {
        if (currentUser?.role === 'Guest') {
            setPostLoginAction(() => () => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
            });
            setIsLoginModalOpen(true);
        } else {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
        }
    };

    const handleInitiatePayment = (customerDetails: CustomerDetails, specialInstructions: string) => {
        if (cart.length === 0) return;

        const orderItems = cart.map(cartItem => {
            const menuItem = menu.find(m => m.id === cartItem.id)!;
            return {
                name: menuItem.name,
                quantity: cartItem.quantity,
                price: menuItem.price,
            };
        });

        const total = orderItems.reduce((acc, item) => {
            const price = parseFloat(item.price.replace('₹', ''));
            return acc + (price * item.quantity);
        }, 0);

        const newPendingOrder: Omit<Order, 'id' | 'date' | 'status'> = {
            customerDetails,
            items: orderItems,
            total: `₹${total.toFixed(2)}`,
            specialInstructions,
        };

        setPendingOrder(newPendingOrder);
        setIsCheckoutOpen(false);
        setIsPaymentSelectionOpen(true);
    };

    const handleVerifyAndPlaceOrder = () => {
        if (!pendingOrder) return;

        setIsVerifyingPayment(true);

        setTimeout(() => {
            const newOrder: Order = {
                ...pendingOrder,
                id: `#${Math.random().toString(16).substr(2, 8)}`,
                date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
                status: 'Pending',
            };

            updateOrders('add', newOrder);
            setCart([]);

            try {
                console.log("Generating email notification for the new order...");
                sendOrderConfirmationEmail(newOrder);
            } catch (error) {
                console.error("Failed to generate order confirmation email:", error);
            }

            setPendingOrder(null);
            setIsVerifyingPayment(false);
            setIsPaymentSelectionOpen(false);

        }, 3000);
    };

    const handleCancelPayment = () => {
        setPendingOrder(null);
        setIsPaymentSelectionOpen(false);
    };

    const handleSwitchUser = (user: User) => {
        if (currentUser?.role !== 'Owner') return; // Only owner can switch
        setCurrentUser(user);
        if (user.role === 'Customer') {
            setCurrentView('customer');
        }
        setIsUserSwitcherOpen(false);
    };

    const handleProfileClick = () => {
        if (currentUser?.role === 'Guest') {
            setIsLoginModalOpen(true);
        } else {
            setIsUserSwitcherOpen(true);
        }
    };

    const handleLogin = (email: string) => {
        let user;
        // Explicitly check for the owner's email
        if (email.toLowerCase() === 'pamminasaiswarup@gmail.com') {
            user = users.find(u => u.role === 'Owner');
            if (!user) {
                console.error("Owner account not found in mock data!");
                // Fallback or create if not found, though it should exist in mockUsers
                user = { id: 'user-1', name: 'Sai Swarup', email: 'pamminasaiswarup@gmail.com', role: 'Owner' };
            }
        } else {
            // Check for existing customer
            user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (!user) {
                // Create a new customer
                const name = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
                const newUser: User = {
                    id: `user-${Date.now()}`,
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    email: email,
                    role: 'Customer'
                };
                setUsers(prev => [...prev, newUser]);
                user = newUser;
            }
        }

        setCurrentUser(user);
        setIsLoginModalOpen(false); // Close the modal if it was open

        if (postLoginAction) {
            postLoginAction();
            setPostLoginAction(null);
        }
    };

    const handleGuestLogin = () => {
        setCurrentUser(guestUser);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setIsUserSwitcherOpen(false);
    };

    const totalCartItems = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

    if (!currentUser) {
        return <LoginPage onLogin={handleLogin} onGuestLogin={handleGuestLogin} />;
    }

    const renderMainContent = () => {
        switch (currentView) {
            case 'customer':
                return <CustomerMenu
                    menu={isMenuLoading ? null : menu}
                    onAddToCart={handleAddToCart}
                    settings={settings}
                />;
            case 'manager':
                return <ManageMenu
                    menu={isMenuLoading ? null : menu}
                    onAddItem={handleAddItem}
                    onUpdateItem={handleUpdateItem}
                    onDeleteItem={handleDeleteItem}
                />;
            case 'orders':
                return <OrderManagement orders={isOrdersLoading ? [] : orders} onUpdateStatus={handleUpdateOrderStatus} />;
            case 'settings':
                return <Settings settings={settings} onSave={handleUpdateSettings} />;
            default:
                return <CustomerMenu menu={isMenuLoading ? null : menu} onAddToCart={handleAddToCart} settings={settings} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#FEFBF6] dark:bg-stone-900">
            <Sidebar
                currentUser={currentUser}
                currentView={currentView}
                onSetView={setCurrentView}
                onProfileClick={handleProfileClick}
                theme={theme}
                onToggleTheme={handleToggleTheme}
            />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-y-auto p-8">
                    {renderMainContent()}
                </main>
            </div>

            {currentView === 'customer' && (
                <button onClick={() => setIsCartOpen(true)} className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-400 to-amber-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    {totalCartItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                            {totalCartItems}
                        </span>
                    )}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </button>
            )}

            <PaymentSelectionModal
                isOpen={isPaymentSelectionOpen}
                onClose={handleCancelPayment}
                totalAmount={pendingOrder?.total}
                onConfirmPayment={handleVerifyAndPlaceOrder}
                isVerifying={isVerifyingPayment}
                upiId={settings.upiId}
                restaurantName={settings.name}
            />

            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                menu={menu}
                onUpdateQuantity={handleUpdateCartQuantity}
                onCheckout={handleProceedToCheckout}
            />

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                cart={cart}
                menu={menu}
                onProceedToPay={handleInitiatePayment}
                currentUser={currentUser}
            />

            <UserSwitcherModal
                isOpen={isUserSwitcherOpen}
                onClose={() => setIsUserSwitcherOpen(false)}
                users={users}
                currentUser={currentUser}
                onSelectUser={handleSwitchUser}
                onLogout={handleLogout}
            />

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
            />
        </div>
    );
};

export default App;