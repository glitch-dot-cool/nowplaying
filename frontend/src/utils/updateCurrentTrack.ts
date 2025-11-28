import type { Track } from "../types";

export const updateCurrentTrack = async (newTrack: Track) => {
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
