import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async (req, res) => {
    try {
        const { method } = req;

        if (method === 'GET') {
            const { data: orders, error } = await supabase
                .from('orders')
                .select('*')
                .order('orderDate', { ascending: false });

            if (error) throw error;
            res.status(200).json(orders);
        } else if (method === 'POST') {
            const { action, order, orderId, status } = req.body;

            if (action === 'add') {
                // Map order object to match new table schema
                const orderData = {
                    id: order.id,
                    fullName: order.fullName,
                    phoneNumber: order.phoneNumber,
                    emailAddress: order.emailAddress,
                    orderType: order.orderType,
                    specialInstructions: order.specialInstructions,
                    items: order.items, // should be JSON array
                    totalAmount: order.totalAmount,
                    orderDate: order.orderDate || new Date().toISOString(),
                    status: order.status || 'pending',
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
                    .update({ status })
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
