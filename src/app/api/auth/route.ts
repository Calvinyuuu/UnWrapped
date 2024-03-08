'use server';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET() {
    const scope = 'streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state user-library-read user-read-recently-played user-top-read';
    const state = generateRandomString(16);
    cookies().set('state', state, { httpOnly: true });
    let authUrl: string | null = null;
    try {
        const queryParams = new URLSearchParams({
            client_id: process.env.CLIENT_ID!,
            redirect_uri: process.env.REDIRECT_URI!,
            response_type: 'code',
            state: state,
            scope: scope,
        });
        authUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
    } catch (error) {
        console.error('Error redirecting to Spotify authorization:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
    return NextResponse.json({ url: authUrl, state: state }, { status: 200 });
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

