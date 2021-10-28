import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const MONGODB_URI: string = process.env.MONGODB_URI;

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
  ],
  database: MONGODB_URI,
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,

    // You can also specify a public key for verification if using public/private key (but private only is fine)
    // verificationKey: process.env.JWT_SIGNING_PUBLIC_KEY,

    // If you want to use some key format other than HS512 you can specify custom options to use
    // when verifying (note: verificationOptions should include a value for maxTokenAge as well).
    // verificationOptions = {
    //   maxTokenAge: `${maxAge}s`, // e.g. `${30 * 24 * 60 * 60}s` = 30 days
    //   algorithms: ['HS512']
    // },
  },
  debug: true,
});
