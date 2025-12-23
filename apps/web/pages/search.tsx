import React, { useState, useEffect, useCallback } from "react";
import AppLayout from "@/layouts/appLayout";
import { artistIndex, trackIndex } from "../configs/algolia";
import { toTrackProps, TrackProps } from "../interfaces/algo/Trackalgo";
import { Artists, tracksToArtists } from "../interfaces/algo/artistalgo";
import { removeDuplicate } from "../configs/utils";
import CustomImageartistsearch from "../components/CustomImageartistsearch";
import CustomImage from "../components/CustomImage";
import ListItemAlgolia from "../components/ListItemAlgolia";
import ListItem from "../components/ListItem";
import { useSelector, useDispatch } from "react-redux";
import { tags } from "../interfaces/genres";
import { setActiveSong, playPause } from "@/stores/player/currentAudioPlayer";
import type { RootState } from "@/stores/store";
import Link from "next/link";
import HorizontalTracksList from "../components/HorizontalTracksList";
import HorizontalArtistsListAlgolia from "../components/HorizontalArtistsList";
import PlayPauseButton from "../components/AudioPlayer/PlayPauseButton";

interface AlgoliaHit {
  readonly objectID: string;
  avatar?: string;
  display_name?: string;
  track_name?: string;
  artista_nombre?: string;
}

const TrackSkeleton = () => (
  <div className="mr-4 cursor-grab animate-pulse">
    <div className="p-4 bg-gradient-to-t from-[#2c2a2a4a] to-[#2c2a2ac7] rounded-md h-full mini-laptop:p-3 tablet:p-0 tablet:from-transparent tablet:to-transparent mobile:from-transparent mobile:to-transparent mobile:p-0">
      <div className="w-[160px] h-[160px] bg-gray-700 rounded-md mini-laptop:w-[140px] mini-laptop:h-[140px] tablet:w-[130px] tablet:h-[130px] mobile:w-[100px] mobile:h-[100px]" />
      <div className="mt-3 h-5 bg-gray-700 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

const TrackSkeletonList = () => (
  <div className="tracks-section mt-8">
    <h1 className="section-title text-xl text-gray-300">Tracks</h1>
    <div className="flex flex-row indiana-scroll-container indiana-scroll-container--hide-scrollbars">
      {[...Array(5)].map((_, i) => (
        <TrackSkeleton key={i} />
      ))}
    </div>
  </div>
);

const Spinner = () => (
  <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)] space-y-4">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300"></div>
    <p className="text-gray-400 font-ProximaRegular">Buscando...</p>
  </div>
);

