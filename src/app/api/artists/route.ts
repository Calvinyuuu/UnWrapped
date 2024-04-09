'use server';
import { NextRequest } from "next/server";
import { ERRORMESSAGES } from "@/constants";

export async function POST(request: NextRequest): Promise<Response> {
    const token = await request.json();
    const authorization = 'Bearer ' + token.access_token;
    let endpoint = 'https://api.spotify.com/v1/me/top/artists?limit=10';
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
        console.log(error);
        return new Response(ERRORMESSAGES.unauthorized, { status: 401 });
    }
}