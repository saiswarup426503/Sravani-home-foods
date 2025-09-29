# TODO: Integrate Supabase for Realtime Database Sync

## Completed
- [x] Install @supabase/supabase-js
- [x] Create lib/supabase.js with client config
- [x] Update api/menu.js to use Supabase for CRUD operations
- [x] Update api/orders.js to use Supabase for CRUD operations
- [x] Update App.tsx to import supabase and add realtime subscriptions
- [x] Remove mock data imports and define inline fallbacks
- [x] Delete unused mock data files (data/mockMenu.ts, data/mockOrders.ts, data/mockUsers.ts)

## Remaining
- [ ] Populate Supabase tables with initial menu and orders data
- [ ] Test API endpoints (GET/POST for menu and orders)
- [ ] Run dev server and verify realtime sync across devices/tabs
- [ ] Deploy to Vercel with env vars (SUPABASE_URL, SUPABASE_ANON_KEY)
- [ ] Confirm no lag in changes visibility

## Notes
- Ensure Supabase tables 'menu' and 'orders' exist with correct columns.
- Realtime subscriptions trigger refetch on any change, ensuring live updates.
- Fallback to empty arrays if API fails.
