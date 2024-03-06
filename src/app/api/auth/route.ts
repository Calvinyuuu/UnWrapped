'use server'
// import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation'

export async function GET() {
    const redirectUri: string = "http://localhost:3000";
    const scope = "streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state user-library-read user-read-recently-played user-top-read";
    const state = generateRandomString(16);
    let authUrl: string | null = null;
    try {
        const queryParams = new URLSearchParams({
            client_id: process.env.CLIENT_ID!,
            redirect_uri: redirectUri,
            response_type: 'code',
            state: state,
            scope: scope,
        });
        // const authUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
        authUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
        // console.log(authUrl);
        // return NextResponse.redirect(authUrl);
    } catch (error) {
        console.error('Error redirecting to Spotify authorization:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    } finally {
        if (authUrl)
            return redirect(authUrl);
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

