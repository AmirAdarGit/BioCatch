# SDK Integration

This document describes how the client-side JavaScript SDK is integrated into the React app: how it is loaded, how the Customer Session ID (CSID) is managed, and how context is set per screen.

---

## What the SDK Does

The SDK is a client-side script that:

- Collects **behavioral, device, and interaction data** during the user session
- Sends data packets (events) to the backend
- Groups all activity by a **Customer Session ID (CSID)** so the server can link frontend behavior with API calls (e.g. init, getScore)

The app does **not** implement real analytics or scoring; the goal is to show the **integration pattern**: load the SDK, set CSID, and set context per view.

---

## Loading the SDK

**Where:** `client/index.html`

The script is loaded once for the whole app via a `<script>` tag:

```html
<script src="https://bcdn-4ff4f23f.we-stats.com/scripts/4ff4f23f/4ff4f23f.js" defer></script>
```

- **URL:** `https://bcdn-4ff4f23f.we-stats.com/scripts/4ff4f23f/4ff4f23f.js`
- **defer:** Ensures the script runs after the HTML is parsed and before our app bundle, so `window.cdApi` is available when React runs.
- The script is loaded on all “pages” because this is a single-page application (SPA); one load covers every view.

**Important:** The app must be served over HTTP(S) (e.g. `npm run dev` on localhost). The SDK and DevTools should be tested via a web server, not by opening the HTML file directly.

---

## Global API: `window.cdApi`

When the SDK script runs, it exposes a global object `window.cdApi` with methods we use:

| Method | Purpose |
|--------|--------|
| `cdApi.setCustomerSessionId(csid)` | Tells the SDK which session ID to use for all subsequent events. |
| `cdApi.changeContext(contextName)` | Sets the current screen/context (e.g. `"login_screen"`) so events can be attributed to that view. |

All usage in the app guards these calls with checks like `window.cdApi?.setCustomerSessionId` so the app does not break if the script fails to load.

---

## Customer Session ID (CSID)

### What It Is

The **CSID** is a unique identifier for the current “session.” The backend uses it to tie:

- Events sent by the SDK (behavior, device, interactions)
- API requests (e.g. init, getScore) that send the same CSID in the body

So the same ID must be used in the SDK and in API calls for the same logical session.

### How We Generate It

We use the browser’s **`crypto.randomUUID()`** to generate a new CSID (e.g. `"a1b2c3d4-e5f6-7890-abcd-ef1234567890"`). No extra library is required.

### When We Set It

1. **App mount (first load)**  
   A CSID is generated when the session context initializes and is passed to the SDK via `cdApi.setCustomerSessionId(csid)`.

2. **After logout → next login**  
   When the user logs out, we clear the session (CSID is set to `null`). When they click **Login** again, we generate a **new** CSID and call `cdApi.setCustomerSessionId(newCsid)` so the new session is distinct. This satisfies the rule: *“Generate a new CSID when the session logically restarts (e.g. logout → login).”*

### Where It Lives in the App

- **SessionContext** (`src/context/SessionContext.jsx`) holds the current `csid` in React state.
- When `csid` changes (and is non-null), a `useEffect` calls `cdApi.setCustomerSessionId(csid)` so the SDK always has the latest ID.
- A short delayed retry (e.g. 100 ms) is used so that if the SDK is not ready on first paint, we try again once.

---

## Setting Context Per Screen

Each screen (route) tells the SDK which view is active by calling **`cdApi.changeContext(...)`** when the component mounts.

| Route | Context string |
|-------|-----------------|
| Home | `home` |
| Login | `login_screen` |
| Account Overview | `account_overview` |
| Make Payment | `make_payment` |

This is done in a `useEffect` with an empty dependency array so it runs once per visit to that screen. Example (Login):

```js
useEffect(() => {
  if (typeof window !== 'undefined' && window.cdApi?.changeContext) {
    window.cdApi.changeContext('login_screen');
  }
}, []);
```

You can verify in the browser DevTools (Console or Network) that context changes as you navigate.

---

## Session Lifecycle Summary

| Step | What happens |
|------|-------------------------------|
| 1. User opens app | SDK script loads; React mounts; CSID generated; `setCustomerSessionId(csid)` called. |
| 2. User navigates | Each page calls `changeContext("...")` on mount. |
| 3. User clicks Login | If there was a previous logout, a new CSID is generated and set in the SDK; then (when implemented) init API is called and user is sent to Account. |
| 4. User clicks Logout | `clearSession()` sets CSID to `null`; user is sent to Home. Next login will create a new CSID. |

---

## Verifying in the Browser

1. **SDK loaded**  
   In the Console, run `window.cdApi` — you should see an object with methods such as `setCustomerSessionId` and `changeContext`.

2. **CSID usage**  
   After load or login, the SDK has been given the current CSID; any events it sends should be associated with that ID. You can also log or display `csid` from `useSession()` in the UI for debugging.

3. **Context changes**  
   As you move between Home, Login, Account, and Payment, check the Console or Network tab for SDK activity; the active context should match the current screen.

4. **New CSID after logout**  
   Log out, then log in again; the app generates a new UUID and calls `setCustomerSessionId` with it, so the new session has a different CSID.

---

## Files Involved

| File | Role |
|------|------|
| `index.html` | Loads the SDK script (one script tag). |
| `src/context/SessionContext.jsx` | Holds `csid`, provides `setCsid` and `clearSession`, syncs CSID to SDK when it changes. |
| `src/App.jsx` | Wraps the app in `SessionProvider` so all pages can use session state. |
| `src/pages/Home.jsx` | Calls `changeContext('home')` on mount. |
| `src/pages/Login.jsx` | Calls `changeContext('login_screen')`; on Login click, ensures a CSID exists (generates new one after logout) and sets it in the SDK. |
| `src/pages/AccountOverview.jsx` | Calls `changeContext('account_overview')`; Logout calls `clearSession()`. |
| `src/pages/MakePayment.jsx` | Calls `changeContext('make_payment')` on mount. |



Short interview answer
> “I kept it simple. The SDK is loaded with defer so it’s usually ready before our app. I added defensive checks so we never crash if the SDK fails to load, and a 100ms retry in SessionContext to handle minor race conditions. This keeps the app resilient and non-blocking. If the product later required guaranteed SDK readiness, I’d add a polling utility and optional timeout, but for this use case I prioritized simplicity and graceful degradation.”