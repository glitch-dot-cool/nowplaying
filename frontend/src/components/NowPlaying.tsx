import { useState } from "react";
import { useGetCurrentTrack } from "../hooks/useGetCurrentTrack";
import { useGetTracklist } from "../hooks/useGetTracklist";
import { updateCurrentTrack } from "../utils/api";
import { Track } from "./Track";

export const NowPlaying = ({ tracklists }: { tracklists: string[] }) => {
  const [selectedTracklist, setSelectedTracklist] = useState<string>("");
  const tracklist = useGetTracklist(selectedTracklist);
  const currentTrack = useGetCurrentTrack();

  return (
    <>
      <div className="centered">
        <button
          onClick={() => updateCurrentTrack({ artist: "", title: "" })}
          className="destructive"
        >
          clear current track
        </button>
      </div>

      <div className="tracklist-titles">
        {tracklists.map((title) => {
          return (
            <button
              key={title}
              onClick={(e) => setSelectedTracklist(e.currentTarget.textContent)}
            >
              {title}
            </button>
          );
        })}
      </div>

      <div className="tracklist-container">
        {tracklist.map((track) => {
          return (
            <Track
              key={track.title}
              track={track}
              currentTrack={currentTrack}
            />
          );
        })}
      </div>

      {currentTrack.artist && (
        <div className="now-playing-container">
          <h1 className="now-playing">
            now playing: {currentTrack.artist} - {currentTrack.title}
          </h1>
        </div>
      )}
    </>
  );
};
