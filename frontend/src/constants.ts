// clientside routes
export const routes = {
  HOME: "/",
  ADD_TRACKLIST: "add-tracklist",
} as const;

export const REFETCH_INTERVAL = 1000;

export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

// api endpoints
export const endpoints = {
  NOW_PLAYING: "now-playing",
  TRACKLIST: "tracklist",
  TRACKLISTS: "tracklists",
  UPDATE_TRACK: "update-track",
  DELETE_TRACKLIST: "tracklist",
} as const;
