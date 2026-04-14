import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/student') || nextUrl.pathname.startsWith('/admin');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && nextUrl.pathname === '/login') {
        // We can redirect them to their specific dashboard based on role later
        return Response.redirect(new URL('/student', nextUrl));
      }
      return true;
    },
  },
  providers: [], 
  secret: process.env.AUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig;
