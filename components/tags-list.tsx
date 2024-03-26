import { Badge } from './ui/badge';

export function TagsList({ tags }: { tags: string }) {
    const tagsList = tags.split(',');

    return (
        <div className='flex items-center gap-2 flex-wrap'>
            {tagsList.map((tag, index) => (
                <Badge key={index} className='w-fit' variant={'default'}>
                    {tag.trim()}
                </Badge>
            ))}
        </div>
    );
}
