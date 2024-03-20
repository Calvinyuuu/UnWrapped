'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
import { ResponseData } from '../../interfaces/songProp';
const Card = dynamic(() => import('../../components/Card'), { ssr: true });

//function to handle the POST request to trade for the access token and to display the information traded with the access token
const Page: React.FC = () => {
    const router = useRouter();
    //get the state and code from the URL
    const searchParams = useSearchParams();
    const state: string = searchParams.get('state') as string;
    const code: string = searchParams.get('code') as string;

    // Define state to hold the data
    const [songDataShort, setSongDataShort] = useState<ResponseData>({ items: [] });
    const [songDataMedium, setSongDataMedium] = useState<ResponseData>({ items: [] });
    const [songDataLong, setSongDataLong] = useState<ResponseData>({ items: [] });

    useEffect(() => {
        const getData = async () => {
            let access_token = await getAccessCode(state, code);
            try {
                const response = await fetch('/api/data', {
                    method: "POST",
                    mode: 'no-cors',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ access_token: access_token, time_range: 'short_term' }),
                });
                const responseData = await response.json() as ResponseData;
                console.log(responseData.items.slice(0, 3));
                setSongDataShort(responseData as ResponseData);
            } catch (error) {
                console.log(error);
            }
            try {
                const response = await fetch('/api/data', {
                    method: "POST",
                    mode: 'no-cors',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ access_token: access_token, time_range: 'medium_term' }),
                });
                const responseData = await response.json() as ResponseData;
                setSongDataMedium(responseData as ResponseData);
            } catch (error) {
                console.log(error);
            }
            try {
                const response = await fetch('/api/data', {
                    method: "POST",
                    mode: 'no-cors',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ access_token: access_token, time_range: 'long_term' }),
                });
                const responseData = await response.json() as ResponseData;
                setSongDataLong(responseData as ResponseData);
            } catch (error) {
                console.log(error);
            }
        }
        //if the state is not 'error=access_denied' then getToken the state and code
        if (state != 'error=access_denied') {
            getData();
        } else {
            router.push('/');
        }
    }, [])

    return (
        <>
            <Card {...songDataShort} />
            <Card {...songDataMedium} />
            <Card {...songDataLong} />
        </>
    );
};

async function getAccessCode(state: string, code: string) {
    //create the body of the request
    const data = {
        state: state,
        code: code
    };
    try {
        const response = await fetch('/api/auth/token', {
            method: "POST",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData.token;
    } catch (error) {
        console.log(error);
    }
    return '';
}

export default Page;