import { Route, Link } from "wouter";

import "./App.css";

import { useGetTracklists } from "./hooks/useGetTracklists";
import { AddTracklist } from "./components/AddTracklist";
import { NowPlaying } from "./components/NowPlaying";
import { routes } from "./constants";
import { useState } from "react";

function App() {
  const { tracklists, getTracklists } = useGetTracklists();
  const [selectedTracklist, setSelectedTracklist] = useState("");

  return (
    <div>
      <nav>
        <Link href={routes.HOME}>home</Link>
        <Link href={routes.ADD_TRACKLIST}>add tracklist</Link>
      </nav>

      <Route path={routes.HOME}>
        <NowPlaying
          tracklists={tracklists}
          selectedTracklist={selectedTracklist}
          setSelectedTracklist={setSelectedTracklist}
        />
      </Route>

      <Route path={routes.ADD_TRACKLIST}>
        <AddTracklist onSubmit={getTracklists} />
      </Route>
    </div>
  );
}

export default App;
