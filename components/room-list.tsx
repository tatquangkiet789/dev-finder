import { fetchAllRooms, fetchAllUserRooms } from '@/data-access/rooms';
import { RoomCard } from './room-card';
import { getSession } from '@/lib/auth';

const FETCH_TYPE = {
    all: fetchAllRooms,
    userId: fetchAllUserRooms,
};

type FetchType = keyof typeof FETCH_TYPE;

async function fetchRooms({ type, slug }: { type: FetchType; slug?: string }) {
    return FETCH_TYPE[type](slug);
}

export async function RoomList({ type, slug }: { type: FetchType; slug?: string }) {
    const rooms = await fetchRooms({ type, slug });
    const session = await getSession();

    if (!rooms || rooms.length === 0) {
        return <p>No rooms available.</p>;
    }

    return (
        <div className='grid grid-cols-3 gap-4'>
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} isDeleted={session?.user.id === room.userId} />
            ))}
        </div>
    );
}
