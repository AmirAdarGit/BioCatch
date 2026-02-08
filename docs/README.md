# Project explanation

## What this is

A small web app that simulates a **client-side SDK + server API** integration.  
User flow: **Home → Login → Account Overview → Make Payment → Logout**.  
No real auth or database; the server is a mock.

## Main pieces

- **Client (React SPA)**  
  Loads the dummy SDK, keeps a **Customer Session ID (CSID)** for the session, and calls `cdApi.changeContext(...)` on each screen.  
  **Login** sends **init** to the server; **Make Payment** sends **getScore** (only after init for that CSID). All API calls use **fetch** from the browser.

- **Server (Express)**  
  Exposes **POST /api/init** and **POST /api/getScore**. CORS is set so only the frontend origin (e.g. `http://localhost:5173`) can call these endpoints.

## How to run

```bash
# Terminal 1 – server
cd server && npm install && npm run dev

# Terminal 2 – client
cd client && npm install && npm run dev
```

Open the client URL (e.g. `http://localhost:5173`) in the browser. Use DevTools (Console + Network) to confirm SDK load, CSID, context changes, and API requests/responses.

## Where things live

| What            | Where |
|-----------------|--------|
| SDK script      | `client/index.html` |
| CSID + context  | `client/src/context/SessionContext.tsx`, and each page’s `useEffect` |
| init / getScore | `client/src/api/client.ts`; triggered from `Login.tsx` and `MakePayment.tsx` |
| API routes      | `server/src/routes/api.ts` |
| CORS            | `server/src/app.ts` |
