import type { Track } from "../types";

export const updateCurrentTrack = async (newTrack: Track) => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/update-track`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTrack),
    }
  );

  const data = await res.json();
  return data;
};
