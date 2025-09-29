# TODO: Implement Cross-Device Sync for Menu and Orders Using Vercel API

## Tasks
- [x] Install @vercel/kv dependency
- [x] Create vercel.json for deployment config
- [x] Create api/menu.js serverless function for menu CRUD
- [x] Create api/orders.js serverless function for orders CRUD
- [x] Update App.tsx: Integrate API fetch/save for menu and orders, with localStorage fallback
- [x] Add loading states if needed for components
- [x] Local test: Verify in-session sync with fallback
- [ ] Deploy to Vercel: Set up KV store, test cross-device (laptop update, mobile view)
- [ ] Verify orders sync: Place order on mobile, view in manager on laptop

## Notes
- Uses Vercel KV for shared storage (menu key: 'restaurantMenu', orders key: 'restaurantOrders')
- Fallback to localStorage for local dev (API fails without deployment)
- No polling; refetch on mount and after updates
- Initial data from mockMenu.ts and mockOrders.ts as KV defaults
- After local changes, user needs to run `npm i -g vercel` and `vercel` for deployment
