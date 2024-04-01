export { default } from 'next-auth/middleware';

// Protected routes
export const config = { matcher: ['/your-rooms'] };
