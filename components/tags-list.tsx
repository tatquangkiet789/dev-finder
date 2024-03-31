'use client';

import { useRouter } from 'next/navigation';
import { Badge } from './ui/badge';

export function TagsList({ tags }: { tags: string }) {
    const tagsList = tags.split(',');
    const router = useRouter();

    return (
        <div className='flex items-center gap-2 flex-wrap'>
            {tagsList.map((tag, index) => (
                <Badge
                    onClick={() => router.push(`/?search=${tag.toLowerCase()}`)}
                    key={index}
                    className='w-fit hover:cursor-pointer'
                    variant={'default'}
                >
                    {tag.trim()}
                </Badge>
            ))}
        </div>
    );
}
