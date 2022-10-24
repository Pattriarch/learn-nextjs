import '../styles/globals.css';
import {AppProps} from "next/dist/shared/lib/router/router";
import Head from 'next/head';
import ym from 'react-yandex-metrika';
import Router from 'next/router';
import { YMInitializer } from 'react-yandex-metrika';

Router.events?.on('routeChangeComplete', (url: string) => {
    if (typeof window !== 'undefined') {
        ym('hit', url);
    }
});

function MyApp({Component, pageProps, router}: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>MyTop - наш лучший топ</title>
                <link key={1} rel="icon" href="../public/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link rel="preconnect" href="https://mc.yandex.ru"/>
                <meta property={'og:url'} content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
                <meta property={'og:type'} content={'article'}/>
            </Head>
            <YMInitializer
                accounts={[]}
                // webvisor позволяет смотреть на посетителей сайта
                // defer откладывает загрузку метрики до загрузки страницы
                options={{ webvisor: true, defer: true }}
                version={'2'}
            />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
