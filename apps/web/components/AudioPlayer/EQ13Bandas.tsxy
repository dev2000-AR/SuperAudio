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
  const frequencies = [55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711];
  const [gainValues, setGainValues] = useState<number[]>(new Array(13).fill(0));
  const [presets] = useState({
    Dance: [8, 5, 3, 3, 1, 3, 3, 3, 3, 3, 8, 8, 13],
    Default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Manual: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  });

  const eqFiltersRef = useRef<BiquadFilterNode[]>([]);
  const analyserRef = useRef<AnalyserNode>();
  const isInitializedRef = useRef(false);
  const preVolumeRef = useRef<GainNode | null>(null);

  const [minimized, setMinimized] = useState(true);

  useEffect(() => {
    if (!audioContext || !audioSource || isInitializedRef.current) return;

    try {
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      // Crear nodo de prevolumen
      const preVolume = audioContext.createGain();
      preVolume.gain.value = 1.0; // Valor inicial
      preVolumeRef.current = preVolume;

      const filters: BiquadFilterNode[] = [];
      frequencies.forEach(freq => {
        const filter = audioContext.createBiquadFilter();
        filter.type = 'peaking';
        filter.frequency.value = freq;
        filter.Q.value = 1.0;
        filter.gain.value = 0;
        filters.push(filter);
      });

      audioSource.disconnect();
      audioSource.connect(preVolume);
      preVolume.connect(analyser);
      
      if (filters.length > 0) {
        preVolume.connect(filters[0]);
        for (let i = 0; i < filters.length - 1; i++) {
          filters[i].connect(filters[i + 1]);
        }
        filters[filters.length - 1].connect(audioContext.destination);
      } else {
        preVolume.connect(audioContext.destination);
      }

      eqFiltersRef.current = filters;
      isInitializedRef.current = true;
      console.log('EQ 13 Bandas inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar EQ:', error);
    }

    return () => {
      eqFiltersRef.current.forEach(filter => filter.disconnect());
      if (preVolumeRef.current) {
        preVolumeRef.current.disconnect();
      }
    };
  }, [audioContext, audioSource]);

  useEffect(() => {
    if (!audioSource || !eqFiltersRef.current.length) return;
    reconectarCadenaAudio(isActive);
    
    // Cuando se activa el EQ, establecer prevolumen al 34%
    if (isActive && preVolumeRef.current) {
      preVolumeRef.current.gain.value = 0.34;
      console.log('EQ activado - Prevolumen establecido al 34%');
    } else if (!isActive && preVolumeRef.current) {
      // Cuando se desactiva, restaurar volumen al 100%
      preVolumeRef.current.gain.value = 1.0;
    }
  }, [isActive, audioSource]);

  const reconectarCadenaAudio = (conEQ: boolean) => {
    if (!audioSource || !eqFiltersRef.current.length || !audioContext || !preVolumeRef.current) return;
    
    audioSource.disconnect();
    audioSource.connect(preVolumeRef.current);
    preVolumeRef.current.disconnect();

    if (analyserRef.current) preVolumeRef.current.connect(analyserRef.current);

    if (conEQ && eqFiltersRef.current.length > 0) {
      preVolumeRef.current.connect(eqFiltersRef.current[0]);
      analyserRef.current?.disconnect();
      eqFiltersRef.current[eqFiltersRef.current.length - 1].connect(audioContext.destination);
    } else {
      eqFiltersRef.current.forEach(filter => filter.disconnect());
      preVolumeRef.current.connect(audioContext.destination);
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

  return (
    <div
      className={`fixed z-50 transition-all duration-500 ${
        minimized
          ? 'bottom-4 right-4 w-40 h-14 bg-[#0a0a0a]/80 border border-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105'
          : 'bottom-8 right-8 w-[95vw] sm:w-[600px] max-h-[90vh] bg-[#0a0a0a]/95 border border-[rgba(255,255,255,0.1)] rounded-2xl p-4 overflow-y-auto'
      }`}
      onClick={() => minimized && setMinimized(false)}
    >
      {minimized ? (
        <div className="flex items-center gap-2 text-gray-300">
          <span>🎚️ EQ YOuP</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMinimized(false);
            }}
            className="text-xs bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] rounded px-2 py-1"
          >
            ↑
          </button>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Ecualizador YOuP 13 Bandas</h3>
              <p className="text-gray-400 text-sm">Control Fibonacci</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMinimized(true);
                }}
                className="px-3 py-1 rounded-lg bg-[rgba(255,255,255,0.06)] text-gray-300 text-sm hover:bg-[rgba(255,255,255,0.1)]"
              >
                ⬇️ Minimizar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(!isActive);
                }}
                className={`px-3 py-1 rounded-lg font-semibold text-sm transition-all ${
                  isActive
                    ? 'bg-[#00d4ff] text-black'
                    : 'bg-[rgba(255,255,255,0.06)] text-white opacity-60'
                }`}
              >
                🎛️ {isActive ? 'Activo' : 'Apagado'}
              </button>
            </div>
          </div>

          {isActive && (
            <>
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => applyPreset('Dance')}
                  className="px-3 py-1 bg-[rgba(255,255,255,0.06)] text-white rounded text-sm hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)]"
                >
                  Activo
                </button>
                <button
                  onClick={() => applyPreset('Default')}
                  className="px-3 py-1 bg-[rgba(255,255,255,0.06)] text-white rounded text-sm hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)]"
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

              <div className="overflow-x-auto">
                <div className="grid grid-cols-13 gap-2 min-w-[800px]">
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
                        className="band-slider w-full h-24 bg-transparent outline-none opacity-80 hover:opacity-100 cursor-pointer"
                        style={{ writingMode: 'bt-lr' }}
                      />
                      <span className="text-gray-400 text-xs mt-1">{gainValues[index]} dB</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-3">
                <p className="text-gray-400 text-sm">
                  Modo: {gainValues.every((v) => v === 0) ? 'Lineal' : 'EQ Personalizado'}
                  {isActive && ' • Prevolumen al 34%'}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EQ13Bandas;
