import { getSession } from '@/lib/auth';
import db from '@/lib/db';
import { unstable_noStore } from 'next/cache';

export async function fetchAllRooms(search: string | undefined) {
    unstable_noStore();
    const rooms = await db.room.findMany({
        where: {
            language: {
                contains: search?.toLowerCase(),
                mode: 'insensitive',
            },
        },
    });
    return rooms;
}

export async function fetchAllUserRooms() {
    unstable_noStore();
    const session = await getSession();
    if (!session) {
        throw new Error('User not authenticated');
    }
    const rooms = await db.room.findMany({
        where: {
            userId: session!.user.id,
        },
    });
    return rooms;
}

export async function fetchRoomById(id: string) {
    unstable_noStore();
    const room = await db.room.findFirst({
        where: {
            id,
        },
    });

    return room;
}

export async function deleteRoom(id: string) {
    console.log('deleteRoom in data-access');
    await db.room.delete({
        where: {
            id,
        },
    });
}
