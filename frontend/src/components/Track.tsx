import type { Track as TrackType } from "../types";

const updateCurrentTrack = async (newTrack: TrackType) => {
  const res = await fetch("http://localhost:3000/update-track", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTrack),
  });

  const data = await res.json();
  return data;
};

export const Track = (data: TrackType) => {
  return (
    <button onClick={() => updateCurrentTrack(data)} className="track">
      {data.artist} - {data.title}
    </button>
  );
};
