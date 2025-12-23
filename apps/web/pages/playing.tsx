import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStateProps } from "../stores/player/currentAudioPlayer";
import { useRouter } from 'next/router';
import {
  playPause,
  nextSong,
  toggleModel,
} from "../stores/player/currentAudioPlayer";
import LikeButton from "../components/AudioPlayer/LikeButton";

function Playing() {
  const router = useRouter();
  const {
    activeSong,
    isPlaying,
    trackProgress,
    tracks,
    currentIndex,
  } = useSelector((state: { player: IStateProps }) => state.player);

  const [trackStyling, setTrackStyling] = useState("");
  const [initialRender, setInitialRender] = useState(true);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return '0:00';
  };

  useEffect(() => {
    const musicBar = document.querySelector('.barmusichome') as HTMLElement;
    if (musicBar) {
      musicBar.style.visibility = 'hidden';
    }
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.volume = 0;
    }

    return () => {
      const musicBar = document.querySelector('.barmusichome') as HTMLElement;
      if (musicBar) {
        musicBar.style.visibility = 'visible';
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  }, [audioRef.current?.duration]);

  const toPrevTrack = () => {
    if (currentIndex > 0) {
      dispatch(nextSong(currentIndex - 1));
    } else {
      dispatch(nextSong(tracks.length - 1));
    }
  };

  const toNextTrack = () => {
    if (currentIndex < tracks.length - 1) {
      dispatch(nextSong(currentIndex + 1));
    } else {
      dispatch(nextSong(0));
    }
  };

  const onScrub = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      dispatch(playPause(true));
    }
  };

  if (!activeSong) return null;

  return (
    <>
      <Head>
        <title>{`${activeSong.track_name} • ${activeSong.artist_name}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="fixed inset-0 w-full h-full bg-black">
        <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex flex-col">
            <button 
              onClick={() => router.back()}
              className="text-white p-2 self-start mb-2"
            >
              <i className="icon-arrow-left text-2xl" />
            </button>
            <div className={`transition-all duration-500 ${isPlaying ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
              <h1 className="text-white text-xl font-bold">{activeSong.track_name}</h1>
              <p className="text-gray-300 text-sm">{activeSong.artist_name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LikeButton track_id={activeSong.id} isList={false} />
            <button 
              onClick={() => dispatch(toggleModel({ data: true, track_id: activeSong.id }))}
              className="text-white p-2"
            >
              <i className="icon-plus text-xl" />
            </button>
          </div>
        </div>

        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${activeSong?.cover_image?.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(120px)',
            transform: 'scale(1.2)',
          }}
        />

        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1" />

          <div className="w-full px-4 pb-8 md:pb-12">
            <div className="w-full max-w-md mx-auto flex justify-between text-xs text-gray-300 mb-1 px-1">
              <span>{formatTime(trackProgress)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="w-full max-w-md mx-auto mb-6">
              <input
                type="range"
                value={trackProgress}
                step="1"
                min="0"
                max={duration || 0}
                className="progress-slider w-full"
                onChange={(e) => onScrub(parseInt(e.target.value))}
                onMouseUp={onScrubEnd}
                onTouchEnd={onScrubEnd}
              />
            </div>

            <div className="flex justify-center items-center space-x-8 md:space-x-12">
              <button 
                onClick={toPrevTrack}
                className="control-button prev-button"
              >
                <i className="icon-previous text-2xl md:text-3xl" />
              </button>

              <button
                onClick={() => dispatch(playPause(!isPlaying))}
                className="play-button"
              >
                <i className={`${isPlaying ? 'icon-pause' : 'icon-play'} text-3xl md:text-4xl`} />
              </button>

              <button 
                onClick={toNextTrack}
                className="control-button next-button"
              >
                <i className="icon-next text-2xl md:text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={activeSong?.src}
        preload="metadata"
        muted
      />

      <style jsx global>{`
        .barmusichome {
          visibility: hidden !important;
          display: none !important;
        }

        .progress-slider {
          -webkit-appearance: none;
          height: 3px;
          border-radius: 1.5px;
          background: rgba(255,255,255,0.2);
          background-image: linear-gradient(#fff, #fff);
          background-size: ${(trackProgress / (duration || 1)) * 100}% 100%;
          background-repeat: no-repeat;
        }

        .progress-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: none;
          margin-top: -4px;
          box-shadow: 0 0 2px rgba(0,0,0,0.5);
        }

        .control-button {
          width: 48px;
          height: 48px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .play-button {
          width: 64px;
          height: 64px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .next-button, .prev-button {
          width: 48px;
          height: 48px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          opacity: 0.8;
        }

        .next-button:hover, .prev-button:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .control-button:active,
        .play-button:active {
          transform: scale(0.95);
        }

        @media (max-width: 640px) {
          .control-button,
          .next-button,
          .prev-button {
            width: 40px;
            height: 40px;
          }

          .play-button {
            width: 56px;
            height: 56px;
          }
        }
      `}</style>
    </>
  );
}

export default Playing;