import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Room } from '@prisma/client';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { TagsList } from './tags-list';
import { buttonVariants } from './ui/button';

export function RoomCard({ room }: { room: Room }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href={room.githubRepo} className='flex items-center gap-2' target='_blank'>
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
