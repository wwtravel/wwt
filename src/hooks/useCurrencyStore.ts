import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyState {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'EUR',
      setCurrency: (currency: string) => set({ currency }),
    }),
    {
      name: 'currency-storage',
      getStorage: () => localStorage,
    }
  )
);