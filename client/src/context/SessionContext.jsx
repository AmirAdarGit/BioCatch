import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SessionContext = createContext(null);

const LOG_PREFIX = '[Session]';

export function SessionProvider({ children }) {
  const [csid, setCsidState] = useState(() => {
    const id = crypto.randomUUID();
    console.log(`${LOG_PREFIX} CSID created (app load):`, id);
    return id;
  });

  const setCsid = useCallback((value) => {
    console.log(`${LOG_PREFIX} setCsid called:`, value);
    setCsidState(value);
  }, []);

  const clearSession = useCallback(() => {
    console.log(`${LOG_PREFIX} clearSession called — CSID cleared`);
    setCsidState(null);
  }, []);

  useEffect(() => {
    if (!csid) {
      console.log(`${LOG_PREFIX} CSID is null (e.g. after logout)`);
      return;
    }
    console.log(`${LOG_PREFIX} CSID changed / syncing to SDK:`, csid);
    const applyToSdk = () => {
      if (typeof window !== 'undefined' && window.cdApi?.setCustomerSessionId) {
        window.cdApi.setCustomerSessionId(csid);
        console.log(`${LOG_PREFIX} SDK setCustomerSessionId OK`);
      }
    };
    applyToSdk();
    const t = setTimeout(applyToSdk, 100);
    return () => clearTimeout(t);
  }, [csid]);

  const value = { csid, setCsid, clearSession };
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
