import { useEffect, useState } from "react";
import type { Tracklist } from "../types";

export const useGetTracklist = () => {
  const [tracklist, setTracklist] = useState<Tracklist>([]);

  useEffect(() => {
    const getTracklist = async () => {
      const res = await fetch("http://localhost:3000/tracklist");
      const data = await res.json();

      setTracklist(data.tracklist);
    };

    getTracklist();
  }, []);

  return tracklist;
};
