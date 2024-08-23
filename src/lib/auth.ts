import { prisma } from "@/utils/prisma";
import { compare } from "bcrypt";
import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
  } from "next"
import CredentialsProvider from "next-auth/providers/credentials"
import { getServerSession } from "next-auth"
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    pages: {
       signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", required: true },
                password: { label: "password", type: "password", required: true }
            },
            async authorize (credentials, req) {
                let user = null;
                try {
                    user = await prisma.user.findUnique({
                        where: {
                            email: credentials?.email,
                        },
                    })
                } catch (e) {
                    if (e) {
                        return null;
                    }
                }

                if (!user) return null;

                const passwordCorrect = await compare(
                    credentials?.password || "",
                    user.password
                );

                if (!passwordCorrect) return null;
        
                return {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    dob: user.dob,
                    phone_number: user.phone_number,
                };
            }
        })
    ],

    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }: {session: any, token: JWT}) => {
            session.user = token.user
            return session
        }
    }
}

export function auth(
    ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
  ) {
    return getServerSession(...args, authOptions)
  }