// pages: {
//   signIn: '/auth/signin',
//   signOut: '/auth/signout',
//   error: '/auth/error', // Error code passed in query string as ?error=
//   verifyRequest: '/auth/verify-request', // (used for check email message)
//   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
// }
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOption: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile');
      }
      // TODO: Once BE is set,
      // add logics
      // If user is not exists, create one
      // If user exists then update
      return true;
    },
  },
};

export default NextAuth(authOption);
export { authOption };
// export { handler as GET, handler as POST };
