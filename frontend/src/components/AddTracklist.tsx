import { useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { addTracklist } from "../utils/api";

interface AddTracklistProps {
  onSubmit: () => Promise<void>;
}

export const AddTracklist = ({ onSubmit }: AddTracklistProps) => {
  const [newTracklist, setNewTracklist] = useState<string>("");
  const [newTracklistTitle, setNewTracklistTitle] = useState<string>("");
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addTracklist({ title: newTracklistTitle, tracklist: newTracklist });
      // refetch all tracklists
      await onSubmit();
      // navigate back to main page
      setLocation("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-tracklist-form">
      <label>
        title:
        <input
          value={newTracklistTitle}
          onChange={(e) => setNewTracklistTitle(e.target.value)}
        />
      </label>
      <label>
        tracklist:
        <textarea
          value={newTracklist}
          onChange={(e) => setNewTracklist(e.target.value)}
        />
      </label>
      <button type="submit">add tracklist</button>
    </form>
  );
};
