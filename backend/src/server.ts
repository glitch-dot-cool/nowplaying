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

let currentTrack: Track = { artist: "", title: "" };

const rawTracklist = `
oneohtrix point never - rodl glide
max cooper & rob clouth - candeleda
lapalux - how the land became plastic
hitori tori - pyphen (2025 remaster)
aroma nice - sound ethics
komposite - fragments
blue noise & cenaceae - op. 110
clark - globecore flats
chewlie - dismantled
aleph - recall
ben chatwin - sirius (refracted)
aja ireland - cryptid
canoto - spotted
free.99 - mindbreak
pvas - terminal
ven diagram - crushed by pebbles
de grandi - testa dura
normal pleasure - contempt
djrum - hold
blood of aza - somewhere we knew
teig - a long way to go
minilogue - hitchhiker's choice
amaranth todd & natmou - hyphal bloom (oddlogic remix WIP)
mercy system - if i were you
villager - pause
kinoteki & kelbin - cease and desist
lithe - mainline
mentrek - you should be here
pruvan - too much poision
ben pest & kursa - lard style (feat. scheme boy)
33 below - blinded (onlythenext remix)
ugandan speed trials - untitled 1 (regis mix)
megra - put the lights out
aloka - k1
scuba & bakongo - onezerofive
daphni - cloudy (kelbin remix)
kloud king - essay memories
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
