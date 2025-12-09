import { useEffect, useState } from "react";
import { getCurrentTrack } from "../utils/api";
import { REFETCH_INTERVAL } from "../constants";
import { type Track } from "../types";

export const useGetCurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  useEffect(() => {
    const pollForCurrentTrack = async () => {
      const data = await getCurrentTrack();
      setCurrentTrack(data.track);
    };

    const interval = setInterval(pollForCurrentTrack, REFETCH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return currentTrack;
};
