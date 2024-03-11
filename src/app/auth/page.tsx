'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'

const Page: React.FC = () => {
    const router = useRouter();
    useEffect(() => {
        const auth = async () => {
            let authUrl = '';
            try {
                const response = await fetch('/api/auth', { mode: 'no-cors' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                authUrl = json.url;
            } catch (error) {
                console.error('Error authorizing with Spotify:', error);
            }
            if (authUrl) {
                router.push(authUrl);
            }
        }
        auth();
    })


    return (
        <></>
    );
};

export default Page;