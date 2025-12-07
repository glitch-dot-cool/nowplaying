import { Route, Link } from "wouter";

import "./App.css";

import { useGetTracklists } from "./hooks/useGetTracklists";
import { AddTracklist } from "./components/AddTracklist";
import { NowPlaying } from "./components/NowPlaying";
import { routes } from "./constants";

function App() {
  const { tracklists, getTracklists } = useGetTracklists();

  return (
    <div>
      <nav>
        <Link href={routes.HOME}>home</Link>
        <Link href={routes.ADD_TRACKLIST}>add tracklist</Link>
      </nav>

      <Route path={routes.HOME}>
        <NowPlaying tracklists={tracklists} />
      </Route>

      <Route path={routes.ADD_TRACKLIST}>
        <AddTracklist onSubmit={getTracklists} />
      </Route>
    </div>
  );
}

export default App;
