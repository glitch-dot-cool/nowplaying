import { useState, type FormEvent } from "react";

interface AddTracklistProps {
  onSubmit: () => Promise<void>;
}

export const AddTracklist = ({ onSubmit }: AddTracklistProps) => {
  const [newTracklist, setNewTracklist] = useState<string>("");
  const [newTracklistTitle, setNewTracklistTitle] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      playlistTitle: newTracklistTitle,
      tracklist: newTracklist,
    };

    try {
      await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/tracklist`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // refetch all tracklists
      await onSubmit();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={newTracklistTitle}
        onChange={(e) => setNewTracklistTitle(e.target.value)}
      ></input>
      <textarea
        value={newTracklist}
        onChange={(e) => setNewTracklist(e.target.value)}
      />
      <button type="submit">add tracklist</button>
    </form>
  );
};
