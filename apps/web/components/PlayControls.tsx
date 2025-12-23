import React from "react";
import { useDispatch } from "react-redux";
import { playPause } from "@/stores/player/currentAudioPlayer";

interface PlayControlsProps {
  isPlaying: boolean;
  onShuffle: () => void;
}

const PlayControls: React.FC<PlayControlsProps> = ({
  isPlaying,
  onShuffle,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => dispatch(playPause(!isPlaying))}
        className="p-4 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
      >
        {isPlaying ? (
          <i className="icon-pause text-white text-xl" aria-hidden="true" />
        ) : (
          <i className="icon-play text-white text-xl" aria-hidden="true" />
        )}
      </button>
      <button
        onClick={onShuffle}
        className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        <i className="icon-random text-white text-xl" aria-hidden="true" />
      </button>
    </div>
  );
};

export default PlayControls;