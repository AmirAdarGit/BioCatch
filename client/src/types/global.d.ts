export {};

declare global {
  interface Window {
    cdApi?: {
      setCustomerSessionId?(id: string): void;
      changeContext?(name: string): void;
    };
  }
}
