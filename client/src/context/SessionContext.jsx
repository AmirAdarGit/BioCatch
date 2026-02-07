import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [csid, setCsidState] = useState(() => crypto.randomUUID());

  const setCsid = useCallback((value) => {
    setCsidState(value);
  }, []);

  const clearSession = useCallback(() => {
    setCsidState(null);
  }, []);

  useEffect(() => {
    if (!csid) return;
    const applyToSdk = () => {
      if (typeof window !== 'undefined' && window.cdApi?.setCustomerSessionId) {
        window.cdApi.setCustomerSessionId(csid);
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
