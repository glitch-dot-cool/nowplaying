import type { Track as TrackType } from "../types";
import { updateCurrentTrack } from "../utils/updateCurrentTrack";

export const Track = (data: TrackType) => {
  return (
    <button onClick={() => updateCurrentTrack(data)} className="track">
      {data.artist} - {data.title}
    </button>
  );
};
