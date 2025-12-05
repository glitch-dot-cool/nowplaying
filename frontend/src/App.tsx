import { useState, type FormEvent } from "react";
import "./App.css";
import { Track } from "./components/Track";
import { useGetCurrentTrack } from "./hooks/useGetCurrentTrack";
import { useGetTracklist } from "./hooks/useGetTracklist";
import { useGetTracklists } from "./hooks/useGetTracklists";
import { updateCurrentTrack } from "./utils/updateCurrentTrack";

function App() {
  const [selectedTracklist, setSelectedTracklist] = useState<string>("");

  const [newTracklist, setNewTracklist] = useState<string>("");
  const [newTracklistTitle, setNewTracklistTitle] = useState<string>("");

  const tracklists = useGetTracklists();
  const tracklist = useGetTracklist(selectedTracklist);
  const currentTrack = useGetCurrentTrack();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      playlistTitle: newTracklistTitle,
      tracklist: newTracklist,
    };

    fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/tracklist`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
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

      <form onSubmit={handleSubmit}>
        <input
          value={newTracklistTitle}
          onChange={(e) => setNewTracklistTitle(e.target.value)}
        ></input>
        <textarea
          value={newTracklist}
          onChange={(e) => setNewTracklist(e.target.value)}
        />
        <button type="submit">add tracklist</button>
      </form>
    </div>
  );
}

export default App;
