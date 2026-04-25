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
        if (!isLoggedIn) return false;
        
        console.log('MIDDLEWARE AUTH OBJECT:', JSON.stringify(auth, null, 2));
        
        // Role based access control
        const isAdminRoute = nextUrl.pathname.startsWith('/admin');
        const userRole = (auth?.user as any)?.role || (auth as any)?.role;
        const userEmail = auth?.user?.email || (auth as any)?.email;
        
        if (isAdminRoute && userRole !== 'ADMIN' && userEmail !== 'admin@nishad.com') {
           return Response.redirect(new URL('/student', nextUrl));
        }
        
        return true;
      } else if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/signup')) {
        console.log('MIDDLEWARE AUTH OBJECT (LOGIN):', JSON.stringify(auth, null, 2));
        const userRole = (auth?.user as any)?.role || (auth as any)?.role;
        const userEmail = auth?.user?.email || (auth as any)?.email;
        
        if (userRole === 'ADMIN' || userEmail === 'admin@nishad.com') {
          return Response.redirect(new URL('/admin', nextUrl));
        }
        return Response.redirect(new URL('/student', nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
         (session.user as any).role = token.role;
      }
      return session;
    }
  },
  providers: [], 
  secret: process.env.AUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig;
