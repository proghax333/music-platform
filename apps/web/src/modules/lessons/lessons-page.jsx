import React from "react";

function LessonsPage() {
  const lessons = [
    {
      id: 1,
      title: "Strumming",
      description: "Learn the art of strumming from experts.",
      thumbnail: "https://placehold.co/128/128/FFF",
    },
    {
      id: 2,
      title: "Fingerpicking Basics",
      description: "Master the fundamental techniques of fingerpicking.",
      thumbnail: "https://placehold.co/128/128/FFF",
    },
    {
      id: 3,
      title: "Power Chords 101",
      description: "Discover how to play power chords like a pro.",
      thumbnail: "https://placehold.co/128/128/FFF",
    },
    {
      id: 4,
      title: "Barre Chords Made Easy",
      description: "Simplify barre chords with step-by-step instructions.",
      thumbnail: "https://placehold.co/128/128/FFF",
    },
    {
      id: 5,
      title: "Lead Guitar Essentials",
      description: "Get started with soloing and lead guitar techniques.",
      thumbnail: "https://placehold.co/128/128/FFF",
    },
    {
      id: 6,
      title: "Blues Guitar Basics",
      description: "Dive into the soulful sounds of blues guitar.",
      thumbnail: "https://placehold.co/128/128/FFF",
    },
    {
      id: 7,
      title: "Jazz Chord Progressions",
      description: "Learn essential jazz chords and progressions.",
      thumbnail: "https://placehold.co/128/128/FFF",
    },
    {
      id: 8,
      title: "Advanced Rock Techniques",
      description: "Take your rock guitar skills to the next level.",
      thumbnail: "https://placehold.co/128/128/FFF",
    },
  ];

  return (
    <>
      <nav className="min-h-12 p-4 pb-0">
        <div className="shadow-sm border border-base-300 rounded-lg flex w-full">
          <h2 className="p-4 font-extrabold font-lato">GuitarsPlatform</h2>
        </div>
      </nav>
      <main className="flex-1 flex flex-col place-items-center">
        <div className="mt-2 w-full max-w-5xl place-self-center grid grid-cols-1 p-4 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => {
            return (
              <LessonCard
                key={`lessons-lessoncard-${lesson.id}`}
                data={lesson}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

function LessonCard({ data }) {
  data ??= {
    id: 1,
    title: "Lessons card",
    description: "Learn the art of lesson cards, or whatever.",
    thumbnail: "https://placehold.co/128/128/FFF",
  };

  return (
    <div className="flex flex-col w-full rounded-lg overflow-none shadow-sm border border-base-300">
      <img
        className="w-full rounded-t-lg flex-1 object-cover bg-neutral-300 min-h-60 h-60"
        src={data.thumbnail}
      />
      <div className="min-h-20">
        <h3 className="mt-4 mx-4 font-bold">{data.title}</h3>
        <p className="mx-4 mb-4 text-neutral-500">{data.description}</p>
      </div>
    </div>
  );
}

export default LessonsPage;
