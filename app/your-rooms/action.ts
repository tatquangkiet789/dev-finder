'use server';

import { deleteRoom, fetchRoomById } from '@/data-access/rooms';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function deleteRoomAction(roomId: string) {
    const session = await getSession();
    if (!session) {
        throw new Error('User not authenticated');
    }

    const room = await fetchRoomById(roomId);
    if (!room) {
        throw new Error('Room not found');
    }

    if (room.userId !== session.user.id) {
        throw new Error('Not allowed to deleted');
    }

    await deleteRoom(roomId);
    revalidatePath('/your-rooms');
    revalidatePath('/');
}
