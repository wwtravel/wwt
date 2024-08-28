'use client'

import { NavBar, PassResetPageLogIn, Footer } from '@/components';
import { useRouter } from '@/navigation';
import { useRef, useState } from 'react';

interface pageContentProps{
    token : string;
}

const PageContent: React.FC<pageContentProps> = ({ token }) => {
    const [showPage, setShowPage] = useState(false);
    const hasFetchedRef = useRef(false);
    const router = useRouter();
  
    const fetchToken = async (token: string) => {
      try {
        const response = await fetch(`/api/reset-password/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          setShowPage(true);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    };
  
    // Run API call if it hasn't been run yet
    if (token && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchToken(token);
    }
  
    if (!showPage) return null;
  
    return (
      <div>
        <NavBar />
        <PassResetPageLogIn />
        <Footer />
      </div>
    );
  };
  
  export default PageContent;