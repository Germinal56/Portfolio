'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface TrackerContextType {
  trackEvent: (eventType: string, additionalData?: Record<string, any>) => void;
}

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

const TrackerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  const trackEvent = (eventType: string, additionalData: Record<string, any> = {}) => {
    const anonId = localStorage.getItem('anonId') || generateAnonId();
    localStorage.setItem('anonId', anonId);

    const ABLabel = localStorage.getItem('ABLabel') || assignABLabel();
    localStorage.setItem('ABLabel', ABLabel);

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        anonId,
        eventType,
        additionalData,
        ABLabel,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => console.error('Failed to log tracking event:', err));
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackEvent('page_view', { page: url });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDepth = Math.round((window.scrollY / document.body.scrollHeight) * 100);
      trackEvent('scroll_depth', { scrollDepth });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <TrackerContext.Provider value={{ trackEvent }}>
      {children}
    </TrackerContext.Provider>
  );
};

const useTracker = () => {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
};

// Helpers
const generateAnonId = (): string => `anon-${crypto.randomUUID()}`;

const assignABLabel = (): 'variantA' | 'variantB' | 'control' => {
  const randomValue = Math.random();
  if (randomValue < 0.5) return 'variantA';
  return 'variantB';
};

export { TrackerProvider, useTracker };