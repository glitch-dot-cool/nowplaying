import { useEffect, useState } from "react";

export const useGetTracklists = (): string[] => {
  const [tracklists, setTracklists] = useState<string[]>([]);

  useEffect(() => {
    const getTracklist = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/tracklists`
      );
      const data = await res.json();

      setTracklists(data.tracklists);
    };

    getTracklist();
  }, []);

  return tracklists;
};
