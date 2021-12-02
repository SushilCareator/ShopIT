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

const database = () => {
    const client = new MongoClient(
        "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/shopit?retryWrites=true&w=majority"
    );
    const clientPromise = client.connect();
    return clientPromise;
};

export default NextAuth({
    session: {
        maxAge: 1 * 60 * 60,
    },

    // adapter: MongoDBAdapter(database()),

    providers: [
        // OAuth authentication providers...
        // AppleProvider({
        //   clientId: process.env.APPLE_ID,
        //   clientSecret: process.env.APPLE_SECRET
        // }),
        // FacebookProvider({
        //   clientId: process.env.FACEBOOK_ID,
        //   clientSecret: process.env.FACEBOOK_SECRET
        // }),
        LinkedInProvider({
            clientId: "8690yx29ylpj9y",
            clientSecret: "vWut9LGALO1gCuov",
        }),
        GoogleProvider({
            clientId:
                "158858758358-6jjsukdci8b2b5idu4tqtcjaonjt5uiq.apps.googleusercontent.com",
            clientSecret: "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",
        }),
        // Passwordless / email sign in
        // EmailProvider({
        //   server: process.env.MAIL_SERVER,
        //   from: 'NextAuth.js <no-reply@example.com>'
        // }),
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
                    const matche = compareSync(
                        password,
                        userExist.hashPassword
                    );
                    console.log(matche);
                    if (!matche) {
                        // client.close();
                        throw new Error("wrong credentials");
                    }
                    return {
                        id: userExist._id.toString(),
                        name: userExist.name,
                        email: userExist.email,
                        role: userExist.role,
                    };
                }
            },
        }),
    ],
    // session:{
    //     jwt:true
    // }
    // adapter("")

    adapter: MongoDBAdapter(database()),
    // session:{jwt:true}
});
