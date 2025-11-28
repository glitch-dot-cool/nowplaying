import { useEffect, useState } from "react";

export const useGetCurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState({ artist: "", title: "" });

  useEffect(() => {
    const updateTrack = async () => {
      const res = await fetch("http://localhost:3000/now-playing");
      const data = await res.json();

      setCurrentTrack(data.track);
    };

    const interval = setInterval(updateTrack, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return currentTrack;
};
