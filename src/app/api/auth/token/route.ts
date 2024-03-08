'use server';
import { NextRequest } from "next/server";
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const data = await request.json();
    const cookieParams = cookies().get('state')?.value;


    if (data.state === cookieParams) {
        const response = await requestToken(data.code);
        return new Response('Authorized', { status: 200 });
    } else {
        return new Response('Unauthorized', { status: 401 });
    }
}

async function requestToken(code: string) {
    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('redirect_uri', process.env.REDIRECT_URI!);

    const buffer = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET);
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + (buffer.toString('base64'))
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        return new Response('Unauthorized', { status: 401 });
    }
}