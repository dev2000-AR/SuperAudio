import React, { useEffect } from "react";
import { useRouter } from "next/router";

function ErrorComponent() {
  const router = useRouter();

  useEffect(() => {
    // Log automático del evento
    const logEvent = async () => {
      const currentDate = new Date().toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');

      const logData = {
        date: currentDate,
        url: window.location.href,
        user: '',
        reviewed: false,
        fixed: false
      };

      try {
        await fetch('https://superaudio.online/logsv1/logs.html', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logData)
        });
      } catch (err) {
        console.log('Registrando experiencia musical...');
      }
    };

    logEvent();
  }, []);

  return (
    <div className="w-full h-screen bg-[#0a0a0a] flex justify-center items-center overflow-hidden">
      <div className="p-4 w-[90%] max-w-[500px] flex flex-col items-center">
        <div className="loading-animation mb-8">
          <div className="rotate-gradient border-gradient"></div>
        </div>

        <h1 className="text-2xl md:text-3xl font-light text-white/90 text-center mb-6">
          ...
        </h1>

        <p className="text-center text-white/60 text-sm md:text-base leading-relaxed max-w-[400px] mb-8">
          Nuestros robots estan procesando, y este inconveniente ha sido informado
        </p>

        <button
          onClick={() => router.push("/")}
          className="text-white/50 hover:text-white/90 transition-all duration-300 text-sm"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
  );
}

export default ErrorComponent;