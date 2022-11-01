import { GetStaticProps, NextApiHandler } from 'next';
import NextAuth, { DefaultUser, NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;

export const authOptions: NextAuthOptions = {
  // callbacks: {
  //   session: async ({ session, token }) => {
  //     if (session?.user) {
  //       session.user.id = token.sub;
  //       session.user.createdAt = "1/1/2021";
  //     }
  //     return session;
  //   },
  // },

  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        {/* @ts-ignore */ }
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: "/auth/signin",
    //signOut: "/auth/signin",
    //error: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string,
          password: string,
        };

        // логика входа юзера из бд
        let result: DefaultUser | null = null;

        await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/User?email=eq.${email}&select=*`, {
          method: 'GET',
          headers: {
            'apikey': process.env.SUPABASE_API_KEY || '',
            'Authorization': process.env.SUPABASE_API_KEY || '',
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
        }).then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            if (data.length > 0) {
              if (password === data[0].password) {
                result = {
                  id: data[0].id,
                  name: data[0].username,
                  email: data[0].email,
                  image: data[0].imageUrl,
                };
              }
            }
          }
        })
        return result;
      }
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID || "",
    //   clientSecret: process.env.GITHUB_SECRET || "",
    // }),
  ],
  // adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
};