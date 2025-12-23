import React from "react";
import AppLayout from "@/layouts/appLayout";
import axios from "axios";
import API_URL from "@/configs/apiUrl";
import CustomImage from "@/components/CustomImage";
import { Artists } from "@/interfaces/artist";
import { 
    AlbumDetails,
    AlbumTrack,
    PlayerState,
    getAlbumImageUrl
} from '@/interfaces/AlbumsProfile';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  playPause,
  setActiveSong,
} from "../../stores/player/currentAudioPlayer";
import { TrackProps } from "@/interfaces/Track";
import ListItem from "@/components/ListItem";
import HorizontalAlbumList from "@/components/HorizontalAlbumList";
import { shadeColor } from "@/configs/utils";
import { useState } from "react";
import NavBar from "@/components/backButton";
import ErrorComponent from "@/components/error";

interface ArtistProfileProps {
  success: boolean;
  data: Artists | null;
  album: AlbumDetails[];
  tracks: TrackProps[];
  counts: number;
}

function ArtistProfile({
  success,
  data,
  album = [],
  tracks = [],
  counts = 0,
}: ArtistProfileProps) {
  const artist = data;
  const router = useRouter();
  const dispatch = useDispatch();
  const { isPlaying, activeSong, playingPlaylist } = useSelector<any, PlayerState>(
    (state) => state.player
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setScrolling] = useState(false);

  const onScroll = (e: React.UIEvent<HTMLElement>) => {
    setScrolling(true);
    setScrollPosition(e.currentTarget.scrollTop);
  };

  setTimeout(() => {
    setScrolling(false);
  }, 100);

  if (!success || !data) {
    return (
      <AppLayout>
        <ErrorComponent />
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title={artist?.display_name || ""}
      color={artist?.avatar?.color || "#000000"}
      onScroll={onScroll}
    >
      <div>
        <NavBar
          condition={scrollPosition >= 300}
          color={artist?.avatar?.color || "#000000"}
          title={artist?.display_name || ""}
        />
      </div>

      <div
        className="relative w-full h-[400px] mobile:h-[350px] overflow-hidden"
        style={{ backgroundColor: shadeColor(artist?.avatar?.color || "#000000", -40) }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${artist?.avatar?.url || ""})`,
            filter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backdropFilter: "blur(8px)",
          }}
        />

        <div className="flex flex-col justify-end absolute w-full h-full bg-black bg-opacity-40 z-10">
          <div className="px-10 pb-10 mobile:pb-6 tablet:pb-6 mobile:px-4 tablet:px-6 mini-laptop:px-7">
            <div className="flex">
              <i className="icon-verified mr-2 text-blue-300" />
              <p>@{artist?.display_name.replaceAll(" ", "").toLowerCase()}</p>
            </div>
            <h1 className="text-[70px] font-ProximaBold laptop:text-[60px] mini-laptop:text-[60px] tablet:text-[45px] mobile:text-[40px]">
              {artist?.display_name}
            </h1>
          </div>
        </div>

        <div className="newprofileimg absolute inset-0 flex items-center justify-center z-20">
          <div className="newprofilimgcenter w-40 h-40 rounded-full overflow-hidden border-4 border-white">
            <CustomImage
              src={artist?.avatar?.url || ""}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="gradient-bg">
        <div className="h-full bg-gradient-to-t from-[#121212] via-[#121212f0] to-[#12121298] w-full transition-colors px-8 pt-6 mini-laptop:px-6 tablet:px-6 mobile:px-5">
          <div className="pt-6">
            <div className="w-full flex justify-between">
              <h1 className="text-2xl font-ProximaBold">Popular</h1>
              <div
                onClick={() => {
                  if (playingPlaylist !== data.id) {
                    dispatch(
                      setActiveSong({
                        tracks: tracks,
                        index: 0,
                        playlist: data.id,
                      })
                    );
                  } else {
                    dispatch(playPause(!isPlaying));
                  }
                }}
                className="bg-[#2bb540] rounded-full cursor-pointer hover:scale-110 w-[45px] h-[45px] flex justify-center items-center"
              >
                {activeSong?.artist_id !== String(artist?.id) ? (
                  <i className="icon-play text-[20px] ml-1 text-black" />
                ) : !isPlaying ? (
                  <i className="icon-play text-[20px] ml-1 text-black" />
                ) : (
                  <i className="icon-pause text-[20px] text-black" />
                )}
              </div>
            </div>

            <div className="max-w-[700px] pt-4">
              {tracks.slice(0, 5).map((track: TrackProps, i: number) => (
                <ListItem
                  isScrolling={isScrolling}
                  key={track.id}
                  track={track}
                  showNumber={i + 1}
                  onTap={() => {
                    dispatch(
                      setActiveSong({
                        tracks: tracks,
                        index: tracks.indexOf(track),
                        playlist: data.id,
                      })
                    );
                  }}
                />
              ))}
            </div>
          </div>
          <div className="pt-6">
            <h1 className="text-2xl font-ProximaBold pb-6">Álbumes</h1>
          </div>
        </div>

        {Array.isArray(album) && album.length > 0 && (
          <div className="pt-6">
            <HorizontalAlbumList album={album} />
          </div>
        )}

        <div className="pt-6 px-8 tablet:px-6 mobile:px-5">
          <h1 className="text-2xl font-ProximaBold">All</h1>
          <div className="pt-4">
            {tracks.map((track: TrackProps, i: number) => (
              <ListItem
                isScrolling={isScrolling}
                key={track.id}
                track={track}
                showNumber={i + 1}
                onTap={() => {
                  dispatch(
                    setActiveSong({
                      tracks: tracks,
                      index: tracks.indexOf(track),
                      playlist: data.id,
                    })
                  );
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="pb-32" />
    </AppLayout>
  );
}

export async function getServerSideProps(context: any) {
  const defaultProps = {
    props: {
      success: false,
      data: null,
      album: [],
      tracks: [],
      counts: 0,
    }
  };

  try {
    const [artistResponse, albumResponse, tracksResponse] = await Promise.all([
      axios.get(`${API_URL}/artists/${context.params.id}`),
      axios.get(`${API_URL}/albums/artist/${context.params.id}`),
      axios.get(`${API_URL}/songs/artist/${context.params.id}`)
    ]);

    if (!artistResponse.data?.data?.[0]) {
      return defaultProps;
    }

    return {
      props: {
        success: true,
        data: artistResponse.data.data[0],
        album: albumResponse.data?.data || [],
        tracks: tracksResponse.data?.data || [],
        counts: getRndInteger(20000000, 500000000),
      },
    };
  } catch (e) {
    console.error('Error fetching artist data:', e);
    return defaultProps;
  }
}

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default ArtistProfile;