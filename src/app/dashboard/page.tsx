'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const state = searchParams.get('state');
    const code = searchParams.get('code');
    const router = useRouter();
    const data = {
        state: state,
        code: code
    }

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await fetch('/api/auth/token', {
                    method: "POST",
                    mode: 'no-cors',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            } catch (error) {
                console.log(error);
            }
        }
        if (state != 'error=access_denied') {
            verify();
        } else {
            router.push('/');
        }
    }, [])

    return (
        <div>
            redirected
        </div>
    );
};

export default Page;