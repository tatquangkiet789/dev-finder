import { TagsList } from '@/components/tags-list';
import { Badge } from '@/components/ui/badge';
import { fetchRoomById } from '@/data-access/rooms';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VideoPlayer } from './video-player';

type RoomPageProps = {
    params: {
        roomId: string;
    };
};

export default async function RoomPage({ params }: RoomPageProps) {
    const { roomId } = params;
    const room = await fetchRoomById(roomId);

    if (!room) {
        notFound();
    }

    return (
        <div className='grid grid-cols-4 min-h-screen gap-2'>
            <div className='col-span-3 p-2'>
                <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4'>
                    <VideoPlayer room={room} />
                </div>
            </div>
            <div className='col-span-1 p-2'>
                <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4'>
                    <h1 className='text-base'>{room.name}</h1>
                    <Link
                        href={room.githubRepo}
                        className='flex items-center gap-2 text-sm'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <GithubIcon /> Github Project
                    </Link>
                    <p className='text-base text-gray-600 dark:text-white'>{room.description}</p>
                    <TagsList tags={room.language} />
                </div>
            </div>
        </div>
    );
}
