import db from '@/lib/db';
import { unstable_noStore } from 'next/cache';

export async function fetchAllRomms() {
    unstable_noStore();
    const rooms = await db.room.findMany();
    return rooms;
}
