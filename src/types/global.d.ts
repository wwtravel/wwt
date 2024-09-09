export {};

declare global {
  interface Window {
    $_Tawk?: {
      init?: () => void;
      showWidget?: () => void;
      hideWidget?: () => void;
    };
    Tawk_API?: {
      onLoad?: () => void;
      showWidget?: () => void;
      hideWidget?: () => void;
    };
  }
}