import { useEffect, useState } from "react";
import type { Tracklist } from "../types";

export const useGetTracklist = () => {
  const [tracklist, setTracklist] = useState<Tracklist>([]);

  useEffect(() => {
    const getTracklist = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/tracklist`
      );
      const data = await res.json();

      setTracklist(data.tracklist);
    };

    getTracklist();
  }, []);

  return tracklist;
};
