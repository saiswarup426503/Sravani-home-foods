import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const transformOrder = (order) => {
    return {
        id: order.id,
        date: new Date(order.orderDate).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
        customerDetails: {
            name: order.fullName,
            phone: order.phoneNumber,
            email: order.emailAddress,
            type: order.orderType,
        },
        items: order.items,
        total: order.totalAmount,
        specialInstructions: order.specialInstructions || '',
        status: order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase(),
    };
};

export default async (req, res) => {
    try {
        const { method } = req;

        if (method === 'GET') {
            const { data: orders, error } = await supabase
                .from('orders')
                .select('*')
                .order('orderDate', { ascending: false });

            if (error) throw error;

            const transformedOrders = orders.map(transformOrder);

            res.status(200).json(transformedOrders);
        } else if (method === 'POST') {
            const { action, order, orderId, status } = req.body;

            if (action === 'add') {
                // Map order object to match new table schema
                const orderData = {
                    id: order.id,
                    fullName: order.customerDetails.name,
                    phoneNumber: order.customerDetails.phone,
                    emailAddress: order.customerDetails.email,
                    orderType: order.customerDetails.type,
                    specialInstructions: order.specialInstructions,
                    items: order.items, // should be JSON array
                    totalAmount: order.total,
                    orderDate: order.date || new Date().toISOString(),
                    status: order.status.toLowerCase() || 'pending',
                };

                const { data, error } = await supabase
                    .from('orders')
                    .insert([orderData])
                    .select();

                if (error) throw error;
                res.status(200).json(data);
            } else if (action === 'updateStatus') {
                const { data, error } = await supabase
                    .from('orders')
                    .update({ status: status.toLowerCase() })
                    .eq('id', orderId)
                    .select();

                if (error) throw error;
                res.status(200).json(data);
            } else {
                res.status(400).json({ error: 'Invalid action' });
            }
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
