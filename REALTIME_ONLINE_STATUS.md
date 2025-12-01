# Real-Time Kader Online Status System

## Overview
This system provides accurate, real-time tracking of Kader online status for Parents in the consultation feature.

## How It Works

### Backend (Laravel)

1. **Database Schema**
   - Added `last_seen_at` timestamp column to `users` table
   - Tracks the last time a user made any request to the server

2. **Middleware (`UpdateUserActivity`)**
   - Runs on every authenticated request
   - Updates `last_seen_at` timestamp
   - **Optimized for production**: Only writes to DB if last update was > 1 minute ago
   - This throttling reduces database load while maintaining accuracy

3. **User Model**
   - Added `is_online` attribute (appended to JSON)
   - Returns `true` if `last_seen_at` is within the last 5 minutes
   - Returns `false` if older than 5 minutes or null

4. **API Responses**
   - All consultation-related endpoints include `is_online` status
   - Endpoints: `/parent/kaders`, `/parent/consultations`, `/parent/consultations/{id}`

### Frontend (React)

1. **Visual Indicators**
   - **Green dot** on Kader avatar when online
   - **"Online" text** in consultation detail header
   - **Green emoji** (🟢) in dropdown selectors

2. **Auto-Refresh Polling**
   - **ConsultationList**: Polls every 30 seconds
   - **ConsultationDetail**: Polls every 30 seconds
   - Only refreshes when page is visible (respects `document.visibilityState`)
   - Silent refresh (no loading spinner) to avoid UI flicker
   - Shows subtle "Memperbarui status..." indicator during refresh

3. **Smart Caching**
   - Uses `DataCacheContext` for initial page loads
   - Auto-refresh bypasses cache to get latest status
   - Invalidates cache after create/delete operations

## Production Deployment

### What Happens in Production:

1. **Kader Action**: When a Kader uses the app (any page, any action)
   - Their `last_seen_at` updates every minute (throttled)
   - Backend sets `is_online = true` in API responses

2. **Parent View**: Parents see status updates
   - Initial load: Shows current status from API
   - Every 30 seconds: Silently refreshes to get latest status
   - If Kader leaves: Status changes from "Aktif" to offline after 5 minutes

3. **Real-Time Accuracy**:
   - Status is accurate within **30 seconds** on the frontend
   - Backend considers users online if active within **5 minutes**
   - This is industry standard (similar to WhatsApp Web, Facebook)

### Performance Optimizations:

1. **Database Load**: 
   - Throttled writes (max 1 write per user per minute)
   - Indexed `last_seen_at` column for fast queries

2. **Network Load**:
   - Silent refresh (smaller payload, no redundant data)
   - Only refreshes when page is visible

3. **User Experience**:
   - No loading spinners during refresh
   - Subtle indicator shows when updating

## Testing in Production

To verify the system works correctly when deployed:

1. **Test Setup**:
   - Open app as Kader in one browser/device
   - Open app as Parent in another browser/device

2. **Test Cases**:
   - **Test 1**: Kader logs in → Parent should see "Online" within 30 seconds
   - **Test 2**: Kader closes app → Parent should see "Offline" after 5-6 minutes
   - **Test 3**: Kader uses app → Status should remain "Online" for Parent

## Configuration

You can adjust these values in the code:

- **Polling interval**: Line 27 of `ConsultationList.jsx` and `ConsultationDetail.jsx`
  - Default: `30000` (30 seconds)
  - Adjust based on your server capacity and UX needs

- **Online threshold**: Line 12 of `User.php` `getIsOnlineAttribute()`
  - Default: `5` minutes
  - Increase for more lenient status, decrease for stricter

- **Update throttle**: Line 26 of `UpdateUserActivity.php`
  - Default: `1` minute
  - Decrease for more accuracy, increase for less DB load

## Files Modified

### Backend:
- `database/migrations/2025_12_01_174658_add_last_seen_at_to_users_table.php`
- `app/Http/Middleware/UpdateUserActivity.php`
- `bootstrap/app.php`
- `app/Models/User.php`
- `app/Http/Controllers/ParentConsultationController.php`

### Frontend:
- `resources/js/components/konten/ConsultationList.jsx`
- `resources/js/components/konten/ConsultationDetail.jsx`
- `resources/js/components/konten/CreateConsultation.jsx`

## Future Enhancements (Optional)

For even more real-time updates, consider:
1. **Laravel Broadcasting** with Pusher/Socket.io for instant updates
2. **Redis** for faster status queries instead of database
3. **Server-Sent Events** for one-way status streaming

However, the current implementation is production-ready and sufficient for most use cases.
