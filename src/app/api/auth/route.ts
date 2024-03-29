'use server';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

//function to handle the GET request to get the code from spotify
export async function GET() {
    //set the scope and state for the request
    const scope = 'streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state user-library-read user-read-recently-played user-top-read';
    const state = generateRandomString(16);
    //set the state in a cookie for later verification
    cookies().set('state', state, { httpOnly: true });
    //create the URL for the request
    let authUrl: string = '';
    try {
        //create the URL for the request
        const queryParams = new URLSearchParams({
            client_id: process.env.CLIENT_ID!,
            redirect_uri: process.env.REDIRECT_URI!,
            response_type: 'code',
            state: state,
            scope: scope,
        });
        authUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
        return NextResponse.json({ url: authUrl, state: state }, { status: 200 });
    } catch (error) {
        console.error('Error redirecting to Spotify authorization:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

//function to generate a random string with a given length
function generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

