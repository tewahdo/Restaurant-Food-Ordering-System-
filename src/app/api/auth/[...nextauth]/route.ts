import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const admin = await prisma.admin.findUnique({
          where: { email: credentials?.email },
        });
        if (admin && credentials?.password) {
          const isValid = await bcrypt.compare(credentials.password, admin.password);
          if (isValid) return { id: String(admin.id), name: admin.name, email: admin.email };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
