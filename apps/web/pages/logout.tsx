import { useEffect } from "react";
import { useRouter } from "next/router"; // Si usas Next.js
// import { useHistory } from "react-router-dom"; // Si usas React Router
import authService from "../stores/auth/authServices"; // Asegúrate de importar authService
import { useDispatch } from "react-redux"; // Si usas Redux para dispatch

const LogoutPage = () => {
  const router = useRouter(); // Next.js
  // const history = useHistory(); // React Router
  const dispatch = useDispatch(); // Obtén dispatch si usas Redux

  useEffect(() => {
    const performLogout = async () => {
      try {
        // 1. Ejecutar la función de logout
        await authService.logout(dispatch); // Cerrar sesión

        // 2. Redirigir al usuario a la página de login
        router.push("/login"); // Redirige a /login después del logout
      } catch (error) {
        console.error("Error durante el logout:", error);
        // Manejar el error (por ejemplo, mostrar un mensaje al usuario)
      }
    };

    performLogout(); // Ejecutar el logout automáticamente al cargar la página
  }, [router, dispatch]); // Dependencias de useEffect

  return (
    <div>
      <h1>Cerrando sesión...</h1>
      {/* Puedes mostrar un mensaje o un spinner mientras se cierra la sesión */}
    </div>
  );
};

export default LogoutPage;