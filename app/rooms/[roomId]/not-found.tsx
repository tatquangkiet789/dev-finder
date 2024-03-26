import { buttonVariants } from '@/components/ui/button';
import { Frown } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundRoomPage() {
    return (
        <main className='flex h-full flex-col items-center justify-center gap-2'>
            <Frown className='w-10 text-gray-400' />
            <h2 className='text-xl font-semibold'>404 Not Found</h2>
            <p className='mb-4'>Could not find the requested room.</p>
            <Link href='/' className={buttonVariants({ variant: 'default' })}>
                Go Back
            </Link>
        </main>
    );
}
