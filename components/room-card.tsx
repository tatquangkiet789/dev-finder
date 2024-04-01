'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Room } from '@prisma/client';
import { GithubIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { TagsList } from './tags-list';
import { buttonVariants } from './ui/button';
import { getSession } from '@/lib/auth';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';
import { deleteRoomAction } from '@/app/your-rooms/action';

function DeleteRoomButton({ roomId }: { roomId: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger className={buttonVariants({ variant: 'destructive' })}>
                <TrashIcon />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove the room and any
                        data associated with it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteRoomAction(roomId)}>
                        Yes, delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export async function RoomCard({ room, isDeleted }: { room: Room; isDeleted: boolean }) {
    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>{room.name}</CardTitle>
                    {isDeleted ? <DeleteRoomButton roomId={room.id} /> : null}
                </div>
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
