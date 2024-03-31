import db from '@/lib/db';
import { unstable_noStore } from 'next/cache';

export async function fetchAllRomms(search: string | undefined) {
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

export async function fetchRoomById(id: string) {
    unstable_noStore();
    const room = await db.room.findFirst({
        where: {
            id,
        },
    });

    return room;
}
