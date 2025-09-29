import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://agozysbwkbnmsejwcomp.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnb3p5c2J3a2JubXNlandjb21wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE0NTEyMCwiZXhwIjoyMDc0NzIxMTIwfQ.ttk1GxjfxSepmQbEOY19HObFHD8sA5OrWBRC5RM_In4';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async (req, res) => {
    try {
        const { method } = req;

        if (method === 'GET') {
            const { data: menu, error } = await supabase
                .from('menu')
                .select('*')
                .order('id');

            if (error) throw error;
            res.status(200).json(menu);
        } else if (method === 'POST') {
            const { action, item, itemId } = req.body;

            if (action === 'add') {
                const newItem = { ...item, id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
                const { data, error } = await supabase
                    .from('menu')
                    .insert([newItem])
                    .select();

                if (error) throw error;
                res.status(200).json(data);
            } else if (action === 'update') {
                const { data, error } = await supabase
                    .from('menu')
                    .update(item)
                    .eq('id', item.id)
                    .select();

                if (error) throw error;
                res.status(200).json(data);
            } else if (action === 'delete') {
                const { error } = await supabase
                    .from('menu')
                    .delete()
                    .eq('id', itemId);

                if (error) throw error;
                res.status(200).json({ message: 'Item deleted' });
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
