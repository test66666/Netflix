import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Layout from 'src/layouts/Layout';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'src/utils/createEmotionCache';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme as muiTheme } from 'src/styles/muiTheme';
import GlobalStyles from 'src/styles/GlobalStyles';

const clientSideEmotionCache = createEmotionCache();

interface AppPropsWithCache extends AppProps {
    emotionCache?: any;
}

function MyApp({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}: AppPropsWithCache) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles: any = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={muiTheme}>
                    <CssBaseline />
                    <GlobalStyles />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </CacheProvider>
        </>
    );
}

export default MyApp;
