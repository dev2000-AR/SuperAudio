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
      audioSource.disconnect(); // Asegurar desconexión previa
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
      // Cleanup
      eqFiltersRef.current.forEach(filter => {
        filter.disconnect();
      });
      // Asegurar reconexión directa si es necesario, aunque el manejo está en isActive
    };
  }, [audioContext, audioSource]);

  // Aplicar/desactivar EQ
  useEffect(() => {
    if (!audioSource || !eqFiltersRef.current.length) return;

    // Se llama a reconectar cada vez que cambia isActive
    reconectarCadenaAudio(isActive);
  }, [isActive, audioSource]);

  const reconectarCadenaAudio = (conEQ: boolean) => {
    if (!audioSource || !eqFiltersRef.current.length || !audioContext) return;

    // 1. Desconectar el audioSource de todos los nodos conocidos (filtros y destino)
    audioSource.disconnect();

    // 2. Conectar al analizador (si existe)
    if (analyserRef.current) {
      audioSource.connect(analyserRef.current);
      // Desconectar el analizador de su destino previo si lo tenía, aunque en este setup solo conecta el source.
      // Aquí el analizador se conecta al destino a través del último nodo de la cadena (EQ o Source directo).
    }

    // 3. Conectar la cadena principal
    if (conEQ && eqFiltersRef.current.length > 0) {
      // Conectar Source -> EQ[0] y EQ[ultimo] -> Destination
      audioSource.connect(eqFiltersRef.current[0]);
      // Asegurarse de que el analizador no vaya al destino si el EQ está activo
      analyserRef.current?.disconnect();

      // En el setup inicial conectamos Source->Analyser y Source->EQ[0]
      // El Analizador debe conectarse *después* del EQ o directamente al destino si no hay EQ.
      // Para simplificar, asumiremos que Source -> EQ[0] -> ... -> EQ[12] -> Analyser -> Destination
      // Pero el código actual conecta Source -> Analyser y Source -> EQ[0].
      // Ajuste: Conectar el último nodo (analizador o filtro) al destino.

      // Solo si el último filtro está conectado a audioContext.destination (lo hace el inicializador)
      // La reconexión debe manejar: Source -> EQ[0] y EQ[12] -> Destination.
      
      // Conectar el último filtro al destino
      eqFiltersRef.current[eqFiltersRef.current.length - 1].connect(audioContext.destination);
      
      // Opcional: Para visualizar la salida del EQ, conectar el Analizador DENTRO de la cadena (e.g., antes del destino)
      // Por ahora, mantenemos la conexión inicial Source -> Analyser y EQ[12] -> Destination.

    } else {
      // Conectar directo sin EQ
      // Se necesita asegurar que los filtros estén desconectados del destino.
      eqFiltersRef.current.forEach(filter => filter.disconnect());
      
      // Conectar Source -> Destination
      audioSource.connect(audioContext.destination);
      
      // Si el analizador también debe ir al destino:
      // if (analyserRef.current) { analyserRef.current.connect(audioContext.destination); }
    }
  };


  const handleGainChange = (index: number, value: number) => {
    const newGainValues = [...gainValues];
    newGainValues[index] = value;
    setGainValues(newGainValues);

    if (eqFiltersRef.current[index]) {
      eqFiltersRef.current[index].gain.value = value;
    }
    // Asegurarse de que el preset sea "Manual"
    // Ya que no hay un estado explícito de preset, esto se omite.
  };

  const applyPreset = (presetName: keyof typeof presets) => {
    const presetValues = presets[presetName];
    setGainValues([...presetValues]);
    
    presetValues.forEach((value, index) => {
      if (eqFiltersRef.current[index]) {
        eqFiltersRef.current[index].gain.value = value;
      }
    });
    
    // Asegurar que el EQ se active al aplicar un preset si estaba inactivo, a menos que sea 'Default'
    if (presetName !== 'Default' && !isActive) {
        onToggle(true);
    } else if (presetName === 'Default' && isActive) {
        // Opcional: Desactivar si se pone en default (todos a 0)
        // onToggle(false); 
    }
  };

  const resetEQ = () => {
    applyPreset('Default');
  };

  return (
    <div className="eq-13-bandas bg-[#0a0a0a] p-4 rounded-lg border border-[rgba(255,255,255,0.1)]">
      {/* Header del EQ */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold">Ecualizador YOuP 13 Bandas</h3>
          <p className="text-gray-400 text-sm">Control basado en secuencia Fibonacci</p>
        </div>
        
        <button
          onClick={() => onToggle(!isActive)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            isActive  
              ? 'bg-[#00d4ff] text-black'  
              : 'bg-[rgba(255,255,255,0.06)] text-white opacity-60'
          }`}
        >
          🎛️ {isActive ? 'EQ Activado' : 'EQ Desactivado'}
        </button>
      </div>

      {/* Controles del EQ */}
      {isActive && (
        <>
          {/* Selector de presets */}
          <div className="mb-4">
            <label className="text-gray-300 text-sm mb-2 block">Presets:</label>
            <div className="flex gap-2">
              <button
                onClick={() => applyPreset('Dance')}
                className="px-3 py-1 bg-[rgba(255,255,255,0.06)] text-white rounded text-sm border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)]"
              >
                Activo
              </button>
              <button
                onClick={() => applyPreset('Default')}
                className="px-3 py-1 bg-[rgba(255,255,255,0.06)] text-white rounded text-sm border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)]"
              >
                Apagado
              </button>
              <button
                onClick={resetEQ}
                className="px-3 py-1 bg-[rgba(255,59,242,0.2)] text-white rounded text-sm border border-[rgba(255,59,242,0.3)] hover:bg-[rgba(255,59,242,0.3)]"
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
                  {freq >= 1000 ? `${(freq/1000).toFixed(1)}K` : freq}
                </label>
                
                <input
                  type="range"
                  min="-13"
                  max="13"
                  value={gainValues[index]}
                  onChange={(e) => handleGainChange(index, parseFloat(e.target.value))}
                  className="band-slider w-full h-24 bg-transparent outline-none opacity-80 hover:opacity-100 cursor-pointer"
                  style={{ writingMode: 'bt-lr' }}
                />
                
                <span className="text-gray-400 text-xs mt-1">
                  {gainValues[index]} dB
                </span>
              </div>
            ))}
          </div>

          {/* Indicador de estado */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Modo: {gainValues.every(v => v === 0) ? 'Lineal' : 'EQ Personalizado'}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EQ13Bandas;

