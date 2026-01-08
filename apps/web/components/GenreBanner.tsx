import React from "react";
import Image from "next/image";

interface GenreBannerProps {
  coverImage: string;
  color: string;
  genre: string;
  isPlaying: boolean;
}

const GenreBanner: React.FC<GenreBannerProps> = ({
  coverImage,
  color,
  genre,
  isPlaying
}) => {
  return (
    <div
      className="w-full h-[300px] relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#121212',
        backgroundImage: `linear-gradient(to bottom, ${color}40, #121212)`
      }}
    >
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className={`
          transform transition-all duration-700 ease-in-out
          ${isPlaying ? 'scale-110 animate-pulse' : 'scale-100'}
        `}>
          <Image
            src={coverImage}
            alt={`${genre} genre`}
            width={200}
            height={200}
            className={`
              opacity-60 transition-all duration-500
              ${isPlaying ? 'animate-floating' : ''}
            `}
          />
        </div>
      </div>
    </div>
  );
};

export default GenreBanner;