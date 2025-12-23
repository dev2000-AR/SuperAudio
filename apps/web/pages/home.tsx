import type { NextPage } from "next";
import AppLayout from "@/layouts/appLayout";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Artists } from "../interfaces/artist";
import {
  getRecentUsers,
  HomePageState,
  RequestStatus,
  setPage,
} from "../stores/homePage/homePageSlice";
import CustomImage from "../components/CustomImage";
import HorizontalTracksList from "../components/HorizontalTracksList";
import HorizontalArtistsList from "../components/HorizontalArtistsList";
import HorizontalAlbumList from "../components/HorizontalAlbumList";
import { useRouter } from "next/router";
import ErrorComponent from "@/components/error";
import authService from "../stores/auth/authServices";
import SubscriptionChecker from "../stores/auth/SubscriptionChecker";

const Home: NextPage = () => {
  const {
    recentUsers,
    status,
    topHits,
    popularHits,
    trendingArtists,
    topArtists,
    randomAlbums,
    page,
  }: HomePageState = useSelector((state: any) => state.homePage);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();
  const [color, setColor] = useState("#2bb540");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const observer = useRef<IntersectionObserver | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    if (user) {
      if (status !== RequestStatus.Success) {
        dispatch(getRecentUsers(page));
      }
      if (status === RequestStatus.Success) {
        // Verificar si recentUsers tiene elementos antes de acceder a recentUsers[0]
        if (recentUsers.length > 0) {
          setColor(recentUsers[0].avatar.color);
        } else {
          setColor("#000000"); // Establecer color negro si recentUsers está vacío
        }
      }
    }
  }, [user, status, dispatch, recentUsers, page]);

  // Configurar IntersectionObserver para cargar más datos
  useEffect(() => {
    const loadMoreItems = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isLoading) {
        setIsLoading(true);
        dispatch(setPage(page + 1)); // Incrementar la página
        dispatch(getRecentUsers(page + 1)).finally(() => setIsLoading(false));
      }
    };

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(loadMoreItems, {
      rootMargin: "100px",
      threshold: 1.0,
    });

    const target = document.querySelector("#scrollTarget");
    if (target) observer.current.observe(target);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoading, page, dispatch]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await authService.logout(dispatch);
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AppLayout title="Home" color={color}>
      <SubscriptionChecker user={user} />
      {status === RequestStatus.Loading ? (
        <div className="w-[calc(100vw_-_14rem_-_16px)] mini-laptop:w-[calc(100vw_-_55px)] tablet:w-screen mobile:w-screen overflow-x-hidden h-screen mobile:h-[calc(100vh_-_50px)] tablet:h-[calc(100vh_-_50px)] flex flex-col items-center justify-center">
          <span className="loader2"></span>
          <p className="text-sm text-white my-3 font-ProximaRegular">cargando...</p>
        </div>
      ) : status === RequestStatus.Error ? (
        <ErrorComponent />
      ) : status === RequestStatus.Success ? (
        <div className="pt-10 mini-laptop:pt-2 mobile:pt-1 tablet:pt-2 pb-24"> {/* Añadido padding-bottom */}
          {/* Header con saludo, nick y menú de hamburguesa */}
          <header className="flex items-center justify-between px-8 tablet:px-6 mobile:px-4 pb-6">
            <h1 className="select-none text-3xl font-ProximaBold mini-laptop:text-2xl tablet:text-2xl mobile:text-xl">
              {getGreetings()}
            </h1>
            <div className="relative flex items-center gap-4">
              <span className="text-white font-ProximaBold text-lg mobile:text-base">
                {getCookie2("user") || "Invitado"}
              </span>
              <button
                onClick={toggleMenu}
                className="relative w-8 h-8 bg-transparent border border-white/20 rounded-md flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 bg-black text-white rounded-md shadow-lg overflow-hidden z-10"
                  style={{
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => router.push("/library")}
                    >
                      Mi Biblioteca
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => router.push("/premium")}
                    >
                      Mi Subscripcion
                    </li>
                  
<li
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => router.push("/list.html")}
                    >
                      Mi Stock
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </header>

          {/* Lista de artistas recientes */}
          <div className="select-none px-8 tablet:px-6 mobile:px-4 grid grid-cols-3 gap-x-6 gap-y-5 mini-laptop:gap-x-3 mini-laptop:gap-y-4 tablet:gap-y-4 tablet:gap-x-3 mobile:grid-cols-2 mobile:gap-x-3 mobile:gap-y-3">
            {recentUsers.map((e: Artists) => (
              <div
                key={e.id}
                onClick={() => router.push(`/artist/${e.id}`)}
                onMouseEnter={() => setColor(e.avatar.color)}
                onMouseLeave={() => setColor(recentUsers[0].avatar.color)}
                className="flex flex-row items-center font-ProximaBold w-full bg-[#5f5d5d60] rounded-md cursor-pointer hover:bg-[#5f5d5da1]"
              >
                <div
                  style={{
                    backgroundColor: e.avatar.color,
                    boxShadow:
                      "10px 0 10px -7px rgba(1, 2, 3, 0.50), -0px 0 0px -4px rgba(0, 0, 0, 0)",
                  }}
                  className="relative w-20 h-20 mini-laptop:w-16 mini-laptop:h-16 tablet:w-14 tablet:h-14 mobile:w-12 mobile:h-12 rounded-full overflow-hidden"
                >
                  {e.avatar?.url ? (
                    <CustomImage
                      src={e.avatar.url}
                      className="w-full h-full object-cover"
                      alt="artist"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200">No image available</div>
                  )}
                </div>
                <div className="ml-3 mini-laptop:ml-2">
                  <p className="text-white font-ProximaBold text-md mini-laptop:text-sm tablet:text-sm mobile:text-xs">
                    {e.display_name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Espacio entre secciones */}
          <div className="mt-12">
            <h1 className="px-8 tablet:px-6 mobile:px-4 text-xl font-ProximaBold mb-6 mobile:text-base">
              Artistas en tendencia
            </h1>
            <HorizontalArtistsList artists={trendingArtists} />
          </div>

          <div className="mt-12">
            <h1 className="px-8 tablet:px-6 mobile:px-4 text-xl font-ProximaBold mb-6 mobile:text-base">
              Canciones populares
            </h1>
            <HorizontalTracksList tracks={topHits} />
          </div>

          <div className="mt-12">
            <h1 className="px-8 tablet:px-6 mobile:px-4 text-xl font-ProximaBold mb-6 mobile:text-base">
              Álbumes aleatorios
            </h1>
            <HorizontalAlbumList album={randomAlbums} />
          </div>

          {/* Elemento de referencia para el IntersectionObserver */}
          <div id="scrollTarget" style={{ height: "10px" }}></div>
        </div>
      ) : null}
    </AppLayout>
  );
};

const getGreetings = () => {
  const myDate = new Date();
  const hrs = myDate.getHours();
  let greet;
  if (hrs < 12) greet = "Buenos días";
  else if (hrs >= 12 && hrs <= 17) greet = "Buenas tardes";
  else if (hrs >= 17 && hrs <= 24) greet = "Buenas noches";
  return greet;
};

function getCookie2(name: string) {
  const cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      const cookieValue = decodeURIComponent(cookiePair[1]);
      try {
        const userData = JSON.parse(cookieValue);
        return userData.username;
      } catch (error) {
        console.error("Error al parsear la cookie:", error);
        return null;
      }
    }
  }
  return null;
}

export default Home;