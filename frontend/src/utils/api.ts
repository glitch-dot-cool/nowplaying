import { endpoints, SERVER_BASE_URL } from "../constants";
import type { Track } from "../types";

export const getCurrentTrack = async () => {
  const res = await fetch(`${SERVER_BASE_URL}/${endpoints.NOW_PLAYING}`);
  const data = await res.json();
  return data;
};

export const getTracklist = async (tracklistName: string) => {
  const res = await fetch(`${SERVER_BASE_URL}/tracklist/${tracklistName}`);
  const data = await res.json();
  return data;
};

export const getTracklists = async () => {
  const res = await fetch(`${SERVER_BASE_URL}/${endpoints.TRACKLISTS}`);
  const data = await res.json();
  return data;
};

export const updateCurrentTrack = async (newTrack: Track) => {
  const res = await fetch(`${SERVER_BASE_URL}/${endpoints.UPDATE_TRACK}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTrack),
  });

  const data = await res.json();
  return data;
};

export const clearCurrentTrack = async () => {
  await fetch(`${SERVER_BASE_URL}/${endpoints.NOW_PLAYING}`, {
    method: "DELETE",
  });
};

export const addTracklist = async ({
  title,
  tracklist,
}: {
  title: string;
  tracklist: string;
}) => {
  const payload = {
    playlistTitle: title,
    tracklist,
  };

  return await fetch(`${SERVER_BASE_URL}/${endpoints.TRACKLIST}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
