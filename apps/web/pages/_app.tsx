import "../styles/globals.css";
import useForceUpdate from '../hooks/useForceUpdate';
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../stores/store";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import SidebarItem from "../components/sidebarItem";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import AddToCollectionModel from "@/components/AddToCollectionModel";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useForceUpdate();

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (window && typeof window.dataLayer !== "undefined") {
        window.dataLayer.push({
          event: "pageview",
          page: router.asPath,
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <Head>
        <link
          rel="preload"
          href="/super-icons.ttf"
          as="font"
          crossOrigin=""
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/ProximaNova/Proxima Nova Reg.otf"
          as="font"
          crossOrigin=""
          type="font/otf"
        />
        <link
          rel="preload"
          href="/ProximaNova/Proxima Nova Bold.otf"
          as="font"
          crossOrigin=""
          type="font/otf"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4HWDH8B6LL');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W4S2RKMM');
            `,
          }}
        />
      </Head>
      <NextNProgress
        color="#009cde"
        stopDelayMs={10}
        height={3}
        options={{ showSpinner: false }}
      />

      <Component {...pageProps} />
      <AudioPlayerComponent />
    </Provider>
  );
}

function AudioPlayerComponent() {
  const router = useRouter();
  const isKeyboardOpen = useDetectKeyboardOpen();
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <AddToCollectionModel />
      {router.pathname !== "/login" &&
      router.pathname !== "/register" &&
      router.pathname !== "/_error" &&

router.pathname !== "/leg1" &&
router.pathname !== "/privacidad" &&
      router.pathname !== "/" ? (
        <AudioPlayer className={isKeyboardOpen ? "invisible" : "visible"} />
      ) : (
        <div></div>
      )}
      {router.pathname !== "/login" &&
        router.pathname !== "/register" &&
        router.pathname !== "/_error" &&
        router.pathname !== "/playing" &&
        router.pathname !== "/leg1" &&
         router.pathname !== "/yonovoy" &&
         router.pathname !== "/privacidad" &&

        router.pathname !== "/" && (
          <div
            className={`bg-[#000000] hidden mobile:block tablet:block 
      fixed bottom-0 left-0 right-0 w-full pt-2 pb-1 z-20 ${
        isKeyboardOpen ? "invisible" : "visible"
      }`}
          >
            <div className="flex flex-row justify-center ">
              <SidebarItem name="home" label="Home" />
              <SidebarItem name="search" label="Search" />
              <SidebarItem name="library" label="Library" />
            </div>
          </div>
        )}
    </div>
  );
}
export default MyApp;