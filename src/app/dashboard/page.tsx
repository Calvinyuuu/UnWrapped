'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
import { ResponseData } from '../../interfaces/songProp';
const Card = dynamic(() => import('../../components/Card'), { ssr: true });

//function to handle the POST request to trade for the access token and to display the information traded with the access token
const Page: React.FC = () => {
    //get the state and code from the URL
    const searchParams = useSearchParams();
    const state = searchParams.get('state');
    const code = searchParams.get('code');
    const router = useRouter();
    //create the body of the request
    const data = {
        state: state,
        code: code
    }
    // Define state to hold the data
    const [songData, setSongData] = useState<ResponseData>({ items: [] });

    useEffect(() => {
        const getData = async () => {

            let access_token = '';

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
                access_token = responseData.token;
            } catch (error) {
                console.log(error);
            }
            //should i store the token in a cookie? or should i just request the data from the api?
            try {
                const response = await fetch('/api/data', {
                    method: "POST",
                    mode: 'no-cors',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ access_token }),
                });
                const responseData = await response.json() as ResponseData;
                setSongData(responseData as ResponseData);
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
        <div>
            <Card {...songData} />
        </div>
    );
};

export default Page;