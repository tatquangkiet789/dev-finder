import { RoomList } from '@/components/room-list';
import { SkeletonCard } from '@/components/skeleton-card';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';

export default function YourRoomsPage() {
    return (
        <main className='min-h-screen p-8'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-4xl'>Your Rooms</h1>
                <Link href={'/create-room'} className={buttonVariants({ variant: 'default' })}>
                    Create Room
                </Link>
            </div>
            <Suspense fallback={<SkeletonCard />}>
                <RoomList type='userId' />
            </Suspense>
        </main>
    );
}
