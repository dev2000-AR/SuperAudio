import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthStatus, reset, register } from "../stores/auth/authSlice";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  usernameError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
  emailError: string | null;
}

const Register: NextPage = () => {
  const { status, message, success, type, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    usernameError: null,
    passwordError: null,
    confirmPasswordError: null,
    emailError: null,
  });

  const { username, password, confirmPassword, email, usernameError, passwordError, confirmPasswordError, emailError } = formData;

  useEffect(() => {
    if (user || status === success) {
      router.push("/home").then(() => window.location.reload());
    }
  }, [router, user, status]);

  useEffect(() => {
    if (status === AuthStatus.Error) {
      dispatch(reset());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 400 && success === false && message) {
      const errors = {
        usernameError: type === "usuario" ? message : null,
        emailError: type === "email" ? message : null,
      };
      setFormData((prevData) => ({ ...prevData, ...errors }));
    }
  }, [status, success, message, type]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value.trim();

    if (name === "username") {
      formattedValue = formattedValue.toLowerCase().replace(/\s+/g, "");
    }

    setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));

    const errors = {
      usernameError: name === "username" && !/^[a-z0-9._]{3,}$/.test(formattedValue)
        ? "Solo minúsculas, números, puntos (.) y guiones bajos (_)."
        : null,
      emailError: name === "email" && !/\S+@\S+\.\S+/.test(formattedValue)
        ? "Ingresa un correo electrónico válido."
        : null,
      confirmPasswordError: name === "confirmPassword" && formattedValue !== password
        ? "Las contraseñas no coinciden."
        : null,
    };

    setFormData((prevData) => ({ ...prevData, ...errors }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      usernameError: !username ? "El nombre de usuario es obligatorio." : null,
      emailError: !email ? "El correo electrónico es obligatorio." : null,
      passwordError: !password ? "La contraseña es obligatoria." : null,
      confirmPasswordError: !confirmPassword ? "Confirma tu contraseña." : null,
    };

    if (!username || !email || !password || !confirmPassword) {
      setFormData((prevData) => ({ ...prevData, ...errors }));
    } else if (password.length < 5 || username.length < 3) {
      setFormData((prevData) => ({
        ...prevData,
        passwordError: "La contraseña debe tener al menos 5 caracteres.",
        usernameError: "El nombre de usuario debe tener al menos 3 caracteres.",
      }));
    } else if (password !== confirmPassword) {
      setFormData((prevData) => ({
        ...prevData,
        confirmPasswordError: "Las contraseñas no coinciden.",
      }));
    } else {
      const userData = { username, password, email };
      dispatch(register(userData));
    }
  };

  return (
    <div className="font-ProximaRegular text-white bg-black relative min-h-screen overflow-hidden">
      <Head>
        <title>Superaudio - Registro</title>
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes neon-pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }

          @keyframes neon-move {
            0% { transform: translateX(-10%) translateY(-10%); }
            50% { transform: translateX(10%) translateY(10%); }
            100% { transform: translateX(-10%) translateY(-10%); }
          }

          .neon-background {
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #00dbde, #fc00ff, #00dbde, #fc00ff);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite, neon-pulse 3s ease-in-out infinite, neon-move 10s ease-in-out infinite;
            z-index: 1;
            opacity: 0.5;
          }

          .neon-lights {
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(0, 219, 222, 0.2), rgba(252, 0, 255, 0.2));
            animation: neon-pulse 5s ease-in-out infinite;
            z-index: 2;
          }

          .content {
            position: relative;
            z-index: 3;
          }
        `}</style>
      </Head>

      <div className="neon-background"></div>
      <div className="neon-lights"></div>

      <div className="content h-screen w-screen flex justify-center items-center">
        <div className="px-20 mobile:px-6 pt-14 pb-16 bg-black bg-opacity-70 rounded-xl backdrop-blur-md">
          <div className="flex flex-row items-center mb-6">
            <div className="fixed top-0 left-0 right-0 z-40 bg-[#0d0d0d]">
        <div className="flex justify-center items-center p-6">
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
          </div>

          <h1 className="text-3xl text-center font-extrabold mb-6 animate-pulse">
            para acceder al sonido superior
          </h1>
          {(status === AuthStatus.Error || status === 400) && !success && (
            <p className="bg-red-500 bg-opacity-40 px-4 py-2 rounded-3xl text-center animate-bounce">
              {message}
            </p>
          )}
          <form onSubmit={onSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="username" className="text-xs uppercase text-gray-300">Nombre de Usuario</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Ej: tu_nombre_123"
                className="bg-[#3B3B3B] p-2 rounded-3xl focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
              {usernameError && <p className="text-sm text-red-600 animate-fade-in">{usernameError}</p>}
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-xs uppercase text-gray-300">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Ej: tuemail@dominio.com"
                className="bg-[#3B3B3B] p-2 rounded-3xl focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
              {emailError && <p className="text-sm text-red-600 animate-fade-in">{emailError}</p>}
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-xs uppercase text-gray-300">Contraseña</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Crea una contraseña segura"
                className="bg-[#3B3B3B] p-2 rounded-3xl focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
              {passwordError && <p className="text-sm text-red-600 animate-fade-in">{passwordError}</p>}
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="confirmPassword" className="text-xs uppercase text-gray-300">Confirma tu Contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Repite tu contraseña"
                className="bg-[#3B3B3B] p-2 rounded-3xl focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
              {confirmPasswordError && <p className="text-sm text-red-600 animate-fade-in">{confirmPasswordError}</p>}
            </div>

            <button
              type="submit"
              disabled={status === AuthStatus.Loading}
              className="w-full p-3 bg-cyan-500 rounded-3xl hover:scale-105 transform transition-all duration-300 text-black font-bold uppercase"
            >
              {status === AuthStatus.Loading ? "Creando tu cuenta..." : "Regístrate Ahora"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;