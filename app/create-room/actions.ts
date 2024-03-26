'use server';

import db from '@/lib/db';
import { CreateRoom } from './create-room-form';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createRoomAction(roomData: CreateRoom) {
    const { name, language, description, githubRepo } = roomData;
    const session = await getSession();
    if (!session) {
        throw new Error('You must be logged in to create new room');
    }
    await db.room.create({
        data: {
            githubRepo,
            language,
            description,
            name,
            userId: session.user.id,
        },
    });
    revalidatePath('/');
}
