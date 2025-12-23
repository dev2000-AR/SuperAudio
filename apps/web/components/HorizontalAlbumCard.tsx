import React from "react";
import CustomImage from "./CustomImage";
import { Album } from "@/interfaces/Albumv2";

function HorizontalAlbumCard({
  album,
  onClick,
}: {
  album: Album;
  onClick: () => void;
}) {
  // Función para generar una URL de imagen basada en el creid
  const getAlbumImageUrl = (artist_id: string,creid: string) => {
    return `https://dig0ubfhli3b0.cloudfront.net/cdn1/music/${artist_id}/${creid}/front.jpg`; // Ajusta esta URL según tu configuración
  };

  return (
    <div key={album.idcre} className="mr-4 cursor-pointer" onClick={onClick}>
      <div
        className="p-4 bg-gradient-to-t from-[#2c2a2a4a] to-[#2c2a2ac7] hover:bg-[#4340409d]
           tablet:hover:bg-transparent mobile:hover:bg-transparent
           rounded-md h-full mini-laptop:p-3 tablet:p-0 tablet:from-transparent tablet:to-transparent
           mobile:from-transparent mobile:to-transparent mobile:p-0"
      >
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
          }}
          className="w-[160px] h-[160px] relative rounded-full 
          mini-laptop:w-[140px] mini-laptop:h-[140px] 
          tablet:w-[130px] tablet:h-[130px] mobile:w-[100px] mobile:h-[100px]"
        >
          <CustomImage
            src={getAlbumImageUrl(album.artist_id,album.creid)}
            className="rounded-full"
          />
        </div>
        <p className="line-clamp-2 mobile:text-center tablet:text-center mt-4 font-ProximaBold text-base mobile:text-sm tablet:text-sm">
          {album.titulo}
        </p>
        <p
          className="line-clamp-2 mt-0.5 text-sm text-gray-400 
            font-ProximaRegular mobile:text-xs tablet:text-xs
            mobile:text-center tablet:text-center"
        >
          {album.cdtracks} pista{album.cdtracks !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}

export default HorizontalAlbumCard;