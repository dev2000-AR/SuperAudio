import Head from "next/head";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullScreenPlayer from "./AudioPlayer/FullScreenPlayer";
import FullScreenCoverImage from "./FullScreenCoverImage";
import SeekBar from "./AudioPlayer/SeekBar";
import Controls from "./AudioPlayer/Controls";
import VolumeControls from "./AudioPlayer/VolumeControls";
import LikeButton from "./AudioPlayer/LikeButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { toggleModel } from "@/stores/player/currentAudioPlayer";
import { playPause, onRepeat, onShuffle } from "@/stores/player/currentAudioPlayer";

const Playing = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { activeSong, isPlaying, isRepeat, isShuffle, trackProgress, volume } = useSelector(
    (state: any) => state.player
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Si activeSong es null, no renderizar el componente
  if (!activeSong) {
    return (
      <div className="font-ProximaRegular fixed bottom-0 left-0 right-0 top-0 select-none overflow-hidden h-screen w-screen max-w-full flex items-center justify-center bg-[#121212]">
        <p className="text-white text-lg">No song is currently active.</p>
      </div>
    );
  }

  // Definir la función changeSeekBarColor
  const changeSeekBarColor = (color: string) => {
    console.log("Cambiando color de la barra de progreso a:", color);
  };

  // Funciones para manejar el progreso de la canción
  const onScrub = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const onScrubEnd = () => {
    // Lógica para cuando se termina de arrastrar la barra de progreso
  };

  const updateVolume = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const toNextTrack = () => {
    // Lógica para ir a la siguiente canción
  };

  const toPrevTrack = () => {
    // Lógica para ir a la canción anterior
  };

  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${trackProgress / 100}, #2bb540), color-stop(${trackProgress / 100}, #777))
  `;

  return (
    <div
      style={{ backgroundColor: activeSong.cover_image?.color || "#121212" }}
      className="font-ProximaRegular fixed bottom-0 left-0 right-0 top-0 select-none overflow-hidden h-screen w-screen max-w-full"
    >
      <div className="bg-gradient-to-t from-[#121212] via-[#1a1919b8] to-[#0000006b] w-full h-full">
        <div className="backdrop-blur-[100px] w-full h-full flex flex-row items-center justify-center tablet:block mobile:block">
          <div className="w-screen m-auto flex flex-row justify-center items-center tablet:items-start mobile:items-start">
            <FullScreenCoverImage
              activeSong={activeSong}
              className="tablet:hidden mobile:hidden"
            />
            <div className="flex flex-col h-[450px] laptop:h-[400px] mini-laptop:h-[400px] justify-between items-center px-6 py-2 tablet:mt-4 mobile:mt-4 mobile:h-screen">
              <div className="flex flex-row justify-between items-center text-white font-ProximaBold tablet:w-[400px] mobile:w-[340px] w-full tablet:mb-8 mobile:mb-8">
                <div
                  onClick={() => router.back()}
                  className="w-8 h-8 hover:bg-white hover:text-black text-gray-100 shadow flex items-center justify-center rounded-full cursor-pointer mobile:w-6 mobile:h-6"
                >
                  <i className="icon-chevron-down text-[20px] mobile:text-[20px]"></i>
                </div>
                <div className="flex flex-row items-center">
                  <h1 className="text-center uppercase mx-2 tracking-wider font-ProximaBold mini-laptop:text-base tablet:text-base mobile:text-base">
                    Now Playing
                  </h1>
                </div>
                <div className="w-8 h-8 shadow flex items-center justify-center rounded-full cursor-pointer">
                  <div className="relative">
                    <i
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDropdown(true);
                      }}
                      className="icon-more-horizontal text-[22px] text-gray-300 hover:text-white"
                    ></i>

                    {showDropdown && (
                      <div
                        ref={dropdown}
                        className="w-52 bg-[#212121] absolute rounded shadow right-2 top-10 z-30"
                      >
                        <div
                          className="border-b border-b-slate-700 rounded px-4 py-1.5 hover:bg-[#323232]"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/artist/${activeSong.artist_id}`);
                          }}
                        >
                          Go to Artist
                        </div>
                        <div
                          className="rounded px-4 py-1.5 hover:bg-[#323232]"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                              toggleModel({
                                data: true,
                                track_id: activeSong.id,
                              })
                            );
                            setShowDropdown(false);
                          }}
                        >
                          Add to Collection
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <FullScreenCoverImage
                activeSong={activeSong}
                className="hidden tablet:block mobile:block tablet:my-4 tablet:mb-6 mobile:mb-6 mobile:my-4"
              />
              <div className="flex flex-col justify-center items-center mobile:pb-14">
                <div className="mb-10 mini-laptop:w-[320px] laptop:w-[350px] desktop:w-[28rem] w-full tablet:w-[400px] mobile:w-[320px] flex flex-row justify-between items-center">
                  <div>
                    <p className="text-gray-300 font-ProximaBold cursor-pointer line-clamp-1 mobile:text-sm text-lg mini-laptop:text-base tablet:text-base">
                      {activeSong.track_name}
                    </p>
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/artist/${activeSong.artist_id}`);
                      }}
                      className="text-gray-400 text-sm mini-laptop:text-sm tablet:text-sm mobile:text-xs hover:underline cursor-pointer"
                    >
                      {activeSong.artist_name}
                    </p>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center">
                    <LikeButton track_id={activeSong.id} size={"text-[24px]"} />
                  </div>
                </div>
                <div>
                  <SeekBar
                    changeSeekBarColor={changeSeekBarColor}
                    isFullScreen={true}
                    trackProgress={trackProgress}
                    audioRef={audioRef}
                    activeSong={activeSong}
                    onScrubEnd={onScrubEnd}
                    onScrub={onScrub}
                    trackBarStyling={trackStyling}
                    isPlaying={isPlaying}
                    onPlayPause={() => dispatch(playPause(!isPlaying))}
                  />
                  <Controls
                    isFullScreen={true}
                    isShuffle={isShuffle}
                    isRepeat={isRepeat}
                    onRepeat={() => dispatch(onRepeat(!isRepeat))}
                    onShuffle={() => dispatch(onShuffle(!isShuffle))}
                    playPause={() => dispatch(playPause(!isPlaying))}
                    isPlaying={isPlaying}
                    nextSong={toNextTrack}
                    prevSong={toPrevTrack}
                  />
                </div>

                <div className="flex flex-row justify-between mt-10 w-full tablet:w-[400px] mobile:w-[320px]">
                  <VolumeControls
                    isFullScreen={true}
                    updateVolume={updateVolume}
                    volume={volume}
                  />
                  <div>
                    <Link
                      href={activeSong.src + `?filename=${activeSong.src}.mp3`}
                      download={`${activeSong.id}.mp3`}
                      target="_blank"
                    >
                      <i className="icon-download text-gray-400 text-[20px] hover:text-white cursor-pointer mx-3 mobile:text-[14px]"></i>
                    </Link>
                    <i
                      onClick={() => router.push("/queue")}
                      className="icon-queue text-gray-400 text-[18px] hover:text-white cursor-pointer ml-3 mobile:text-[14px]"
                    ></i>
                  </div>
                </div>
              </div>
              <div className="hidden mobile:block tablet:block h-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playing;