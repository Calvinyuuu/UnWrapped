'use server';
import { NextRequest } from "next/server";
import { ERROR_MESSAGES } from "@/constants";

export async function POST(request: NextRequest) {
    const token = await request.json();
    const authorization = 'Bearer ' + token.access_token;
    let endpoint = 'https://api.spotify.com/v1/me/top/tracks?limit=10';
    if (token.time_range) {
        endpoint += `&time_range=${token.time_range}`;
    }
    try {
        const response = await fetch(endpoint, {
            headers: {
                Authorization: authorization
            }
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ response: ERROR_MESSAGES.unauthorized }), { status: 401 });
    }
}