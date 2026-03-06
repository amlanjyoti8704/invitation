import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {

      const adminEmails = [
        "amlanjyoti3345@gmail.com" // replace with your GitHub email
      ];

      if (adminEmails.includes(session.user.email)) {
        session.user.role = "admin";
      } else {
        session.user.role = "user";
      }

      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };