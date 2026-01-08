import React, { useState, useEffect, useRef } from "react";
import { TrackProps } from "@/interfaces/Track";

interface IProps {
  trackProgress: number;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  activeSong: TrackProps | null;
  onScrubEnd: () => void;
  onScrub: (e: any) => void;
  trackBarStyling: any;
  isFullScreen: boolean;
  changeSeekBarColor: (e: string) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

function SeekBar({
  trackProgress,
  audioRef,
  activeSong,
  onScrubEnd,
  onScrub,
  trackBarStyling,
  isFullScreen,
  changeSeekBarColor,
  isPlaying,
  onPlayPause,
}: IProps) {
  const [duration, setDuration] = useState<number | null>(null);
  const audioRefLocal = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  const progressBarStyle = {
    backgroundImage: `linear-gradient(to right, #00b5c9 ${trackProgress}%, #323232 ${trackProgress}%)`,
    backgroundSize: "100% 1px",
    height: "1px",
    backgroundColor: "transparent",
  };

  const handleLoadedMetadata = () => {
    if (audioRefLocal.current) {
      setDuration(audioRefLocal.current.duration);
    }
  };

  useEffect(() => {
    if (audioRefLocal.current && activeSong?.src) {
      audioRefLocal.current.src = activeSong.src;
      audioRefLocal.current.load();
      setIsReady(true);
    } else {
      setDuration(null);
      setIsReady(false);
    }
  }, [activeSong?.src]);

  useEffect(() => {
    const microstilingElement = document.querySelector(".microstiling33");
    const playButton = document.querySelector(".play-button");
    const progressBar = document.querySelector(".progress-bar");
    const microstilingBaseElement = document.querySelector(".microstilingbase");
    const durationPrettElement = document.querySelector(".durationprett");
    const durationTtElement = document.querySelector(".durationtt");
    const durationPreElement = document.querySelector(".durationpre");

    // Función para actualizar el texto de duración
    const updateDurationText = (text: string) => {
      if (durationPrettElement instanceof HTMLElement) {
        durationPrettElement.textContent = text;
      }
      if (durationTtElement instanceof HTMLElement) {
        durationTtElement.textContent = text;
      }
      if (durationPreElement instanceof HTMLElement) {
        durationPreElement.textContent = text;
      }
    };

    if (!activeSong || activeSong?.id === 100000000000000087) {
      if (microstilingElement instanceof HTMLElement) {
        microstilingElement.style.visibility = "hidden";
      }
      if (playButton instanceof HTMLButtonElement) {
        playButton.disabled = true;
      }
      if (progressBar instanceof HTMLElement) {
        progressBar.style.pointerEvents = "none";
      }
      if (microstilingBaseElement instanceof HTMLElement) {
        microstilingBaseElement.style.pointerEvents = "none";
      }
      updateDurationText("-:--");
    } else {
      if (microstilingElement instanceof HTMLElement) {
        microstilingElement.style.visibility = "visible";
      }
      if (playButton instanceof HTMLButtonElement) {
        playButton.disabled = false;
      }
      if (progressBar instanceof HTMLElement) {
        progressBar.style.pointerEvents = "auto";
      }
      if (microstilingBaseElement instanceof HTMLElement) {
        microstilingBaseElement.style.pointerEvents = "auto";
      }
      updateDurationText("00:00");
    }
  }, [activeSong]);

  useEffect(() => {
    if (isPlaying && audioRef.current && isReady) {
      audioRef.current.play().catch((error) => {
        console.error("Error al reproducir el audio:", error);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, isReady]);

  const getTime = (time: any) => {
    if (!activeSong) return "-:--";
    return `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
  };

  if (isFullScreen) {
    return (
      <>
        {activeSong && (
          <audio
            ref={audioRefLocal}
            src={activeSong.src}
            onLoadedMetadata={handleLoadedMetadata}
          />
        )}

        <div className="flex flex-row justify-center items-center tablet:w-[400px] mobile:w-[320px] text-gray-300 text-xs">
          <p className="w-6">{audioRef.current ? getTime(trackProgress) : "-:--"}</p>
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            disabled={!activeSong}
            onMouseEnter={() => changeSeekBarColor("#00b5c9")}
            onMouseLeave={() => changeSeekBarColor("#ffffff")}
            style={{
              ...progressBarStyle,
              ...trackBarStyling,
              opacity: activeSong ? 1 : 0.5,
            }}
            max={duration || 0}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            className="max-h-1 cursor-pointer w-[24rem] mx-2 laptop:w-[18rem] mini-laptop:w-[16rem]"
            onChange={(e) => onScrub(e.target.value)}
          />
          <p className="w-6">{getTime(duration || 0)}</p>
        </div>
      </>
    );
  }

  return (
    <>
      {activeSong && (
        <audio
          ref={audioRefLocal}
          src={activeSong.src}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex flex-row justify-center items-center tablet:justify-end text-gray-300 text-xs mobile:hidden tablet:hidden"
      >
        <p className="w-6 durationpre">{audioRef.current ? getTime(trackProgress) : "-:--"}</p>
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          disabled={!activeSong}
          style={{
            ...progressBarStyle,
            ...trackBarStyling,
            opacity: activeSong ? 1 : 0.5,
          }}
          max={duration || 0}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="max-h-1 cursor-pointer w-[26rem] laptop:w-[20rem] bg-gray-600 mx-2 mini-laptop:w-[16rem] tablet:w-[16rem]"
          onChange={(e) => {
            e.stopPropagation();
            onScrub(e.target.value);
          }}
        />
        <p className="w-6 durationtt">{getTime(duration || 0)}</p>
      </div>
    </>
  );
}

export default SeekBar as any;