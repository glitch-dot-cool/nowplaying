import express from "express";
import cors from "cors";
import { readdir, readFile, writeFile } from "fs/promises";
import * as v from "valibot";
import { CreatePlaylistSchema } from "./schemas.js";
import { fileURLToPath } from "url";
import path from "path";
import { existsSync, mkdirSync } from "fs";

type Track = {
  artist: string;
  title: string;
};

export type Tracklist = Track[];

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const tracklistDir = path.join(__dirname, "..", "tracklist_json");

// create tracklist_json directory if it doesn't already exist
if (!existsSync(tracklistDir)) {
  mkdirSync(tracklistDir, { recursive: true });
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let currentTrack: Track = { artist: "", title: "" };

app.get("/now-playing", (_req, res) => {
  res.json({ track: currentTrack });
});

app.get("/tracklists", async (_req, res) => {
  const files = await readdir(tracklistDir);

  const tracklistNames = files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const tracklistTitle = file.replace(/\.json$/, "");

      return tracklistTitle;
    });

  res.json({ tracklists: tracklistNames });
});

app.get("/tracklist/:tracklist", async (req, res) => {
  const requestedTracklist = req.params.tracklist;

  try {
    const filePath = `${tracklistDir}/${requestedTracklist}.json`;
    const tracklistData = JSON.parse(await readFile(filePath, "utf-8"));
    res.json({ tracklist: tracklistData });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put("/update-track", (req, res) => {
  currentTrack = {
    artist: req.body.artist,
    title: req.body.title,
  };
  res.json({ track: currentTrack });
});

app.post("/tracklist", async (req, res) => {
  const result = v.safeParse(CreatePlaylistSchema, req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.issues });
  }

  const { playlistTitle, tracklist } = result.output;

  const filePath = path.join(tracklistDir, `${playlistTitle}.json`);
  await writeFile(filePath, JSON.stringify(tracklist, null, 2));

  return res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
