'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, LogOut } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

function AccountDropdown() {
    const session = useSession();
    const isLoggedIn = Boolean(session.data);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'}>
                    <Avatar className='mr-2'>
                        <AvatarImage
                            src={
                                session.data?.user.image ??
                                'https://res.cloudinary.com/dnwauajh9/image/upload/v1703235528/cqk0dmky4xzlhtccuhvt.jpg'
                            }
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {session.data?.user?.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                {isLoggedIn ? (
                    <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className='mr-2' /> Sign Out
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={() => signIn('google')}>
                        <LogIn className='mr-2' />
                        Sign In
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function Header() {
    return (
        <header className='container mx-auto dark:bg-gray-900 bg-gray-100 py-2'>
            <div className='flex justify-between items-center'>
                <Link href={'/'} className='flex items-center gap-2 text-lg hover:underline'>
                    <Image
                        src={'/icon.jpg'}
                        alt='The application icon'
                        width={45}
                        height={45}
                        className='rounded-lg'
                    />
                    DevFinder
                </Link>
                <div className='flex items-center'>
                    <AccountDropdown />
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
