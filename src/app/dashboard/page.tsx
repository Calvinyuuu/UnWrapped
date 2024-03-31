'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
import { ResponseData } from '../../interfaces/songProp';
import { ArtistData } from '../../interfaces/artistProp';
const Card = dynamic(() => import('../../components/Card'), { ssr: true });

//function to handle the POST request to trade for the access token and to display the information traded with the access token
const Page: React.FC = () => {
    const router = useRouter();
    //get the state and code from the URL
    const searchParams = useSearchParams();
    const state: string = searchParams.get('state') as string;
    const code: string = searchParams.get('code') as string;

    if (typeof window !== 'undefined') {
        // Access window object here
        window.history.pushState({}, "", "/dashboard");
    }

    // Define state to hold the data
    const [songDataShort, setSongDataShort] = useState<ResponseData>({ items: [] });
    const [songDataMedium, setSongDataMedium] = useState<ResponseData>({ items: [] });
    const [songDataLong, setSongDataLong] = useState<ResponseData>({ items: [] });

    const [genreDataShort, setGenreDataShort] = useState<Map<string, number>>(new Map<string, number>);
    const [genreDataMedium, setGenreDataMedium] = useState<Map<string, number>>(new Map<string, number>);
    const [genreDataLong, setGenreDataLong] = useState<Map<string, number>>(new Map<string, number>);

    useEffect(() => {
        // window.history.pushState({}, "", "/dashboard");
        const getData = async () => {
            let access_token = await getAccessCode(state, code);

            const songsShort = await getSongData(access_token, 'short_term');
            const songsMedium = await getSongData(access_token, 'medium_term');
            const songsLong = await getSongData(access_token, 'long_term');
            setSongDataShort(songsShort!);
            setSongDataMedium(songsMedium!);
            setSongDataLong(songsLong!);
            const genresShort = await getTotalGenres(access_token, 'short_term');
            const genresMedium = await getTotalGenres(access_token, 'medium_term');
            const genresLong = await getTotalGenres(access_token, 'long_term');
            setGenreDataShort(genresShort!);
            setGenreDataMedium(genresMedium!);
            setGenreDataLong(genresLong!);
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
            <Card {...songDataShort} dataRange="Last Month" genreData={genreDataShort} />
            <Card {...songDataMedium} dataRange="Last Six Months" genreData={genreDataMedium} />
            <Card {...songDataLong} dataRange="Last Couple Years" genreData={genreDataLong} />
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

async function getSongData(access_token: string, time_range: string) {
    if (access_token) {
        try {
            const response = await fetch('/api/data', {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ access_token: access_token, time_range: time_range }),
            });
            const responseData = await response.json() as ResponseData;
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }
}

async function getTotalGenres(access_token: string, time_range: string) {
    try {
        const response = await fetch('/api/artists', {
            method: "POST",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ access_token: access_token, time_range: time_range }),
        });
        const artistData = await response.json() as ArtistData;
        return tallyGenres(artistData);
    } catch (error) {
        console.log(error);
    }
}

function tallyGenres(data: ArtistData) {
    if (data.items) {
        let genreCounts = new Map<string, number>();

        data.items.forEach(item => {
            item.genres.forEach(genre => {
                if (genreCounts.has(genre)) {
                    genreCounts.set(genre, genreCounts.get(genre)! + 1);
                } else {
                    genreCounts.set(genre, 1);
                }
            });
        });
        return genreCounts;
    }
}


export default Page;