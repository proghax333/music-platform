import React from "react";
import { useParams } from "react-router";

const askdes = [
  {
    id: 1,
    title: "Basic Chords",
    difficulty: "Beginner",
    genre: "Rock",
    status: "Completed",
    Acceptance: "33%",
    Movie: "Sonu Ke Titu Ki Sweety",
  },
  {
    id: 2,
    title: "O Sajan",
    difficulty: "Intermediate",
    genre: "Blues",
    status: "UnCompleted",
    Acceptance: "33%",
    Movie: "Bollywood Strings",
  },
  {
    id: 3,
    title: "Pentatonic Scales",
    difficulty: "Advanced",
    genre: "Jazz",
    status: "Completed",
    Acceptance: "33%",
    Movie: "Jazz Fusion",
  },
  {
    id: 4,
    title: "Strumming Patterns",
    difficulty: "Beginner",
    genre: "Classical",
    status: "Completed",
    Acceptance: "40%",
    Movie: "Strum & Flow",
  },
  {
    id: 5,
    title: "Blues Progression",
    difficulty: "Intermediate",
    genre: "Blues",
    status: "UnCompleted",
    Acceptance: "35%",
    Movie: "Blues Story",
  },
  {
    id: 6,
    title: "Fingerstyle Basics",
    difficulty: "Advanced",
    genre: "Rock",
    status: "Completed",
    Acceptance: "50%",
    Movie: "Acoustic Dreams",
  },
  {
    id: 7,
    title: "Power Chords",
    difficulty: "Beginner",
    genre: "Metal",
    status: "Completed",
    Acceptance: "38%",
    Movie: "Rock Legends",
  },
  {
    id: 8,
    title: "Jazz Improvisation",
    difficulty: "Advanced",
    genre: "Jazz",
    status: "Completed",
    Acceptance: "45%",
    Movie: "Smooth Jazz Nights",
  },
  {
    id: 9,
    title: "Country Fingerpicking",
    difficulty: "Intermediate",
    genre: "Country",
    status: "UnCompleted",
    Acceptance: "42%",
    Movie: "Country Roads",
  },
  {
    id: 10,
    title: "Funk Groove",
    difficulty: "Advanced",
    genre: "Funk",
    status: "Completed",
    Acceptance: "47%",
    Movie: "Groove Masters",
  },
  {
    id: 11,
    title: "Classical Arpeggios",
    difficulty: "Beginner",
    genre: "Classical",
    status: "Completed",
    Acceptance: "39%",
    Movie: "Symphony Strings",
  },
  {
    id: 12,
    title: "Pop Chord Progressions",
    difficulty: "Intermediate",
    genre: "Pop",
    status: "UnCompleted",
    Acceptance: "44%",
    Movie: "Hit Makers",
  },
  {
    id: 13,
    title: "Reggae Rhythms",
    difficulty: "Beginner",
    genre: "Reggae",
    status: "Completed",
    Acceptance: "36%",
    Movie: "Island Vibes",
  },
  {
    id: 14,
    title: "Advanced Metal Shredding",
    difficulty: "Advanced",
    genre: "Metal",
    status: "Completed",
    Acceptance: "52%",
    Movie: "Metal Mania",
  },
  {
    id: 15,
    title: "Rock Solo Techniques",
    difficulty: "Intermediate",
    genre: "Rock",
    status: "UnCompleted",
    Acceptance: "48%",
    Movie: "Solo Express",
  },
  {
    id: 16,
    title: "Folk Strumming",
    difficulty: "Beginner",
    genre: "Folk",
    status: "Completed",
    Acceptance: "37%",
    Movie: "Campfire Melodies",
  },
  {
    id: 17,
    title: "Fusion Guitar Techniques",
    difficulty: "Advanced",
    genre: "Fusion",
    status: "Completed",
    Acceptance: "50%",
    Movie: "Electric Fusion",
  },
  {
    id: 18,
    title: "Neo-Soul Chords",
    difficulty: "Intermediate",
    genre: "Neo-Soul",
    status: "UnCompleted",
    Acceptance: "43%",
    Movie: "Soul Grooves",
  },
  {
    id: 19,
    title: "Slide Guitar Basics",
    difficulty: "Beginner",
    genre: "Blues",
    status: "Completed",
    Acceptance: "34%",
    Movie: "Mississippi Blues",
  },
  {
    id: 20,
    title: "Progressive Rock Riffs",
    difficulty: "Advanced",
    genre: "Progressive Rock",
    status: "Completed",
    Acceptance: "55%",
    Movie: "Prog Legends",
  },
];

const Taskdes = () => {
  const { id } = useParams();
  console.log("This is for id ", typeof id);
  const song = askdes.find((item) => {
    return item.id == id;
  });
  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-gray-800 text-white flex justify-center">
        <button className="px-4 py-2 bg-blue-500 rounded-lg">Submit</button>
      </div>

      <div className="flex flex-1">
        <div className="w-1/2 p-4 border-r border-gray-300 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Song Description</h2>
          <div key={song.id}>
            <p>{song.songDes}</p>
            <h3 className="text-lg font-semibold mt-4">Artist:</h3>
            <p>{song.artist}</p>
            <h3 className="text-lg font-semibold mt-4">Album:</h3>
            <p>{song.album}</p>
            <h3 className="text-lg font-semibold mt-4">Lyrics:</h3>
            <pre className="bg-gray-200 p-2 rounded">{song.lyrics}</pre>
          </div>
        </div>

        {/* Right Column - Video and Audio Recording */}
        <div className="w-1/2 p-4 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Video Section</h2>
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded mb-4">
            <p>Video Player Here</p>
          </div>
          <h2 className="text-xl font-semibold mb-4">Audio Recording</h2>
          <div className="w-full h-24 bg-gray-200 flex items-center justify-center rounded">
            <p>Record Audio Here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskdes;
