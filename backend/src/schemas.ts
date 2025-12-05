import * as v from "valibot";
import { Tracklist } from "./server";

const RawTracklistSchema = v.pipe(
  v.string(),
  v.check((raw) => {
    const lines = raw.trim().split("\n");
    return lines.every((line) => line.includes(" - "));
  }, "Invalid tracklist format. Expected lines like 'artist - title'")
);

const ParsedTracklistSchema = v.pipe(
  RawTracklistSchema,
  v.transform((rawTracklist) => formatTracklist(rawTracklist))
);

export const CreatePlaylistSchema = v.object({
  playlistTitle: v.string(),
  tracklist: ParsedTracklistSchema,
});

const formatTracklist = (data: string): Tracklist => {
  return data
    .trim()
    .split("\n")
    .map((item) => {
      const [artist, title] = item.split(" - ");
      return { artist, title };
    });
};
