import React, { useState } from "react";
import AppLayout from "@/layouts/appLayout";
import axios from "axios";
import API_URL from "@/configs/apiUrl";
import CustomImage from "@/components/CustomImage";
import { Artists } from "@/interfaces/artist";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "@/stores/player/currentAudioPlayer";
import { TrackProps } from "@/interfaces/Track";
import ListItem from "@/components/ListItem";
import HorizontalTracksList from "@/components/HorizontalTracksList";
import NavBar from "@/components/backButton";
import ErrorComponent from "@/components/error";

function ArtistProfile({
  success,
  data,
  tracks,
  counts,
}: {
  data: Artists;
  success: boolean;
  tracks: TrackProps[];
  counts: number;
}) {
  const artist = data;
  const router = useRouter();
  const dispatch = useDispatch();
  const { isPlaying, activeSong, playingPlaylist } = useSelector(
    (state: any) => state.player
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setScrolling] = useState(false);

  const onScroll = (e: any) => {
    setScrolling(true);
    setScrollPosition(e.target.scrollTop);
    setTimeout(() => setScrolling(false), 100);
  };

  if (!success) {
    return (
      <AppLayout>
        <ErrorComponent />
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title={data.display_name}
      color={artist.avatar.color}
      onScroll={onScroll}
    >
      {/* NavBar */}
      <NavBar
        condition={scrollPosition >= 300}
        className="navbar-class"
        title={artist.display_name}
      />

      {/* Artist Header */}
      <div className="relative w-full h-[400px] mobile:h-[350px] bg-shaded-avatar">
        <div className="flex flex-col justify-end absolute w-full h-full bg-overlay">
          <div className="content-container">
            <div className="flex items-center">
              <i className="icon-verified mr-2 text-blue-300"></i>
              <p>@{artist.display_name.replaceAll(" ", "").toLowerCase()}</p>
            </div>
            <h1 className="title-large">{artist.display_name}</h1>
            <p>{counts.toLocaleString()} monthly listeners</p>
          </div>
        </div>
        <CustomImage className="artist-avatar" src={artist.avatar.url} />
      </div>

      {/* Main Content */}
      <div className="gradient-container">
        <div className="gradient-inner">
          {/* Popular Tracks */}
          <div className="pt-6">
            <div className="flex justify-between items-center">
              <h1 className="section-title">Popular</h1>
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
                className="play-button"
              >
                {activeSong?.artist_id !== artist.id || !isPlaying ? (
                  <i className="icon-play text-[20px] ml-1 text-black" />
                ) : (
                  <i className="icon-pause text-[20px] text-black" />
                )}
              </div>
            </div>

            <div className="track-list">
              {tracks.slice(0, 5).map((e: TrackProps, i: number) => (
                <ListItem
                  isScrolling={isScrolling}
                  key={e.id}
                  track={e}
                  showNumber={i + 1}
                  onTap={() => {
                    dispatch(
                      setActiveSong({
                        tracks: tracks,
                        index: tracks.indexOf(e),
                        playlist: data.id,
                      })
                    );
                  }}
                />
              ))}
            </div>
          </div>

          {/* Older Releases */}
          <div className="pt-6">
            <h1 className="section-title pb-6">Older Releases</h1>
          </div>
        </div>

        {/* Horizontal Tracks List */}
        <HorizontalTracksList tracks={tracks.slice(5, 15)} />

        {/* All Tracks */}
        <div className="all-tracks-section">
          <h1 className="section-title">All</h1>
          <div className="all-tracks-list">
            {tracks.map((e: TrackProps, i: number) => (
              <ListItem
                isScrolling={isScrolling}
                key={e.id}
                track={e}
                showNumber={i + 1}
                onTap={() => {
                  dispatch(
                    setActiveSong({
                      tracks: tracks,
                      index: tracks.indexOf(e),
                      playlist: data.id,
                    })
                  );
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="pb-32"></div>
    </AppLayout>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const { data } = await axios.get(API_URL + "/artists/" + context.params.id);
    const tracks = await axios.get(
      API_URL + "/songs/artist/" + context.params.id
    );
    return {
      props: {
        success: true,
        data: data.data[0],
        tracks: tracks.data.data,
        counts: Math.floor(Math.random() * (500000000 - 20000000 + 1)) + 20000000,
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

export default ArtistProfile;