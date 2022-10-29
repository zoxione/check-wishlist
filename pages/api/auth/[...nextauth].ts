import { GetStaticProps, NextApiHandler } from 'next';
import NextAuth, { DefaultUser, NextAuthOptions, User } from "next-auth"
import Providers from 'next-auth/providers';
import Adapters, { AdapterUser } from 'next-auth/adapters';
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from 'next-auth/providers/github';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { any } from 'zod';
import { IUser } from '../../../types';

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
        // await fetch('http://localhost:8080/user_login', {
        await fetch('http://ovz2.j61057165.m7o9p.vps.myjino.ru:49274/user_login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }).then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            const { username, email, imageUrl, id } = await data as {
              username: string,
              email: string,
              imageUrl: string,
              id: string
            };
            result = {
              id: id,
              name: username,
              email: email,
              image: imageUrl,
            };
            // result = {
            //   id: await response.id,
            //   name: response.username,
            //   email: response.email,
            //   image: response.imageUrl,
            // }
          }
        })




        // if (email === 'z1@gmail.com' && password === '123123') {
        //   result = {
        //     id: 1,
        //     name: 'zoxi',
        //     email: 'z1@gmail.com',
        //     password: '123456'
        //   };
        // }

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