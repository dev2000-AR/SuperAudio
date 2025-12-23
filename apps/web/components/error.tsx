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

      <style jsx global>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-gradient {
          to {
            --gradient-angle: 360deg;
          }
        }

        .loading-animation {
          width: max(25vmin, 8rem);
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rotate-gradient {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(
            from var(--gradient-angle),
            transparent,
            #2bb540 10%,
            white 45%,
            transparent 60%
          );
          animation: rotate-gradient 3s linear infinite;
          position: relative;
        }

        .rotate-gradient::before {
          content: '';
          position: absolute;
          inset: 4px;
          border-radius: 50%;
          background: #0a0a0a;
        }

        .border-gradient {
          --c: #171717;
          --p: 10%;
          background: linear-gradient(var(--c), var(--c)) padding-box,
            conic-gradient(
              from var(--gradient-angle),
              transparent,
              #2bb540 var(--p),
              transparent calc(var(--p) * 2)
            )
            border-box;
          border: 1px solid transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          .rotate-gradient {
            animation-duration: 5s;
          }
        }
      `}</style>
    </div>
  );
}

export default ErrorComponent;