import React from 'react';
import { useDispatch } from 'react-redux';
import { playPause } from '@/stores/player/currentAudioPlayer';

interface PlayPauseButtonProps {
  condition: boolean;
  isPlaying?: boolean;
  isHover?: boolean;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ condition, isPlaying, isHover }) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        dispatch(playPause(!isPlaying));
      }}
      className={`absolute z-10 right-2 bottom-2 p-3 rounded-full bg-green-500 hover:bg-green-400 
        transition-all duration-200 ${isHover ? 'opacity-100' : condition ? 'opacity-100' : 'opacity-0'}`}
    >
      {isPlaying && condition ? (
        <i className="icon-pause text-black text-xl" />
      ) : (
        <i className="icon-play text-black text-xl" />
      )}
    </button>
  );
};

export default PlayPauseButton;