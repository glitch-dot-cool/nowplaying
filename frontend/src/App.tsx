import { Route, Link } from "wouter";

import "./App.css";

import { useGetTracklists } from "./hooks/useGetTracklists";
import { AddTracklist } from "./components/AddTracklist";
import { NowPlaying } from "./components/NowPlaying";

function App() {
  const { tracklists, getTracklists } = useGetTracklists();

  return (
    <div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/add-tracklist">Add Tracklist</Link>
      </nav>

      <Route path="/">
        <NowPlaying tracklists={tracklists} />
      </Route>

      <Route path="/add-tracklist">
        <AddTracklist onSubmit={getTracklists} />
      </Route>
    </div>
  );
}

export default App;
