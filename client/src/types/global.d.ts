export {};

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface Window {
    cdApi?: {
      setCustomerSessionId?(id: string): void;
      changeContext?(name: string): void;
    };
  }
}
