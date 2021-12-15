import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/card.css";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        // <UserProvider>
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
        // </UserProvider>
    );
}

export default MyApp;
