import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthStatus, login, reset } from "../stores/auth/authSlice";

interface FormDataType {
  username: string;
  password: string;
  usernameError: string | null;
  passError: string | null;
}

const Login: NextPage = () => {
  const { status, user, message } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    password: "",
    usernameError: null,
    passError: null,
  });

  const { username, password, passError, usernameError } = formData;

  useEffect(() => {
    if (user || status == AuthStatus.Success) {
      router.push("/home").then(() => window.location.reload());
    }
  }, [router, user, status]);

  useEffect(() => {
    if (status == AuthStatus.Error) {
      dispatch(reset());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const onChange = (e: any) => {
    const value = e.target.value.trim();

    if (e.target.name === "username") {
      setFormData((prevData) => ({ ...prevData, username: value }));
      if (
        new RegExp("^[a-z0-9._]+$").test(value) &&
        !value.startsWith(".") &&
        !value.startsWith("_") &&
        !value.endsWith(".") &&
        !value.endsWith("_") &&
        !value.includes("..") &&
        !value.includes("__") &&
        !value.includes("._") &&
        !value.includes("_.")
      ) {
        setFormData((prevData) => ({ ...prevData, usernameError: null }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          usernameError: "Por favor, ingresa un nombre de usuario válido.",
        }));
      }
      if (value.length == 0) {
        setFormData((prevData) => ({ ...prevData, usernameError: null }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, password: value }));
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (formData.password.length == 0 || formData.username.length == 0) {
      setFormData((prevData) => ({
        ...prevData,
        passError: "Este campo es obligatorio.",
        usernameError: "Este campo es obligatorio.",
      }));
    } else if (formData.password.length < 5 && formData.username.length < 3) {
      setFormData((prevData) => ({
        ...prevData,
        passError: "La contraseña debe tener más de 5 caracteres.",
        usernameError: "El nombre de usuario debe tener más de 3 caracteres.",
      }));
    } else if (formData.password.length < 5) {
      setFormData((prevData) => ({
        ...prevData,
        passError: "La contraseña debe tener más de 5 caracteres.",
        usernameError: null,
      }));
    } else if (formData.username.length < 3) {
      setFormData((prevData) => ({
        ...prevData,
        passError: null,
        usernameError: "El nombre de usuario debe tener más de 3 caracteres.",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        passError: null,
        usernameError: null,
      }));
      const userData = {
        username: formData.username,
        password: formData.password,
      };
      dispatch(login(userData));
    }
  };

  return (
    <div className="font-ProximaRegular text-white bg-[#000000]">
      <Head>
        <title>Superaudio - Login</title>
      </Head>
      <div
        className="bg-[url('https://superaudio.online/login_background.jpg')] 
        h-screen w-screen bg-no-repeat bg-cover"
      >
        <div
          className="h-screen w-screen bg-gradient-to-t
         from-black to-[#00000086] flex
          justify-center items-center"
        >
          <div
            className="select-none px-20 mobile:pt-8 mobile:pb-10 pt-14 pb-16 mini-laptop:px-10 tablet:px-10 mobile:px-6 
          flex flex-col items-center bg-black rounded-xl shadow-lg"
          >
            <div className="flex flex-row items-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={40}
                height={40}
                objectFit="contain"
              />
              <h1
                className="text-center uppercase mx-2 
              tracking-wider font-ProximaBold"
              >
                Superaudio
              </h1>
            </div>

            <h1 className="mobile:text-xl text-3xl w-80 mobile:w-64 mobile:text-center mt-10 font-extrabold font-ProximaBold">
              Escucha música real, siente cada momento.
            </h1>
            {status == AuthStatus.Error && (
              <p
                className="bg-red-500 border border-red-800 
              bg-opacity-40 px-3 mt-6 py-2 rounded-3xl  w-full text-center"
              >
                {message}
              </p>
            )}
            <form onSubmit={onSubmit}>
              <div className="flex flex-col mt-8 mb-4">
                <label
                  htmlFor="username"
                  className="font-ProximaRegular uppercase
                   text-gray-300 px-2 my-1 text-xs"
                >
                  Usuario
                </label>
                <input
                  type="username"
                  placeholder="tu usuario"
                  name="username"
                  value={username}
                  onChange={onChange}
                  className={`bg-[#3B3B3B] p-2 rounded-3xl 
                  border-none text-white outline-none 
                  px-4 py-2 mt-1 transition focus:ring-2 focus:ring-blue-500
                  w-80 mobile:w-64 ${usernameError && "mb-2"}`}
                />
                {usernameError && (
                  <p
                    className="text-sm font-ProximaRegular
                   font-thin text-red-600"
                  >
                    {usernameError}
                  </p>
                )}
              </div>
              <div className="flex-col flex">
                <label
                  htmlFor="password"
                  className="font-ProximaRegular uppercase text-gray-300
                   px-2 my-1 text-xs "
                >
                  Contraseña
                </label>

                <input
                  type="password"
                  value={password}
                  name="password"
                  placeholder="*******"
                  onChange={onChange}
                  className="bg-[#3B3B3B]  rounded-3xl border-none
                   text-white outline-none py-2 px-4 w-80 mt-1 mobile:w-64 transition focus:ring-2 focus:ring-blue-500"
                />
                {passError && (
                  <p
                    className="text-sm font-ProximaRegular
                   font-thin text-red-600 mt-2"
                  >
                    {passError}
                  </p>
                )}
              </div>

              <button
                disabled={status == AuthStatus.Loading}
                className="w-full mt-10  p-2 rounded-3xl bg-[#018ee0] font-ProximaBold
                uppercase hover:bg-[#016ab6] transition disabled:hover:bg-opacity-20 disabled:bg-opacity-20 disabled:text-gray-300"
                type="submit"
              >
                {status == AuthStatus.Loading ? (
                  <span className="inline-loader"></span>
                ) : (
                  <div>Iniciar sesión</div>
                )}
              </button>
              <p
                className="text-center mt-6 font-thin font-ProximaRegular
               text-gray-100 text-xs uppercase tracking-wider"
              >
                ¿No tienes una cuenta?{" "}
                <Link href="/register">
                  <span className="cursor-pointer text-[#018ee0] font-ProximaBold tracking-widest">
                    Regístrate
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
