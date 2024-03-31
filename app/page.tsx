import { TagsList } from '@/components/tags-list';
import { buttonVariants } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { fetchAllRomms } from '@/data-access/rooms';
import { Room } from '@prisma/client';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { SearchBar } from './search-bar';

function RoomCard({ room }: { room: Room }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Link
                    href={room.githubRepo}
                    className='flex items-center gap-2'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <GithubIcon /> Github Project
                </Link>
            </CardContent>
            <CardContent>
                <TagsList tags={room.language} />
            </CardContent>
            <CardFooter>
                <Link href={`/rooms/${room.id}`} className={buttonVariants({ variant: 'default' })}>
                    Join Room
                </Link>
            </CardFooter>
        </Card>
    );
}

export default async function Home({ searchParams }: { searchParams: { search: string } }) {
    const rooms = await fetchAllRomms(searchParams.search);

    return (
        <main className='min-h-screen p-8'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-4xl'>Find Dev Rooms</h1>
                <Link href={'/create-room'} className={buttonVariants({ variant: 'default' })}>
                    Create Room
                </Link>
            </div>
            <div className='mb-12'>
                <SearchBar />
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </div>
        </main>
    );
}
