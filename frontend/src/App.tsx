import "./App.css";
import { Track } from "./components/Track";
import { useGetCurrentTrack } from "./hooks/useGetCurrentTrack";
import { useGetTracklist } from "./hooks/useGetTracklist";
import { updateCurrentTrack } from "./utils/updateCurrentTrack";

function App() {
  const tracklist = useGetTracklist();
  const currentTrack = useGetCurrentTrack();

  return (
    <div>
      <button
        onClick={() => updateCurrentTrack({ artist: "", title: "" })}
        className="track destructive"
      >
        clear current track
      </button>

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
    </div>
  );
}

export default App;
