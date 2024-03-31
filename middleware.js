export { default } from 'next-auth/middleware';

// List of protected routes
export const config = {
  matcher: [
    '/properties/add',
    '/profile',
    '/properties/saved',
    '/messages'
  ]
}