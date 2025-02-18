import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default NuxtAuthHandler({
  // your authentication configuration here!

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
      async authorize(credentials:any){
        if(credentials?.email || credentials?.password){
          throw createError({
            statusCode:500,
            statusMessage:'Missing Info'
          })
        }
      }
    }),
  ],
});
