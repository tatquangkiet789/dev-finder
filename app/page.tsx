import { RoomCard } from '@/components/room-card';
import { buttonVariants } from '@/components/ui/button';
import { fetchAllRooms } from '@/data-access/rooms';
import Link from 'next/link';
import { SearchBar } from './search-bar';
import { Suspense } from 'react';
import { RoomList } from '@/components/room-list';
import { SkeletonCard } from '@/components/skeleton-card';

export default async function Home({ searchParams }: { searchParams: { search: string } }) {
    // const rooms = await fetchAllRooms(searchParams.search);

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
            <Suspense fallback={<SkeletonCard />}>
                <RoomList type='all' slug={searchParams.search} />
            </Suspense>
        </main>
    );
}
