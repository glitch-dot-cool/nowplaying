import { Route } from "wouter";

import "./App.css";

import { useGetTracklists } from "./hooks/useGetTracklists";
import { AddTracklist } from "./components/AddTracklist";
import { NowPlaying } from "./components/NowPlaying";
import { routes } from "./constants";
import { useState } from "react";
import { Header } from "./components/Header";

function App() {
  const { tracklists, getTracklists } = useGetTracklists();
  const [selectedTracklist, setSelectedTracklist] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Header
        tracklistTitles={tracklists}
        selectedTracklist={selectedTracklist}
        setSelectedTracklist={setSelectedTracklist}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        getTracklists={getTracklists}
      />

      <Route path={routes.HOME}>
        <NowPlaying
          selectedTracklist={selectedTracklist}
          searchTerm={searchTerm}
        />
      </Route>

      <Route path={routes.ADD_TRACKLIST}>
        <AddTracklist onSubmit={getTracklists} />
      </Route>
    </div>
  );
}

export default App;
