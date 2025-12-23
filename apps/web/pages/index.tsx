/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import TypingEffect from "react-typing-effect";  // Importa la librería

export async function getServerSideProps(ctx: any) {
  const token = ctx.req.cookies.user;
  if (token) {
    return {
      redirect: {
        destination: `/home`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Home: NextPage = () => {
  const { status, user } = useSelector((state: any) => state.auth);

  return (
    <div className="font-iiold bg-black text-white min-h-screen flex flex-col overflow-hidden w-full">
      {/* Neon elements with more colors */}
      <div className="fixed z-0 w-[50rem] h-[50rem] rounded-full bg-gradient-to-r from-[#0067a3] to-[#009cde] opacity-10 blur-[100px] -top-[20rem] -left-[20rem] animate-pulse"></div>
      <div className="fixed z-0 w-[40rem] h-[40rem] rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-10 blur-[120px] -bottom-[15rem] -right-[15rem] animate-pulse"></div>
      <div className="fixed z-0 w-[30rem] h-[30rem] rounded-full bg-gradient-to-r from-[#005aac] to-[#00de9c] opacity-5 blur-[80px] bottom-[10rem] left-[50%] -translate-x-1/2 animate-pulse"></div>
      <div className="fixed z-0 w-[25rem] h-[25rem] rounded-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-8 blur-[90px] top-[15rem] right-[5rem] animate-pulse"></div>

      {/* Barra de navegación con animación de colores */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#0d0d0d] w-full overflow-hidden">
        {/* Nav glow effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute w-[20rem] h-[20rem] rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 opacity-10 blur-[60px] -top-[10rem] -left-[5rem] animate-[moveLeftRight_15s_infinite_ease-in-out]"></div>
          <div className="absolute w-[15rem] h-[15rem] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-8 blur-[50px] -top-[5rem] right-[10rem] animate-[moveRightLeft_20s_infinite_ease-in-out]"></div>
        </div>
        
        <div className="flex justify-center items-center p-6 relative z-10">
          <div className="relative w-20 h-20">
            <Image
              src="/logo.png"
              alt="logo"
              layout="fill"
              objectFit="contain"
              unoptimized={true}
            />
          </div>
          <h1 className="text-center lowercase mx-2 font-ProximaBold text-5xl text-[#009cde]">
            <span className="text-white">super</span>audio
          </h1>
        </div>
      </div>

      {/* Main content area with proper spacing */}
      <main className="flex-grow w-full flex flex-col items-center pt-32 px-4 relative">
        {/* Fondo con imagen animada que cubre toda la pantalla */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000cc] to-transparent z-10"></div>
          <div
            className="absolute inset-0 z-0 w-full h-full"
            style={{
              backgroundImage: `url('https://superaudio.online/starts.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              animation: "moveStars 40s infinite linear"
            }}
          ></div>
        </div>
        
        {/* Texto principal */}
        <div className="relative z-20 w-full max-w-4xl mx-auto text-center mb-auto">
          <h1 className="text-[70px] font-ProximaBold leading-[1.2] text-cyan-200 mini-laptop:text-[50px] mobile:text-[40px]">
            calidad real
            <br /> 
            <span className="text-[30px]">en tu</span>
            <br />
            <TypingEffect
              text={[
                "celular", 
                "computadora", 
                "tablet", 
                "televisor", 
                "auto", 
                "cuidado de datos", 
                "ahorro y espacio", 
                "celu sin datos", 
                "momento de relax"
              ]}
              eraseDelay={1500}
              typingDelay={500}
              cursor="." 
            />
          </h1>
          
          {/* Botones */}
          <div className="mt-6 flex justify-center gap-4 flex-wrap px-4">
            <Link href={"/login"}>
              <div className="cursor-pointer shadow-md px-6 py-4 rounded-3xl bg-[#009cde] text-white flex items-center justify-center gap-2 hover:bg-[#007bb5] transition relative group min-w-[120px]">
                <span className="relative z-10">entrar</span>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-40 blur-sm transition-opacity z-0"></div>
              </div>
            </Link>

            <Link href={"/register"}>
              <div className="cursor-pointer shadow-md px-6 py-4 rounded-3xl bg-white border-2 border-[#009cde] text-[#009cde] hover:bg-[#009cde] hover:text-white transition relative group min-w-[120px]">
                <span className="relative z-10">Registro</span>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-50 blur-sm transition-opacity z-0"></div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer with full width and no side gaps */}
      <footer className="w-full bg-[#0d0d0d] text-center text-white py-4 mt-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#131e30] to-[#0d0d0d] opacity-50"></div>
        <div className="relative z-10 px-4">
          <p className="text-sm">Grupo Stars Tres Corp. 2025</p>
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-gray-400">
            <a href="https://superaudio.online/leg1" className="hover:text-gray-300 transition-colors duration-200">
              Políticas de Uso y Términos y Condiciones
            </a>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <a href="https://superaudio.online/privacidad" className="hover:text-gray-300 transition-colors duration-200">
              Política de Privacidad
            </a>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <a href="https://superaudio.online/leg1#contactoprov" className="hover:text-gray-300 transition-colors duration-200">
              Contacto
            </a>
          </div>
        </div>
      </footer>
      
      {/* Add keyframe animations to your global CSS or in a style tag */}
      <style jsx global>{`
        @keyframes moveStars {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 20% 10%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        @keyframes moveLeftRight {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(30vw);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes moveRightLeft {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-20vw);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            opacity: 0.05;
          }
        }
        
        /* Ensure no white spaces on the sides */
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Home;