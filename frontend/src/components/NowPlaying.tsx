import { useState } from "react";
import { useGetCurrentTrack } from "../hooks/useGetCurrentTrack";
import { useGetTracklist } from "../hooks/useGetTracklist";
import { clearCurrentTrack } from "../utils/api";
import { Track } from "./Track";

export const NowPlaying = ({ tracklists }: { tracklists: string[] }) => {
  const [selectedTracklist, setSelectedTracklist] = useState<string>("");
  const tracklist = useGetTracklist(selectedTracklist);
  const currentTrack = useGetCurrentTrack();

  return (
    <>
      <main>
        {currentTrack && (
          <div className="centered">
            <button onClick={clearCurrentTrack} className="destructive">
              clear current track
            </button>
          </div>
        )}

        <div className="tracklist-titles">
          {tracklists.map((title) => {
            return (
              <button
                key={title}
                onClick={(e) =>
                  setSelectedTracklist(e.currentTarget.textContent)
                }
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
                key={`${track.artist}${track.title}`}
                artist={track.artist}
                title={track.title}
                currentArtist={currentTrack?.artist}
                currentTitle={currentTrack?.title}
              />
            );
          })}
        </div>
      </main>

      {currentTrack?.artist && (
        <footer>
          <h1 className="now-playing">
            now playing: {currentTrack.artist} - {currentTrack.title}
          </h1>
        </footer>
      )}
    </>
  );
};
