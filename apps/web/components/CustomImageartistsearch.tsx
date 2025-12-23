import React, { useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

function CustomImageartistsearch({ src, className, objectFit = "cover" }: any) {
  const [isError, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Usar useInView para detectar cuándo la imagen está en el viewport
  const { ref, inView } = useInView({
    triggerOnce: true, // Solo activar una vez
    threshold: 0.1, // Activar cuando el 10% de la imagen esté en el viewport
  });

  return !isError ? (
    <div
      ref={ref} // Referencia para detectar visibilidad
      className={`${className} select-none noDrag`}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {inView && ( // Solo renderizar la imagen si está en el viewport
        <Image
          src={src}
          alt="img"
          layout="fill"
          objectFit={objectFit}
          className={`${className} select-none noDrag transition-opacity duration-200 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          unoptimized={false}
          sizes="100vw"
          onLoadingComplete={() => setIsLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      )}
    </div>
  ) : null;
}

export default CustomImageartistsearch;