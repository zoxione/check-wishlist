import axios from 'axios';
import { NextApiHandler } from 'next';
import NextAuth, { DefaultUser, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SERVER_URL } from '../../../data/constants';


const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;

export const authOptions: NextAuthOptions = {
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

        let result: DefaultUser | null = null;

        await axios.post(`${SERVER_URL}/users_login`,
          {
            email: email,
            password: password,
          }
        )
          .then(function (response) {
            if (response.data) {
              result = {
                id: response.data.id,
                name: response.data.username,
                email: response.data.email,
                image: response.data.imageUrl,
              };
            }
          })
          .catch(function (error) {
            console.log("Error login user");
          })

        return result;
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};