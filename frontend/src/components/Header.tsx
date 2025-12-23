import { Link } from "wouter";
import { routes } from "../constants";
import { clearCurrentTrack, deleteTracklist } from "../utils/api";

interface HeaderProps {
  tracklistTitles: string[];
  selectedTracklist: string;
  setSelectedTracklist: (title: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  getTracklists: () => Promise<void>;
}

export const Header = ({
  tracklistTitles,
  selectedTracklist,
  setSelectedTracklist,
  searchTerm,
  setSearchTerm,
  getTracklists,
}: HeaderProps) => {
  const handleDelete = async () => {
    if (confirm(`are you sure you want to delete ${selectedTracklist}?`)) {
      await deleteTracklist(selectedTracklist);
      setSelectedTracklist("");
      await getTracklists();
    }
  };

  return (
    <header>
      <nav>
        <Link href={routes.HOME}>home</Link>
        <Link href={routes.ADD_TRACKLIST}>add tracklist</Link>
      </nav>

      <input
        placeholder="filter tracklist"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="header-buttons">
        <button onClick={clearCurrentTrack}>clear current track</button>
        <button onClick={handleDelete}>delete playlist</button>
        <select onChange={(e) => setSelectedTracklist(e.target.value)}>
          {tracklistTitles.map((title) => {
            return (
              <option key={title} value={title}>
                {title}
              </option>
            );
          })}
        </select>
      </div>
    </header>
  );
};
