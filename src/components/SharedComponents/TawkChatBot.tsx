'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const TawkChatBot = ({ propertyId, widgetId } : { propertyId: string, widgetId: string }) => {
  const pathname = usePathname();

  // Function to load the Tawk.to script
  const loadTawkScript = () => {
    const existingScript = document.getElementById('tawk-script');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'tawk-script';
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.async = true;
    script.onload = () => {
      if (window.Tawk_API) {
        window.Tawk_API.onLoad = () => {
          window.Tawk_API!.showWidget();
        };
      }
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadTawkScript();
  }, [pathname, propertyId, widgetId]);

  return null;
};

export default TawkChatBot;