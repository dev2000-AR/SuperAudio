import React, { useState } from "react";
import AppLayout from "@/layouts/appLayout";
import axios from "axios";
import API_URL from "@/configs/apiUrl";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong } from "../../stores/player/currentAudioPlayer";
import { TrackProps } from "@/interfaces/Track";
import ListItem from "@/components/ListItem";
import { tags } from "@/interfaces/genres";
import NavBar from "@/components/backButton";
import ErrorComponent from "@/components/error";
import { capitalize } from "@/configs/utils";
import PlayControls from "@/components/PlayControls";
import GenreBanner from "@/components/GenreBanner";

function GenrePage({
  tracks,
  tag,
  success,
}: {
  tag: any;
  success: boolean;
  tracks: TrackProps[];
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setScrolling] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const onScroll = (e: any) => {
    setScrolling(true);
    setScrollPosition(e.target.scrollTop);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (tracks.length > 0) {
      dispatch(setActiveSong({ tracks: tracks, index: 0 }));
    }
  };

  const handleShuffle = () => {
    if (tracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      dispatch(setActiveSong({ tracks: tracks, index: randomIndex }));
      setIsPlaying(true);
    }
  };

  setTimeout(() => {
    setScrolling(false);
  }, 100);

  if (!success) {
    return (
      <AppLayout>
        <ErrorComponent />
      </AppLayout>
    );
  }

return (
    <AppLayout
      title={capitalize(tag.tag)}
      color={"#" + tag.color.toString(16)}
      onScroll={onScroll}
    >
      <div className="bg-[#000000]">
        <NavBar
          condition={scrollPosition >= 300}
          color={"#" + tag.color.toString(16)}
          title={tag.tag}
        />
        
        {/* Genre Banner with SVG */}
        <GenreBanner
          genre={tag.tag}
          coverImage={tag.coverImage}
          color={"#" + tag.color.toString(16)}
          isPlaying={isPlaying}
        />

        <div className="px-10 pt-8 mobile:pt-6 mini-laptop:px-6 tablet:px-6 mobile:px-4 bg-[#121212]">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[70px] laptop:text-[60px] mini-laptop:text-[60px] tablet:text-[45px] mobile:text-[40px] capitalize font-ProximaBold text-white">
              {tag.tag}
            </h1>
           
          </div>
          <h4 className="font-ProximaBold pb-6 text-gray-400">
            Featured Albums & Tracks
          </h4>
        </div>

        <div className="px-8 mini-laptop:px-6 tablet:px-6 mobile:px-4 bg-[#121212]">
          {tracks.map((track: TrackProps, i: number) => {
            return (
              <ListItem
                isScrolling={isScrolling}
                onTap={() => {
                  dispatch(setActiveSong({ tracks: tracks, index: i }));
                  setIsPlaying(true);
                }}
                key={track.id}
                track={track}
                showNumber={i + 1}
              />
            );
          })}
        </div>
        <div className="pb-32 bg-[#121212]"></div>
      </div>
    </AppLayout>
  );
}

export async function getServerSideProps(context: any) {
  try {
    // Obtener tracks según el tag
    const { data } = await axios.get(
      API_URL + "/songs/tag/" + context.params.id
    );

    // Obtener el tag
    const tag = tags.find((tag: any) => tag.tag.toLowerCase() === context.params.id.toLowerCase());

    return {
      props: {
        success: true,
        tag: tag,
        tracks: data.data,
      },
    };
  } catch (e) {
    return {
      props: {
        success: false,
      },
    };
  }
}

export default GenrePage;