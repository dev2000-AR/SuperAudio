import React from "react";
import { TrackProps } from "@/interfaces/Track";
import CustomImage from "./CustomImage";
import { shadeColor } from "@/configs/utils";

interface FullScreenCoverImageProps {
  activeSong: TrackProps;
  className?: string;
}

const FullScreenCoverImage: React.FC<FullScreenCoverImageProps> = ({ activeSong, className }) => {
  return (
    <div
      style={{
        backgroundColor: shadeColor(activeSong.cover_image.color, -40),
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
      className={
        `w-[450px] h-[450px] min-w-[450px]
        relative mx-10 mini-laptop:mx-4
        laptop:w-[400px] laptop:h-[400px] laptop:min-w-[400px]
        tablet:w-[400px] tablet:h-[400px] tablet:min-w-[400px] tablet:min-h-[400px]
        mobile:w-[320px] mobile:h-[320px] mobile:min-w-[320px] mobile:min-h-[320px]
        mini-laptop:w-[370px] mini-laptop:h-[370px] 
        mini-laptop:min-w-[370px] rounded-md ` + className
      }
    >
      <CustomImage
        src={
          activeSong.cover_image.url + "&auto=format&fit=crop&w=800&q=80&h=800"
        }
        className="rounded-md shadow-2xl"
      />
    </div>
  );
};

export default FullScreenCoverImage as any;