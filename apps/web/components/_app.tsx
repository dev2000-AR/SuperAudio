import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../stores/store";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { ToastContainer } from "react-toastify";

// Dynamically import components that rely on client-side APIs
const AudioPlayer = dynamic(() => import("../components/AudioPlayer/AudioPlayer"), {
  ssr: false,
});
const SidebarItem = dynamic(() => import("../components/sidebarItem"), {
  ssr: false,
});
const AddToCollectionModel = dynamic(() => import("@/components/AddToCollectionModel"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <link
          rel="preload"
          href="/musive-icons.ttf"
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
      </Head>
      <NextNProgress
        color="#2bb540"
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

  if (!router.isReady) {
    return null; // Wait for the router to be ready
  }

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
      router.pathname !== "/" ? (
        <AudioPlayer className={isKeyboardOpen ? "invisible" : "visible"} />
      ) : (
        <div></div>
      )}
      {router.pathname !== "/login" &&
        router.pathname !== "/register" &&
        router.pathname !== "/_error" &&
        router.pathname !== "/playing" &&
        router.pathname !== "/" && (
          <div
            className={`bg-[#121212] hidden mobile:block tablet:block 
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