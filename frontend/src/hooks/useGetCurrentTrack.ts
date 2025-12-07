import { useEffect, useState } from "react";
import { getCurrentTrack } from "../utils/api";

export const useGetCurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState({ artist: "", title: "" });

  useEffect(() => {
    const pollForCurrentTrack = async () => {
      const data = await getCurrentTrack();
      setCurrentTrack(data.track);
    };

    const interval = setInterval(pollForCurrentTrack, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return currentTrack;
};
