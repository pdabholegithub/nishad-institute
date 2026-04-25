import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });
          
          if (!user) return null;
          
          const passwordsMatch = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          );
          
          if (passwordsMatch) {
             // Return user object without the password hash
             return { id: user.id, email: user.email, name: user.name, role: user.role };
          }
          
          console.log('Invalid credentials');
          return null;
        } catch (error) {
          console.log('Error searching user:', error);
          return null;
        }
      },
    }),
  ]
});
