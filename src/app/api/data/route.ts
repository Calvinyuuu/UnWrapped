'use server';
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const token = await request.json();
    const authorization = 'Bearer ' + token.access_token;
    try {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                Authorization: authorization
            }
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
        return new Response('Unauthorized', { status: 401 });
    }
    return new Response('Done', { status: 200 });
}