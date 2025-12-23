import { useGetCurrentTrack } from "../hooks/useGetCurrentTrack";
import { useGetTracklist } from "../hooks/useGetTracklist";

import { Track } from "./Track";

interface NowPlayingProps {
  selectedTracklist: string;
  searchTerm: string;
}

export const NowPlaying = ({
  selectedTracklist,
  searchTerm,
}: NowPlayingProps) => {
  const tracklist = useGetTracklist(selectedTracklist);
  const currentTrack = useGetCurrentTrack();

  const filteredTracklist = tracklist.filter(({ artist, title }) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return (
      artist.toLowerCase().includes(normalizedSearchTerm) ||
      title.toLowerCase().includes(normalizedSearchTerm)
    );
  });

  return (
    <>
      <main>
        <div className="tracklist-container">
          {filteredTracklist.map((track) => {
            return (
              <Track
                key={track.id}
                artist={track.artist}
                title={track.title}
                id={track.id}
                currentTrackId={currentTrack?.id}
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
