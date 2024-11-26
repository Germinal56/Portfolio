'use client'

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function RedirectPage() {
    useEffect(() => {
      redirect('/work/honest-investments');
    }, []);
}