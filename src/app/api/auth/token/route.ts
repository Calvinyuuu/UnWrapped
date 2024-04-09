'use server';
import { NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { Buffer } from 'buffer';
import { ERRORMESSAGES } from "@/constants";

//function to request the token
async function requestToken(code: string): Promise<string> {
    //create the body of the request
    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('redirect_uri', process.env.REDIRECT_URI!);
    //create the buffer for the Authorization header
    const buffer = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64');
    try {
        //send the request to the Spotify API
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            body: body,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + buffer
            },
        });
        const data = await response.json();
        if (data.access_token) {
            return data.access_token;
        }
    } catch (error) {
        return ERRORMESSAGES.error;
    }
    return ERRORMESSAGES.error;
}

//function to handle the POST request
export async function POST(request: NextRequest): Promise<Response> {
    const data = await request.json();
    const cookieParams = cookies().get('state')?.value;

    //check if the state from the request matches the state from the cookie
    if (data.state === cookieParams) {
        //if it does, request the token
        const response = await requestToken(data.code);
        if (response !== ERRORMESSAGES.error) {
            return new Response(JSON.stringify({ token: response }), { status: 200 });
        }
    }
    return new Response(JSON.stringify({ response: ERRORMESSAGES.unauthorized }), { status: 401 });
}