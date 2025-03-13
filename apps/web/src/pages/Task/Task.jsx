import MainNav from "@/components/main-nav";
import { useState } from "react";
import { Link, NavLink } from "react-router";

const tasks = [
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

const genres = ["All", "Rock", "Blues", "Jazz", "Classical", "Metal", "Pop"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

function Task() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    return (
      (selectedDifficulty === "All" ||
        task.difficulty === selectedDifficulty) &&
      (selectedGenre === "All" || task.genre === selectedGenre)
    );
  });

  return (
    <>
      <MainNav />
      <div className="p-6 min-h-screen w-full border rounded shadow bg-white text-black flex flex-col items-start">
        <h1 className="text-3xl font-bold mb-6 ">Guitar Practice Tasks</h1>

        {/* Filters */}
        <div className="flex items-center justify-between w-full border-b border-gray-300 pb-3">
          {/* Genres Filter */}
          <div className="flex gap-3">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded ${
                  selectedGenre === genre
                    ? "bg-black text-white"
                    : "bg-gray-500 text-white hover:bg-gray-700"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Difficulty Dropdown */}
          <div>
            <label className="text-sm font-medium mr-2">Difficulty:</label>
            <select
              className="p-2 border rounded"
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              value={selectedDifficulty}
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="w-full overflow-x-auto border border-gray-300 mt-4">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                <th className="p-4 border border-gray-300">Title</th>
                <th className="p-4 border border-gray-300">Movie</th>
                <th className="p-4 border border-gray-300">Status</th>
                <th className="p-4 border border-gray-300">Acceptance</th>
                <th className="p-4 border border-gray-300">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-100">
                    <td className="p-4 border border-gray-300">
                      <NavLink to={`/task/${task.id}`}>{task.title}</NavLink>
                    </td>
                    <td className="p-4 border border-gray-300">{task.Movie}</td>
                    <td className="p-4 border border-gray-300">
                      {task.status}
                    </td>
                    <td className="p-4 border border-gray-300">
                      {task.Acceptance}
                    </td>
                    <td className="p-4 border border-gray-300">
                      {task.difficulty}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No matching tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Task;
