import { useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { addTracklist } from "../utils/api";

interface AddTracklistProps {
  onSubmit: () => Promise<void>;
}

type Error = {
  path: string;
  message: string;
};

export const AddTracklist = ({ onSubmit }: AddTracklistProps) => {
  const [newTracklist, setNewTracklist] = useState<string>("");
  const [newTracklistTitle, setNewTracklistTitle] = useState<string>("");
  const [, setLocation] = useLocation();
  const [errors, setErrors] = useState<Error[] | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    const res = await addTracklist({
      title: newTracklistTitle,
      tracklist: newTracklist,
    });

    if (res.errors) {
      setErrors(res.errors);
      return;
    }

    // refetch all tracklists
    await onSubmit();
    // navigate back to main page
    setLocation("/");
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

      {errors?.map((error) => (
        <p key={error.message} className="error">
          <span className="error-path">{error.path}</span> : {error.message}
        </p>
      ))}
    </form>
  );
};
