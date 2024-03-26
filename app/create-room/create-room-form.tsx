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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createRoomAction } from './actions';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(250),
    language: z.string().min(1).max(250),
    githubRepo: z.string().min(1).max(250),
});

export type CreateRoom = z.infer<typeof formSchema>;

export function CreateRoomForm() {
    const router = useRouter();
    const form = useForm<CreateRoom>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            githubRepo: '',
            language: '',
        },
    });

    async function onSubmit(values: CreateRoom) {
        await createRoomAction(values);
        router.push('/');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Dev Finder' />
                            </FormControl>
                            <FormDescription>This is your public room name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={`I'm working on a side project, come and join me.`}
                                />
                            </FormControl>
                            <FormDescription>
                                Please describe what you are be coding on.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='githubRepo'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Github Repo</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder='"https://github.com/tatquangkiet789/tego-home-assignment"'
                                />
                            </FormControl>
                            <FormDescription>
                                Please put a link to the project you are working on.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='language'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Typescript, NextJS,...' />
                            </FormControl>
                            <FormDescription>
                                List your programming languages, frameworks, libraries so people can
                                find your content
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
}
