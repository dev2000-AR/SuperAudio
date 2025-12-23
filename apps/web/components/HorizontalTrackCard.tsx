import React from "react";
import { playPause } from "../stores/player/currentAudioPlayer";
import CustomImage from "./CustomImage";
import { TrackProps } from "../interfaces/Track";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { shadeColor } from "../configs/utils";

function HorizontalTrackCard({
  track,
  onClick,
}: {
  track: TrackProps;
  onClick: () => void;
}) {
  const [showPlayButton, setPlayButton] = useState(false);
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);

  return (
    <div
      key={track.id}
      className="mr-4 cursor-grab select-none"
      onClick={onClick}
      onMouseEnter={() => setPlayButton(true)}
      onMouseLeave={() => setPlayButton(false)}
    >
      <div
        className="p-4 bg-gradient-to-t from-[#2c2a2a4a] to-[#2c2a2ac7] hover:bg-[#4340409d]
           tablet:hover:bg-transparent mobile:hover:bg-transparent
           rounded-md mini-laptop:p-3 tablet:p-0 tablet:from-transparent tablet:to-transparent
           mobile:from-transparent mobile:to-transparent mobile:p-0
           flex flex-col items-center mobile:items-start
           "
      >
        {/* Contenedor de imagen con tamaño fijo */}
        <div
          style={{
            background: shadeColor(track.cover_image.color, -40),
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
          }}
          className="w-[160px] h-[160px] relative rounded-md shrink-0
          mini-laptop:w-[140px] mini-laptop:h-[140px] 
          tablet:w-[130px] tablet:h-[130px] mobile:w-[100px] mobile:h-[100px]"
        >
          {/* Botón de reproducción */}
          {activeSong && activeSong.id === track.id ? (
            <PlayPauseButton
              condition={activeSong.id === track.id}
              isPlaying={isPlaying}
            />
          ) : showPlayButton ? (
            <PlayPauseButton
              condition={showPlayButton}
              isHover
              isPlaying={isPlaying}
            />
          ) : null}

          <CustomImage
            src={track.cover_image.url}
            className="rounded-md w-full h-full object-cover"
          />
        </div>

        {/* Contenedor de texto con ancho fijo y ellipsis */}
        <div className="w-[160px] mini-laptop:w-[140px] tablet:w-[130px] mobile:w-[100px] mt-3 px-1">
          {/* Título de la canción */}
          <div className="overflow-hidden">
            <p className="text-base mobile:text-xs tablet:text-sm font-medium
              whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {track.track_name}
            </p>
          </div>

          {/* Nombre del artista */}
          <div className="overflow-hidden mt-0.5">
            <p className="text-sm text-gray-400 font-ProximaRegular 
              mobile:text-[10px] tablet:text-xs
              whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {track.artist_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlayPauseButton({
  condition,
  isPlaying,
  isHover,
}: {
  condition: boolean;
  isPlaying: boolean;
  isHover?: boolean;
}) {
  const dispatch = useDispatch();

  return (
    <div>
      {condition && (
        <div 
          className="absolute w-full h-full bg-black bg-opacity-10 z-10 
            flex justify-end items-end rounded-md"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              dispatch(playPause(!isPlaying));
            }}
            className="mx-2 my-3 bg-[#2bb540] rounded-full cursor-pointer 
              hover:scale-110 transition-transform duration-200
              w-[45px] h-[45px] flex justify-center items-center 
              mobile:w-[30px] mobile:h-[30px] mobile:mx-1 mobile:my-2"
          >
            {isHover ? (
              <i className="icon-play text-[20px] ml-1 text-black mobile:text-[14px] mobile:ml-0.5" />
            ) : !isPlaying ? (
              <i className="icon-play text-[20px] ml-1 text-black mobile:text-[14px] mobile:ml-0.5" />
            ) : (
              <i className="icon-pause text-[20px] text-black mobile:text-[14px]" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HorizontalTrackCard;