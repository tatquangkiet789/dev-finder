import db from '@/lib/db';

export default async function Home() {
    const rooms = await db.room.findMany();

    return (
        <main className='flex items-center justify-between'>
            {rooms.map((room) => (
                <div key={room.id}>{room.name}</div>
            ))}
        </main>
    );
}
