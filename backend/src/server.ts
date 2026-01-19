import express from "express";
import cors from "cors";
import { readdir, readFile, writeFile, unlink } from "fs/promises";
import * as v from "valibot";
import { CreatePlaylistSchema } from "./schemas.js";
import { fileURLToPath } from "url";
import path from "path";
import { existsSync, mkdirSync } from "fs";

type Track = {
  artist: string;
  title: string;
  id: string;
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

let currentTrack: Track | null = null;

app.get("/now-playing", (_req, res) => {
  res.json({ track: currentTrack });
});

app.delete("/now-playing", (_req, res) => {
  currentTrack = null;
  res.sendStatus(204);
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

app.delete("/tracklist/:tracklist", async (req, res) => {
  const requestedTracklist = req.params.tracklist;

  try {
    const filePath = `${tracklistDir}/${requestedTracklist}.json`;
    await unlink(filePath);
  } catch (error) {
    res.sendStatus(500);
  }

  res.sendStatus(204);
});

app.put("/update-track", (req, res) => {
  currentTrack = {
    artist: req.body.artist,
    title: req.body.title,
    id: req.body.id,
  };
  res.json({ track: currentTrack });
});

app.post("/tracklist", async (req, res) => {
  const result = v.safeParse(CreatePlaylistSchema, req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.issues.map((issue) => {
        return {
          path: issue.path?.reduce((acc, cur) => (acc += cur.key), ""),
          message: issue.message,
        };
      }),
    });
  }

  const { playlistTitle, tracklist } = result.output;

  const filePath = path.join(tracklistDir, `${playlistTitle}.json`);
  await writeFile(filePath, JSON.stringify(tracklist, null, 2));

  return res.sendStatus(204);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening at http://0.0.0.0:${port}`);
});
