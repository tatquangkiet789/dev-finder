import * as React from 'react';

import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div
                className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
            >
                <SearchIcon />
                <input
                    type={type}
                    className={cn(
                        'flex w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none',
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    },
);
Search.displayName = 'Search';

export { Search };
