import { useCallback, useEffect, useState } from "react";

export const useGetTracklists = () => {
  const [tracklists, setTracklists] = useState<string[]>([]);

  const getTracklists = useCallback(async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/tracklists`
    );
    const data = await res.json();

    setTracklists(data.tracklists);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTracklists();
  }, [getTracklists]);

  return { tracklists, getTracklists };
};
