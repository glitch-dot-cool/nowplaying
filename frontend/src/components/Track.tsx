import { memo } from "react";
import { updateCurrentTrack } from "../utils/api";

interface TrackProps {
  title: string;
  artist: string;
  currentTitle: string;
  currentArtist: string;
}

const getIsCurrentlyPlaying = ({
  title,
  artist,
  currentTitle,
  currentArtist,
}: TrackProps) => {
  return title === currentTitle && artist === currentArtist;
};

export const Track = memo((props: TrackProps) => {
  const isCurrentlyPlaying = getIsCurrentlyPlaying(props);
  const isPlayingClass = isCurrentlyPlaying ? "current-track" : "";

  return (
    <button
      onClick={() =>
        updateCurrentTrack({ title: props.title, artist: props.artist })
      }
      className={`track ${isPlayingClass}`}
    >
      {props.artist} - {props.title}
    </button>
  );
});
