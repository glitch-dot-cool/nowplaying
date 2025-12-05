import { useState } from "react";
import "./App.css";
import { Track } from "./components/Track";
import { useGetCurrentTrack } from "./hooks/useGetCurrentTrack";
import { useGetTracklist } from "./hooks/useGetTracklist";
import { useGetTracklists } from "./hooks/useGetTracklists";
import { updateCurrentTrack } from "./utils/updateCurrentTrack";
import { AddTracklist } from "./components/AddTracklist";

function App() {
  const [selectedTracklist, setSelectedTracklist] = useState<string>("");

  const { tracklists, getTracklists } = useGetTracklists();
  const tracklist = useGetTracklist(selectedTracklist);
  const currentTrack = useGetCurrentTrack();

  return (
    <div>
      <button onClick={getTracklists}>get</button>
      <button
        onClick={() => updateCurrentTrack({ artist: "", title: "" })}
        className="track destructive"
      >
        clear current track
      </button>

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

      <AddTracklist onSubmit={getTracklists} />
    </div>
  );
}

export default App;
