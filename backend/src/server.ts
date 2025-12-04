import express from "express";
import cors from "cors";
import * as tracklists from "./tracklists";

type Track = {
  artist: string;
  title: string;
};

type Tracklist = Track[];

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let currentTrack: Track = { artist: "", title: "" };

const formatTracklist = (data: string): Tracklist => {
  return data
    .trim()
    .split("\n")
    .map((item) => {
      const [artist, title] = item.split(" - ");
      return { artist, title };
    });
};

app.get("/now-playing", (_req, res) => {
  res.json({ track: currentTrack });
});

app.get("/tracklists", (_req, res) => {
  const tracklistNames = Object.keys(tracklists);
  res.json({ tracklists: tracklistNames });
});

app.get("/tracklist/:tracklist", (req, res) => {
  const requestedTracklist = req.params.tracklist;

  if (!(requestedTracklist in tracklists)) {
    return res.status(404).json({ error: "Unknown tracklist" });
  }

  const selectedTracklist =
    tracklists[requestedTracklist as keyof typeof tracklists];

  const formattedTracklist = formatTracklist(selectedTracklist);
  res.json({ tracklist: formattedTracklist });
});

app.put("/update-track", (req, res) => {
  currentTrack = {
    artist: req.body.artist,
    title: req.body.title,
  };
  res.json({ track: currentTrack });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
