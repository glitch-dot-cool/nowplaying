// clientside routes
export const routes = {
  HOME: "/",
  ADD_TRACKLIST: "add-tracklist",
} as const;

export const REFETCH_INTERVAL = 1000;

const getServerBaseUrl = () => {
  if (import.meta.env.VITE_SERVER_BASE_URL) {
    return import.meta.env.VITE_SERVER_BASE_URL;
  }

  // fallback to current protocol + hostname + default port for backend if no env var set
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}:3000`;
};

export const SERVER_BASE_URL = getServerBaseUrl();

// api endpoints
export const endpoints = {
  NOW_PLAYING: "now-playing",
  TRACKLIST: "tracklist",
  TRACKLISTS: "tracklists",
  UPDATE_TRACK: "update-track",
  DELETE_TRACKLIST: "tracklist",
} as const;
