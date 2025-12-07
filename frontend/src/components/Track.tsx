import type { Track as TrackType } from "../types";
import { updateCurrentTrack } from "../utils/api";

interface TrackProps {
  track: TrackType;
  currentTrack: TrackType;
}

export const Track = ({ track, currentTrack }: TrackProps) => {
  const isCurrentlyPlaying =
    JSON.stringify(track) === JSON.stringify(currentTrack);
  const isPlayingClass = isCurrentlyPlaying ? "current-track" : "";

  return (
    <button
      onClick={() => updateCurrentTrack(track)}
      className={`track ${isPlayingClass}`}
    >
      {track.artist} - {track.title}
    </button>
  );
};
