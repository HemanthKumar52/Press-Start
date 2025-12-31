import seedrandom from 'seedrandom';

const astroNames = ["Neon Voyager", "Cyber Monk", "Data Drifter", "Pixel Sage", "Void Walker", "Quantum Soul", "Echo Runner", "Stellar Architect", "Binary Weaver"];
const activities = ["Night Drivin'", "Code Crafting", "Synthwave Chilling", "VR Exploring", "Retro Gaming", "Neural Networking", "Meditating in Neon", "Urban Photography"];
const preciousThings = ["Your Authenticity", "Your Curiosity", "Your Silence", "Your Focus", "Your Empathy", "Your Drive", "Your Voice"];
const colors = ["Electric Cyan", "Magenta Haze", "Deep Void Black", "Holographic Silver", "Sunset Purple", "Laser Green"];
const abilities = ["Time Dilation", "Pattern Recognition", "Code Synthesis", "Emotional Resonance", "Future Vision", "Reality Glitch"];
const movies = ["Blade Runner 2049", "The Matrix", "Her", "Ex Machina", "Ghost in the Shell", "Tron: Legacy", "Ready Player One"];
const songs = ["Midnight City - M83", "Nightcall - Kavinsky", "Stardust - Music Sounds Better", "Instant Crush - Daft Punk", "Blinding Lights - The Weeknd"];
const habits = ["Deep Work 4h", "Digital Detox", "Night Walk", "Reading 30m", "Journaling", "Meditation", "Zero Inbox"];
const styles = ["Techwear Minimal", "Cyber Grunge", "Neo-Noir Suit", "Casual Hologram", "Retro Future"];
const characters = ["Neo", "Motoko Kusanagi", "Ellen Ripley", "Spike Spiegel", "Lara Croft", "Tony Stark", "V"];
const countries = ["Japan (Tokyo)", "Iceland (Aurora)", "New Zealand (Nature)", "Singapore (Future)", "South Korea (Seoul)", "Norway (Fjord)"];
const books = ["Neuromancer", "Snow Crash", "Dune", "Atomic Habits", "The Alchemist", "Sapiens"];

const cars = [
  { name: "Cyber Porsche 911", image: "https://images.unsplash.com/photo-1503376763036-066120622c74?w=800&q=80" },
  { name: "Lamborghini Revuelto Neon", image: "https://images.unsplash.com/photo-1544605368-180a45000e2b?w=800&q=80" },
  { name: "Ferrari Testarossa Retro", image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80" },
  { name: "Tesla Roadster 3.0", image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&q=80" },
  { name: "Rimac Nevera", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80" },
  { name: "DeLorean Time Machine", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80" },
  { name: "Mustang 1969 Cybermod", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80" },
  { name: "Aston Martin Valkyrie", image: "https://images.unsplash.com/photo-1605559424843-9e4c2287f386?w=800&q=80" },
  { name: "Koenigsegg Jesko", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80" },
  { name: "McLaren Speedtail", image: "https://images.unsplash.com/photo-1594586872506-6bd689255a53?w=800&q=80" }
]; // Explicitly excluding BMW M5

const musicTracks = [
  { name: "Neon Drive", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { name: "Midnight City", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { name: "Cyber Pulse", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { name: "Analog Dreams", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" },
];

export const generateProfile = (username: string, gender: string) => {
  // Create a seed based on username and gender
  const seedString = `${username.toLowerCase().trim()}-${gender}`;
  const rng = seedrandom(seedString);

  // Helper to pick random item
  const pick = (arr: any[]) => arr[Math.floor(rng() * arr.length)];
  const pickMulti = (arr: string[], n: number) => {
    const shuffled = [...arr].sort(() => 0.5 - rng());
    return shuffled.slice(0, n);
  };

  const selectedCar = pick(cars);
  const selectedMusic = pick(musicTracks);

  return {
    astroName: pick(astroNames),
    activities: pickMulti(activities, 3),
    precious: pick(preciousThings),
    color: pick(colors),
    ability: pick(abilities),
    movie: pick(movies),
    song: pick(songs), // This is the "Matching Song" text attribute
    habit: pick(habits),
    style: pick(styles),
    characterMatch: pick(characters),
    countries: pickMulti(countries, 2),
    book: pick(books),
    car: selectedCar.name,
    carImage: selectedCar.image,
    music: selectedMusic.name,
    musicUrl: selectedMusic.url,
    shortStory: `In the neon-lit datastream of 2026, ${username} emerged not as a mere user, but as a ${pick(astroNames)}. With a core driven by ${pick(abilities)}, they navigated the noise to find signal. A true protagonist.`,
  };
};
