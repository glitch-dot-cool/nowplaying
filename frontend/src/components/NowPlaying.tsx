import { useState } from "react";
import { useGetCurrentTrack } from "../hooks/useGetCurrentTrack";
import { useGetTracklist } from "../hooks/useGetTracklist";
import { clearCurrentTrack, deleteTracklist } from "../utils/api";
import { Track } from "./Track";

interface NowPlayingProps {
  tracklists: string[];
  selectedTracklist: string;
  setSelectedTracklist: React.Dispatch<React.SetStateAction<string>>;
  getTracklists: () => Promise<void>;
}

export const NowPlaying = ({
  tracklists,
  selectedTracklist,
  setSelectedTracklist,
  getTracklists,
}: NowPlayingProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const tracklist = useGetTracklist(selectedTracklist);
  const currentTrack = useGetCurrentTrack();

  const filteredTracklist = tracklist.filter(({ artist, title }) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return (
      artist.toLowerCase().includes(normalizedSearchTerm) ||
      title.toLowerCase().includes(normalizedSearchTerm)
    );
  });

  const handleDelete = async () => {
    if (confirm(`are you sure you want to delete ${selectedTracklist}?`)) {
      await deleteTracklist(selectedTracklist);
      setSelectedTracklist("");
      await getTracklists();
    }
  };

  return (
    <>
      <main>
        <div className="now-playing-header">
          {selectedTracklist && (
            <button
              onClick={handleDelete}
              className="destructive delete-button"
            >
              delete tracklist
            </button>
          )}

          {selectedTracklist && (
            <input
              placeholder="filter tracklist"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}

          {currentTrack && (
            <div className="centered">
              <button onClick={clearCurrentTrack} className="destructive">
                clear current track
              </button>
            </div>
          )}
        </div>

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
          {filteredTracklist.map((track) => {
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
