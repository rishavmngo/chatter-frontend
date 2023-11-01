import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
    pages: {
        signIn: "/auth/login",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials, req) {
                const resp = await fetch("http://localhost:3001/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                });

                try {
                    const data = await resp.json();

                    if (data.error) {
                        throw data.error;
                    }
                    console.log("user::::", data);
                    return data;
                } catch (err) {
                    console.log(err);
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            if (session?.accessToken ?? false) {
                const url = "http://localhost:3001/auth/userByUID";
                const userRes = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                });
                try {
                    const userDetails = await userRes.json();
                    session.user = userDetails;
                } catch (err) {
                    console.log(err);
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
            }
            return token;
        },
    },
});

export { handler as GET, handler as POST };