const Search = () => {
  const [searchResult, setSearchResult] = useState<TrackProps[]>([]);
  const [artists, setArtists] = useState<Artists[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const searchAlgolia = useCallback(async (query: string) => {
    if (!query) {
      setSearchResult([]);
      setArtists([]);
      return;
    }
    setIsLoading(true);

    try {
      const [artistData, trackData] = await Promise.all([
        artistIndex.search<AlgoliaHit>(query),
        trackIndex.search<AlgoliaHit>(query),
      ]);

      const validTracks = trackData.hits.filter(
        (track) => track.track_name && track.artista_nombre
      );

      setArtists(removeDuplicate(tracksToArtists(artistData.hits)));
      setSearchResult(toTrackProps(validTracks as AlgoliaHit[]));
    } catch (error) {
      console.error("Error searching Algolia:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const highlightText = (text: string, query: string) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<span class='bg-yellow-300'>$1</span>");
  };

  return (
    <AppLayout title="Search" color="#121212">
      <div className="search-container w-full p-4">
        <div className="search-bar flex bg-white rounded-3xl px-4 py-2 items-center">
          <i className="icon-search text-gray-500"></i>
          <input
            onChange={(e) => searchAlgolia(e.target.value)}
            type="text"
            className="input-search w-full px-2 py-2 text-black border-none outline-none rounded-3xl"
            placeholder="Buscar Música, Artistas, Generos..."
          />
        </div>
      </div>

      {isLoading ? (
        <div className="search-results px-8">
          <TrackSkeletonList />
        </div>
      ) : (
        <div className="search-results px-8">
          {searchResult.length > 0 && (
            <div className="tracks-section mt-4">
              <h1 className="section-title text-xl text-gray-300"></h1>
              <div className="track-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {searchResult.slice(0, 5).map((track, i) => (
                  <ListItem
                    key={track.id}
                    track={track}
                    onTap={() =>
                      dispatch(
                        setActiveSong({
                          tracks: searchResult,
                          index: searchResult.indexOf(track),
                        })
                      )
                    }
                    className="track-item bg-gray-800 p-4 rounded-xl"
                  />
                ))}
              </div>
            </div>
          )}

          {artists.length > 0 && (
            <div className="artists-section mt-8 relative">
              <h1 className="section-title text-xl text-gray-300">Artistas</h1>
              <HorizontalArtistsListAlgolia artists={artists} />
            </div>
          )}

          {searchResult.length > 10 && (
            <div className="more-tracks-section mt-8">
              <h1 className="section-title text-xl text-gray-300">Más...</h1>
              <div className="track-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {searchResult.slice(6, 20).map((track, i) => (
                  <ListItem
                    key={track.id}
                    track={track}
                    onTap={() =>
                      dispatch(
                        setActiveSong({
                          tracks: searchResult,
                          index: searchResult.indexOf(track),
                        })
                      )
                    }
                    className="track-item bg-gray-800 p-4 rounded-xl"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <div className="pt-28 mobile:pt-20 tablet:pt-20"></div>
        <h1 className="mobile:text-lg text-xl font-ProximaRegular px-8 mini-laptop:px-4 mobile:px-4 text-gray-400">
          Explora por géneros
        </h1>
        <div className="grid grid-cols-5 laptop:grid-cols-4 mini-laptop:grid-cols-3 mini-laptop:gap-4 laptop:gap-4 gap-6 px-8 laptop:px-6 mini-laptop:px-4 pt-4 select-none tablet:grid-cols-2 mobile:grid-cols-2 mobile:px-4 mobile:gap-4">
          {tags.map((tag: any) => (
            <Link href={`/genre/${tag.tag}`} key={tag.tag}>
              <div
                className="hover:scale-105 transition-all cursor-pointer relative h-44 tablet:h-40 mobile:h-28 overflow-hidden rounded-md"
                style={{ backgroundColor: "#" + tag.color.toString(16) }}
              >
                <CustomImage
                  src={tag.coverImage}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
                  <p className="font-ProximaBold text-xl text-center text-white p-4 capitalize">
                    {tag.tag}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-32"></div>
    </AppLayout>
  );
};

const TopResult = ({ object, onTap }: any) => {
  const [showPlayButton, setPlayButton] = useState(false);
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);

  if (object.type == "track") {
    return (
      <div
        onClick={onTap}
        onMouseEnter={() => setPlayButton(true)}
        onMouseLeave={() => setPlayButton(false)}
        className="mobile:hidden tablet:hidden h-[250px] flex flex-col bg-[#5f5d5d2f] relative hover:bg-[#5f5d5d72] rounded-md tablet:h-full mobile:h-full"
      >
        <div>
          <PlayPauseButton
            condition={activeSong.id === object.id || showPlayButton}
            isPlaying={activeSong.id === object.id && isPlaying}
            isHover={showPlayButton}
          />
          <div className="p-6 tablet:flex mobile:flex">
            <div
              className="rounded-md relative w-24 h-24"
              style={{
                backgroundColor: object.cover_image.color,
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <CustomImage
                src={
                  object.cover_image.url +
                  "&auto=format&fit=crop&w=400&q=50&h=400"
                }
                className="rounded-md"
              />
            </div>
            <div className="tablet:mx-4 mobile:mx-4">
              <p className="mt-4 text-2xl font-ProximaBold line-clamp-1">
                {object.track_name}
              </p>
              <p>{object.artist_name}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Link href={`/artist/${object.artist_id}`}>
        <div className="mobile:hidden tablet:hidden h-[250px] flex flex-col p-6 bg-[#5f5d5d2f] hover:bg-[#5f5d5d72] rounded-md tablet:h-full mobile:h-full">
          <div
            className="rounded-full relative w-24 h-24"
            style={{
              backgroundColor: object.avatar.color,
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
            }}
          >
            <CustomImage src={object.avatar.url} className="rounded-full" />
          </div>
          <p className="mt-4 text-2xl font-ProximaBold line-clamp-1">
            {object.artist_name}
          </p>
          <p>Artist</p>
        </div>
      </Link>
    );
  }
};

export default Search;