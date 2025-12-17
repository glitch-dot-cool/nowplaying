import { useEffect, useState } from "react";
import type { Tracklist } from "../types";
import { getTracklist } from "../utils/api";

export const useGetTracklist = (tracklistName: string) => {
  const [tracklist, setTracklist] = useState<Tracklist>([]);

  useEffect(() => {
    const _getTracklist = async () => {
      if (tracklistName) {
        const data = await getTracklist(tracklistName);
        setTracklist(data.tracklist);
      } else {
        setTracklist([]);
      }
    };

    _getTracklist();
  }, [tracklistName]);

  return tracklist;
};
