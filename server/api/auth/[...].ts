import { NuxtAuthHandler } from "#auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client/extension";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// @ts-ignore
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NuxtAuthHandler({
  // your authentication configuration here!
  adapter:PrismaAdapter(prisma),
  
  secret: "your-secret-here",
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: "your-client-id",
      clientSecret: "your-client-secret",
    }),
    //@ts-expect-error
    GoogleProvider.default({
      clientId: "your-client-id",
      clientSecret: "your-client-secret",
    }),

    //@ts-expect-error
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any) {
        if (credentials?.email || credentials?.password) {
          throw createError({
            statusCode: 500,
            statusMessage: "Missing Info",
          });
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw createError({
            statusCode: 401,
            statusMessage: "Invalid Credentials",
          });
        }

        const createPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!createPassword) {
          throw createError({
            statusCode: 401,
            statusMessage: "Invalid Credentials",
          });
        }
        return user;
      },
    }),
  ],

  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
});
