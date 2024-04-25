'use server';
import { NextRequest } from "next/server";
import { ERROR_MESSAGES } from "@/constants";

export async function POST(request: NextRequest): Promise<Response> {
    const token = await request.json();
    const authorization = 'Bearer ' + token.access_token;
    try {
        const response = await fetch(token.href, {
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