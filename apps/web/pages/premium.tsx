import React, { useEffect } from "react";
import { useRouter } from "next/router";

function getCookie(name: string) {
  const cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      const cookieValue = decodeURIComponent(cookiePair[1]);
      try {
        const userData = JSON.parse(cookieValue);
        return userData.username; // Retorna el 'username' de la cookie
      } catch (error) {
        console.error("Error al parsear la cookie:", error);
        return null;
      }
    }
  }
  return null;
}

const Premium = () => {
  const router = useRouter();

  useEffect(() => {
    const username = getCookie("user"); // Llamar a la función para obtener el 'username' desde la cookie
    
    if (username) {
      // Si el 'username' es válido, redirigir al usuario a la URL con el parámetro 'username'
      window.location.href = `https://paymentsup.superaudio.online/?username=${username}`;
    } else {
      console.error("Usuario no autenticado");
      // Redirigir a la página de login si no está autenticado
      router.push("/login");
    }
  }, []); // Esto solo se ejecuta una vez cuando el componente se monta

  return (
    <div style={styles.container}>
      <div style={styles.loader}></div>
    </div>
  );
};

const styles = {
  container: {
    position: "absolute" as "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    border: "16px solid #f3f3f3", // Color gris claro para el borde
    borderTop: "16px solid #009cde", // Color azul del logo de SuperAudio
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    animation: "spin 3s linear infinite", // Tiempo de animación ajustado a 3s para hacerlo más lento
  },
};

export default Premium;
