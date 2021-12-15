import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compareSync } from "bcryptjs";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import LinkedInProvider from "next-auth/providers/linkedin";
import { decode, encode } from "next-auth/jwt";

const database = () => {
    const client = new MongoClient(
        "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/shopit?retryWrites=true&w=majority"
    );
    const clientPromise = client.connect();
    return clientPromise;
};

let role: string;

export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 1 * 60 * 60,
    },
    jwt: {
        secret: "nnQl-xv0w_Ik_CG8QOFw4B378MBwTo3xKX57ncSFnnmTerthScfr2kfysQ19UB677V2kBXcrshLXKl_cUNZvMXiyiQBz6u48phZuowQpo34IX8JJ_okAcoZ8Iaxt6mvvwlRaHmjamuyhQ9HJ_ndtQzR4CpUvTScFcIekaDKyD_Bi0SKubDYHeJNZUiNEgKGuPNrVDJ_QuLZHJvwNTeVhU0hqjhxcCRKYJ4GMWR17rLynLL7GIHyAErcakz3u3yvJ8TMgQimIvXsn54aEcZNiebSG0wCpqOK8cHt2KRY1DKOh_-eIsdoK-rE0W3MY5DHJ_V-8CmNBxu4Ol03GdlaBmQ",
        maxAge: 60 * 60 * 1,
        // async encode({ secret, token, maxAge }) {},
        // async decode({secret,token}{})
    },

    pages: {
        error: "/", // Error code passed in query string as ?error=
    },

    adapter: MongoDBAdapter(database(), {
        collections: {
            Sessions: "role",
        },
    }),

    providers: [
        // OAuth authentication providers...
        // AppleProvider({
        //   clientId: process.env.APPLE_ID,
        //   clientSecret: process.env.APPLE_SECRET
        // }),
        FacebookProvider({
            clientId: "940101450252612",
            clientSecret: "f0664ca71443713f6ddfc19a9070b181",
        }),
        LinkedInProvider({
            clientId: "8690yx29ylpj9y",
            clientSecret: "vWut9LGALO1gCuov",
        }),
        GoogleProvider({
            clientId:
                "158858758358-6jjsukdci8b2b5idu4tqtcjaonjt5uiq.apps.googleusercontent.com",
            clientSecret: "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",
        }),
        CredentialsProvider({
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.

            credentials: {},
            async authorize(credentials, req) {
                const userData = JSON.stringify(credentials as string);
                const userDataJSON = JSON.parse(userData);
                console.log(userDataJSON.email, "dataAgain");
                const { email, password } = userDataJSON;

                // Add logic here to look up the user from the credentials supplied

                const client = await MongoClient.connect(
                    "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/shopit?retryWrites=true&w=majority"
                );

                const db = client.db();
                const collection = db.collection("users");
                console.log(email, "email");

                const userExist = await collection.findOne({ email });
                console.log(userExist?.hashPassword);
                console.log(userExist, "exist");

                if (userExist == null) {
                    // return res.status(403).json({ message: "user not exist" });
                    // client.close();
                    throw new Error("user not exist");
                } else {
                    if (userExist.active === false) {
                        throw new Error("User Deleted");
                    } else {
                        const matche = compareSync(
                            password,
                            userExist.hashPassword
                        );
                        console.log(matche);
                        if (!matche) {
                            // client.close();
                            throw new Error("wrong credentials");
                        }
                        role = userExist.role == "admin" ? "admin" : "user";
                        return {
                            id: userExist._id.toString(),
                            name: userExist.name,
                            email: userExist.email,
                            role: userExist.role,
                        };
                    }
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, account, isNewUser, profile, user }) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            if (user?.roles) {
                token.roles = user.roles;
            }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.

            session.userId = token.sub;
            session.role = role;

            return session;
        },
    },
});
