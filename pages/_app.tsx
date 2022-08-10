import type { AppProps } from 'next/app';
import { useEffect, useState, CSSProperties  } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import Router from 'next/router';
import NProgress from 'nprogress'
import '../styles/globals.css';
import BounceLoader from "react-spinners/BounceLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "pink",
  opacity: 0.4
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);
  const [loading, setLoading] = useState(false)
  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", (url) => {
    NProgress.start()
    setLoading(true)
    NProgress.set(0.5)
    
    });
    Router.events.on("routeChangeComplete", (url) => {
      NProgress.done()
      setLoading(false)
    });
  useEffect(() => {
    setIsSSR(false);
  }, []);  

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
      <Head>
    <title>Share It</title>
    <link rel="icon" type="image/png" href='/icon.png' />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
  </Head>
        <Navbar />
        <div className='flex gap-6 md:gap-20 '>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>

            {loading ? 
            <div className='m-auto'>
            <BounceLoader color={'red'} loading={loading} cssOverride={override} size={100} /> 
            </div>
            :<Component {...pageProps} />}
          </div>
        </div>
      </div>
     </GoogleOAuthProvider>
  );
};

export default MyApp;