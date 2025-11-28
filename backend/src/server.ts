import express from "express";
import cors from "cors";

type Track = {
  artist: string;
  title: string;
};

type Tracklist = Track[];

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let currentTrack: Track | null = null;

const rawTracklist = `
oneohtrix point never - rodl glide
max cooper & rob clouth - candeleda
lapalux - how the land became plastic
hitori tori - pyphen (2025 remaster)
aroma nice - sound ethics
komposite - fragments
blue noise & jhl - op. 108
clark - globecore flats
chewlie - dismantled
aleph - recall
ben chatwin - sirius (refracted)
aja ireland - cryptid
canoto - spotted
pvas - terminal
ven diagram - crushed by pebbles
de grandi - testa dura
normal pleasure - contempt
djrum - hold
blood of aza - somewhere we knew
teig - a long way to go
`;

const formatTracklist = (data: string): Tracklist => {
  return data
    .trim()
    .split("\n")
    .map((item) => {
      const [artist, title] = item.split(" - ");
      return { artist, title };
    });
};

const tracklist = formatTracklist(rawTracklist);

app.get("/now-playing", (_req, res) => {
  res.json({ track: currentTrack });
});

app.get("/tracklist", (_req, res) => {
  res.json({ tracklist: tracklist });
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
