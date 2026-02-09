import { createContext, useContext, useState, useEffect, useCallback, type ReactNode, type ReactElement } from 'react';

const LOG_PREFIX = '[Session]';
const STORAGE_KEY = 'biocatch_csid';

function getStoredCsid(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function setStoredCsid(value: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (value) window.localStorage.setItem(STORAGE_KEY, value);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export interface SessionContextValue {
  csid: string | null;
  setCsid: (value: string | null) => void;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps): ReactElement {
  const [csid, setCsidState] = useState<string | null>(getStoredCsid);

  const setCsid = useCallback((value: string | null) => {
    console.log(`${LOG_PREFIX} setCsid called:`, value);
    setCsidState(value);
    setStoredCsid(value);
  }, []);

  const clearSession = useCallback(() => {
    console.log(`${LOG_PREFIX} clearSession called — CSID cleared`);
    setCsidState(null);
    setStoredCsid(null);
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

  const value: SessionContextValue = { csid, setCsid, clearSession };
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
