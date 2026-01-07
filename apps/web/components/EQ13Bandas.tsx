// components/EQ13Bandas.tsx
import React, { useState, useEffect, useRef } from 'react';

interface EQ13BandasProps {
  audioContext: AudioContext;
  audioSource: MediaElementAudioSourceNode;
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

const EQ13Bandas: React.FC<EQ13BandasProps> = ({
  audioContext,
  audioSource,
  isActive,
  onToggle
}) => {
  // Frecuencias basadas en Fibonacci
  const frequencies = [55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711];
  const frequencyLabels = ["55Hz", "89Hz", "144Hz", "233Hz", "377Hz", "610Hz", "987Hz", "1.6KHz", "2.6KHz", "4.2KHz", "6.8KHz", "10.9KHz", "17.7KHz"];

  const [gainValues, setGainValues] = useState<number[]>(new Array(13).fill(0));
  const [presets] = useState({
    Dance: [8, 5, 3, 3, 1, 3, 3, 3, 3, 3, 8, 8, 13],
    Default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Manual: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  });

  const eqFiltersRef = useRef<BiquadFilterNode[]>([]);
  const analyserRef = useRef<AnalyserNode>();
  const isInitializedRef = useRef(false);
  const animationRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Inicializar el ecualizador
  useEffect(() => {
    if (!audioContext || !audioSource || isInitializedRef.current) return;

    try {
      // Crear analizador
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      // Crear filtros EQ
      const filters: BiquadFilterNode[] = [];

      frequencies.forEach(freq => {
        const filter = audioContext.createBiquadFilter();
        filter.type = 'peaking';
        filter.frequency.value = freq;
        filter.Q.value = 1.0;
        filter.gain.value = 0;
        filters.push(filter);
      });

      // Conectar la cadena de audio
      audioSource.disconnect();
      audioSource.connect(analyser);

      if (filters.length > 0) {
        audioSource.connect(filters[0]);

        // Conectar filtros en serie
        for (let i = 0; i < filters.length - 1; i++) {
          filters[i].connect(filters[i + 1]);
        }

        // Conectar el último filtro al destino
        filters[filters.length - 1].connect(audioContext.destination);
      } else {
        audioSource.connect(audioContext.destination);
      }

      eqFiltersRef.current = filters;
      isInitializedRef.current = true;

      console.log('EQ 13 Bandas inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar EQ:', error);
    }

    return () => {
      eqFiltersRef.current.forEach(filter => {
        filter.disconnect();
      });
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioContext, audioSource]);

  // Efecto para el espectrograma en vivo
  useEffect(() => {
    if (!isActive || !analyserRef.current || !canvasRef.current) return;

    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      // Configuración del canvas
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      const width = canvas.width;
      const height = canvas.height;

      // Fondo con gradiente futurista
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#1a1a2e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Configuración de estilo futurista
      const barWidth = (width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      // Efecto de neón y partículas
      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * height * 1.2;

        // Colores neón basados en la frecuencia
        const hue = (i / bufferLength) * 360;
        const saturation = 80 + (dataArray[i] / 255) * 20;
        const lightness = 50 + (dataArray[i] / 255) * 30;

        // Sombra de neón
        ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Barra principal con gradiente
        const barGradient = ctx.createLinearGradient(x, height, x, height - barHeight);
        barGradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`);
        barGradient.addColorStop(0.5, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`);
        barGradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`);

        ctx.fillStyle = barGradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        // Efecto de partículas en la parte superior de las barras altas
        if (barHeight > height * 0.7) {
          ctx.fillStyle = `hsla(${hue + 30}, 100%, 70%, 0.6)`;
          ctx.beginPath();
          ctx.arc(x + barWidth / 2, height - barHeight - 2, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        x += barWidth + 1;
      }

      // Efecto de escaneo horizontal
      const scanGradient = ctx.createLinearGradient(0, 0, 0, height);
      scanGradient.addColorStop(0, 'rgba(0, 212, 255, 0)');
      scanGradient.addColorStop(0.1, 'rgba(0, 212, 255, 0.3)');
      scanGradient.addColorStop(0.2, 'rgba(0, 212, 255, 0)');
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, (Date.now() / 20) % height, width, height * 0.1);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  // Aplicar/desactivar EQ
  useEffect(() => {
    if (!audioSource || !eqFiltersRef.current.length) return;
    reconectarCadenaAudio(isActive);
  }, [isActive, audioSource]);

  const reconectarCadenaAudio = (conEQ: boolean) => {
    if (!audioSource || !eqFiltersRef.current.length || !audioContext) return;

    audioSource.disconnect();

    if (analyserRef.current) {
      audioSource.connect(analyserRef.current);
      analyserRef.current?.disconnect();
    }

    if (conEQ && eqFiltersRef.current.length > 0) {
      audioSource.connect(eqFiltersRef.current[0]);
      eqFiltersRef.current[eqFiltersRef.current.length - 1].connect(audioContext.destination);
    } else {
      eqFiltersRef.current.forEach(filter => filter.disconnect());
      audioSource.connect(audioContext.destination);
    }
  };

  const handleGainChange = (index: number, value: number) => {
    const newGainValues = [...gainValues];
    newGainValues[index] = value;
    setGainValues(newGainValues);

    if (eqFiltersRef.current[index]) {
      eqFiltersRef.current[index].gain.value = value;
    }
  };

  const applyPreset = (presetName: keyof typeof presets) => {
    const presetValues = presets[presetName];
    setGainValues([...presetValues]);

    presetValues.forEach((value, index) => {
      if (eqFiltersRef.current[index]) {
        eqFiltersRef.current[index].gain.value = value;
      }
    });

    if (presetName !== 'Default' && !isActive) {
      onToggle(true);
    }
  };

  const resetEQ = () => {
    applyPreset('Default');
  };

  // Función para obtener audio sin problemas de CORS
  const getAudioWithCORS = (url: string): string => {
    // URLs permitidas sin problemas de CORS
    const allowedDomains = [
      'x.cloudfront.com',
      'supercdn.superaudio.online',
      'cdn.cloudflare.steamstatic.com',
      'akamaihd.net'
    ];

    // Si la URL está en los dominios permitidos, forzar CORS
    if (allowedDomains.some(domain => url.includes(domain))) {
      return url + (url.includes('?') ? '&' : '?') + 'cors=true';
    }

    return url;
  };

  return (
    <div className={`eq-13-bandas p-4 rounded-lg border-2 transition-all duration-300 ${isActive
        ? 'bg-[#0a0a0a] border-[#00d4ff] shadow-lg shadow-[#00d4ff]/20'
        : 'bg-[#0a0a0a] border-[rgba(255,255,255,0.1)] opacity-80'
      }`}>
      {/* Header del EQ */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg">Ecualizador YOuP 13 Bandas</h3>
          <p className="text-gray-400 text-sm">Control basado en secuencia Fibonacci</p>
        </div>

        <button
          onClick={() => onToggle(!isActive)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden ${isActive
              ? 'bg-gradient-to-r from-[#00d4ff] to-[#0099cc] text-black shadow-lg shadow-[#00d4ff]/30'
              : 'bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] text-white border border-[rgba(255,255,255,0.2)]'
            }`}
        >
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          )}
          <span className="relative z-10">
            🎛️ {isActive ? 'EQ Activado' : 'EQ Desactivado'}
          </span>
        </button>
      </div>

      {/* Espectrograma en vivo */}
      {isActive && (
        <div className="mb-4 rounded-lg overflow-hidden border border-[rgba(0,212,255,0.3)] bg-black">
          <canvas
            ref={canvasRef}
            className="w-full h-32"
          />
        </div>
      )}

      {/* Controles del EQ */}
      {isActive && (
        <>
          {/* Selector de presets */}
          <div className="mb-4">
            <label className="text-gray-300 text-sm mb-2 block">Presets:</label>
            <div className="flex gap-2">
              <button
                onClick={() => applyPreset('Dance')}
                className="px-3 py-1 bg-gradient-to-r from-[#00d4ff] to-[#0099cc] text-black rounded text-sm font-semibold border border-[#00d4ff] hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all"
              >
                Activo
              </button>
              <button
                onClick={() => applyPreset('Default')}
                className="px-3 py-1 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] text-white rounded text-sm border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-all"
              >
                Apagado
              </button>
              <button
                onClick={resetEQ}
                className="px-3 py-1 bg-gradient-to-r from-[#ff3bf2] to-[#cc00bb] text-white rounded text-sm font-semibold border border-[#ff3bf2] hover:shadow-lg hover:shadow-[#ff3bf2]/30 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Sliders de bandas */}
          <div className="grid grid-cols-13 gap-2 mb-4">
            {frequencies.map((freq, index) => (
              <div key={index} className="flex flex-col items-center">
                <label className="text-gray-400 text-xs mb-1 text-center">
                  {freq >= 1000 ? `${(freq / 1000).toFixed(1)}K` : freq}
                </label>

                <input
                  type="range"
                  min="-13"
                  max="13"
                  value={gainValues[index]}
                  onChange={(e) => handleGainChange(index, parseFloat(e.target.value))}
                  className="band-slider w-full h-24 bg-transparent outline-none opacity-80 hover:opacity-100 cursor-pointer transition-opacity"
                  style={{
                    writingMode: 'vertical-lr',
                    background: `linear-gradient(to top, #00d4ff ${(gainValues[index] + 13) * (100 / 26)}%, #333 ${(gainValues[index] + 13) * (100 / 26)}%)`
                  }}
                />

                <span className={`text-xs mt-1 font-semibold ${gainValues[index] > 0 ? 'text-[#00d4ff]' :
                    gainValues[index] < 0 ? 'text-[#ff3bf2]' : 'text-gray-400'
                  }`}>
                  {gainValues[index]} dB
                </span>
              </div>
            ))}
          </div>

          {/* Indicador de estado */}
          <div className="text-center p-3 rounded-lg bg-gradient-to-r from-[rgba(0,212,255,0.1)] to-[rgba(255,59,242,0.1)] border border-[rgba(255,255,255,0.1)]">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#ff3bf2] text-sm font-semibold">
              {gainValues.every(v => v === 0) ? 'MODO LINEAL' : 'ECUALIZACIÓN ACTIVA'}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EQ13Bandas;
