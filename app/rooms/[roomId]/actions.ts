'use server';

import { StreamChat } from 'stream-chat';

export async function generateTokenAction(userId: string) {
    const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
    const apiSecret = process.env.NEXT_PUBLIC_GET_STREAM_API_SECRET!;
    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
    const token = serverClient.createToken(userId);

    return token;
}
