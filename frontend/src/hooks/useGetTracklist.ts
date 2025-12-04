import { useEffect, useState } from "react";
import type { Tracklist } from "../types";

export const useGetTracklist = (tracklistName: string) => {
  const [tracklist, setTracklist] = useState<Tracklist>([]);

  useEffect(() => {
    const getTracklist = async () => {
      if (tracklistName) {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/tracklist/${tracklistName}`
        );
        const data = await res.json();

        setTracklist(data.tracklist);
      }
    };

    getTracklist();
  }, [tracklistName]);

  return tracklist;
};
