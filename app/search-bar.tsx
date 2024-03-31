'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search } from '@/components/ui/search';
import { zodResolver } from '@hookform/resolvers/zod';
import { Circle, CircleX, SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    search: z.string().min(0).max(100),
});

export type Search = z.infer<typeof formSchema>;

export function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const form = useForm<Search>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: searchParams.get('search') ?? '',
        },
    });

    async function onSubmit(value: Search) {
        if (value.search) {
            router.push(`/?search=${value.search}`);
        } else {
            router.push('/');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center gap-4'>
                <FormField
                    control={form.control}
                    name='search'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Search
                                    {...field}
                                    className='w-[440px]'
                                    placeholder='Filter rooms by keywords such as Typescript, NextJS'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Search</Button>
                {searchParams.get('search') ? (
                    <Button
                        variant={'destructive'}
                        onClick={() => {
                            form.setValue('search', '');
                            router.push('/');
                        }}
                    >
                        <CircleX className='mr-2' /> Clear
                    </Button>
                ) : null}
            </form>
        </Form>
    );
}
