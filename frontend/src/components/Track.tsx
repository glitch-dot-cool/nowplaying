import { memo } from "react";
import { updateCurrentTrack } from "../utils/api";

interface TrackProps {
  title: string;
  artist: string;
  id: string;
  currentTrackId?: string;
}

const getIsTrackCurrentlyPlaying = ({
  id,
  currentTrackId,
}: Pick<TrackProps, "id" | "currentTrackId">) => {
  if (!currentTrackId) return false;

  return id === currentTrackId;
};

export const Track = memo(
  ({ title, artist, id, currentTrackId }: TrackProps) => {
    const isCurrentlyPlaying = getIsTrackCurrentlyPlaying({
      id,
      currentTrackId,
    });
    const isPlayingClass = isCurrentlyPlaying ? "current-track" : "";

    return (
      <button
        onClick={() =>
          updateCurrentTrack({
            title: title,
            artist: artist,
            id: id,
          })
        }
        className={`track ${isPlayingClass}`}
      >
        {artist} - {title}
      </button>
    );
  }
);
