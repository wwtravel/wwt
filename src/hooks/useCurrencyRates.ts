import { useState, useEffect } from 'react';

// Define the type for the currency data
interface Currency {
  id: string;
  title: string; // e.g., 'USD', 'MDL', 'CHF'
  value: number; // Conversion rate compared to EUR
  last_update: string;
}

// Define the return type for the hook
interface CurrencyRates {
  rates: { [key: string]: number }; // Object with currency codes as keys and conversion rates as values
  loading: boolean;
  error: string | null;
}

// Custom hook to fetch currency rates
export const useCurrencyRates = (): CurrencyRates => {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const response = await fetch('/api/currency');
        if (!response.ok) {
          throw new Error('Failed to fetch currency data');
        }
        const data: Currency[] = await response.json();
        
        // Map the data to an object with currency codes as keys and values as rates
        const ratesMap: { [key: string]: number } = {};
        data.forEach(currency => {
          ratesMap[currency.title] = currency.value;
        });
        
        setRates(ratesMap);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchCurrencyRates();
  }, []);

  return { rates, loading, error };
};