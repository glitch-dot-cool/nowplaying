import { useCallback, useEffect, useState } from "react";
import { getTracklists as _getTracklists } from "../utils/api";

export const useGetTracklists = () => {
  const [tracklists, setTracklists] = useState<string[]>([]);

  const getTracklists = useCallback(async () => {
    const data = await _getTracklists();

    setTracklists(data.tracklists);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTracklists();
  }, [getTracklists]);

  return { tracklists, getTracklists };
};
