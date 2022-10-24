import { GetStaticProps, NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions, User } from "next-auth"
import Providers from 'next-auth/providers';
import Adapters, { AdapterUser } from 'next-auth/adapters';
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from 'next-auth/providers/github';
import { Session } from 'inspector';
import { JWT } from 'next-auth/jwt';

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
    session: async ({ session, token }) => {
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
        let result: any;
        if (email === 'z1@gmail.com' && password === '123456') {
          result = {
            id: 1,
            name: 'zoxi',
            email: 'z1@gmail.com',
            password: '123456'
          };
        }

        // try {
        //   result = await prisma.user.findUnique({
        //     where: {
        //       email: email,
        //     },
        //   })
        // } catch (error) {
        //   throw new Error();
        // }


        // if (result === null || result.password !== password) {

        //   throw new Error("invalid credentials");
        // }

        // // если все норм
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