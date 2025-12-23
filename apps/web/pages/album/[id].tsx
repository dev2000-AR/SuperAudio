import React from "react";
import API_URL from "@/configs/apiUrl";
import axios from "axios";
import AppLayout from "@/layouts/appLayout";
import { TrackProps } from "@/interfaces/Track";
import ListItem from "@/components/ListItem";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import {
  playPause,
  setActiveSong,
} from "@/stores/player/currentAudioPlayer";
import ErrorComponent from "@/components/error";
import { shadeColor } from "@/configs/utils";
import CustomImage from "@/components/CustomImage";
import NavBar from "@/components/backButton";
import { Album } from "@/interfaces/Album"; // Import Album interface

function AlbumPage({
  album,
  tracks,
  success,
  artist, // Add artist as prop
}: {
  success: boolean;
  album: Album;
  tracks: TrackProps[];
  artist: { id: number; username: string; name: string }; // Define artist prop type
}) {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { isPlaying, playingPlaylist } = useSelector(
    (state: any) => state.player
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setScrolling] = useState(false);
  const dropdown = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const onScroll = (e: any) => {
    setScrolling(true);
    setScrollPosition(e.target.scrollTop);
  };

  useEffect(() => {
    if (isScrolling) setShowDropdown(false);
  }, [isScrolling]);

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

  // Ensure that cover image comes from the first track if available
  const coverImage = tracks[0] && tracks[0].cover_image ? tracks[0].cover_image.url : album.cover_image;


  return (
    <AppLayout title={album.titulo} onScroll={onScroll}>
      <NavBar
        condition={scrollPosition >= 300}
        title={album.titulo}
      />

      <div
        style={{
          backgroundColor: "#121212",
          position: "relative", 
        }}
        className="h-[360px] pt-16 px-8 bg-gradient-to-t from-[#12121250] flex items-center mobile:flex-col mobile:h-full tablet:flex-col tablet:h-full mobile:pt-12 tablet:pt-14 tablet:text-center tablet:pb-3 mobile:pb-3 mobile:text-center"
      >
        <div
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
          className="w-full h-full"
        ></div>
        <h1 className="text-[30px] font-ProximaBold leading-[5rem] mobile:block tablet:block hidden">
          {album.titulo}
        </h1>
        <div
          className="rounded mr-6 tablet:mr-0 w-[230px] min-w-[230px] h-[230px] mobile:mr-0 relative"
        >
          <CustomImage src={coverImage} />
        </div>
        <div>
          <p className="uppercase font-ProximaBold text-sm tablet:hidden mobile:hidden">
            Album
          </p>
          <h1
            className="text-[70px] font-ProximaBold leading-[5rem] mini-laptop:text-[65px] tablet:hidden mobile:hidden line-clamp-2"
          >
            {album.titulo}
          </h1>
          <p className="font-ProximaBold text-sm mt-6 tablet:mt-4 opacity-70">
            {tracks.length} Tracks
          </p>
          {/* Display Artist Info with Link */}
          <p className="font-ProximaBold text-sm mt-2 opacity-70">
            <a
              onClick={() => router.push(`/artist/${artist.id}`)} // Redirect to artist page
              className="hover:underline cursor-pointer"
            >
              {artist.name}
            </a>
          </p>
        </div>
      </div>

      <div
        className="pt-6 px-6 tablet:px-6 mobile:px-5 min-h-[1000px]"
        style={{
          background: `linear-gradient(180deg, #121212 0%, rgba(18,18,18,1) 15%)`,
        }}
      >
        <div className="px-6 mobile:px-1">
          <div className="w-full flex items-center mb-2">
            <div
              onClick={() => {
                if (playingPlaylist !== album.idcre) {
                  dispatch(
                    setActiveSong({
                      tracks: tracks,
                      index: 0,
                      playlist: album.idcre,
                      artist: artist, // Pass artist data
                    })
                  );
                } else {
                  dispatch(playPause(!isPlaying));
                }
              }}
              className="bg-[#2bb540] rounded-full vhid cursor-pointer hover:scale-110
                     w-[45px] h-[45px] flex justify-center items-center"
            >
              {playingPlaylist !== album.idcre ? (
                <i className="icon-play text-[20px] ml-1 text-black " />
              ) : !isPlaying ? (
                <i className="icon-play text-[20px] ml-1 text-black" />
              ) : (
                <i className="icon-pause text-[20px] text-black" />
              )}
            </div>
            <div className="relative vhid">
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
                className="cursor-pointer mx-4 icon-more-horizontal text-[30px]
               text-slate-400 hover:text-white "
              ></i>
              {showDropdown && (
                <div
                  ref={dropdown}
                  className="w-52 bg-[#212121] vhid absolute  rounded shadow 
             left-2 top-10 z-40"
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(false);
                    }}
                    className="px-4 vhid rounded py-1.5 hover:bg-[#323232] border-b border-b-[#3e3e3e]"
                  >
                    Opción 1
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(false);
                    }}
                    className="px-4 rounded py-1.5 hover:bg-[#323232] border-b border-b-[#3e3e3e]"
                  >
                    Opción 2
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pt-4">
          {tracks.map((e: TrackProps, i: number) => (
            <ListItem
              isScrolling={isScrolling}
              key={e.id}
              track={e}
              showNumber={i + 1}
              collection={album.idcre}
              onTap={() => {
                dispatch(
                  setActiveSong({
                    tracks: tracks,
                    index: tracks.indexOf(e),
                    playlist: album.idcre,
                    artist: artist, // Pass artist data
                  })
                );
              }}
            />
          ))}
        </div>
      </div>

      <div className="pb-32"></div>
    </AppLayout>
  );
}

export async function getServerSideProps(context: any) {
  const token = context.req.cookies.user;

  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  try {
    const token = JSON.parse(context.req.cookies.user).token;

    // Obtener información del álbum
    const { data } = await axios.get(
      `https://datab.superaudio.online/api/albums/${context.params.id}`,
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    const album = data.data.album;

    // Obtener los tracks del álbum
    const tracks = data.data.tracks.map((track: any) => ({
      ...track,
      id: track.id || 0,
      track_name: track.track_name || "",
      src: track.src || "",
      cover_image: JSON.parse(track.cover_image || "{}"),
    }));

    // Obtener información del artista
    const artist = data.data.artist; // Add artist data

    return {
      props: {
        success: true,
        album: album,
        tracks: tracks,
        artist: artist, // Pass artist data to the page
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

export default AlbumPage;
