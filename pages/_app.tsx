import '../styles/globals.css';
import {AppProps} from "next/dist/shared/lib/router/router";
import Head from 'next/head';

function MyApp({Component, pageProps}: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <link key={1} rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
