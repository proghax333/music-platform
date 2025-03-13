import MainNav from "@/components/main-nav";
import React from "react";

import { MdAdd } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { MdPlayCircleFilled } from "react-icons/md";

function LessonViewPage() {
  const lessons = [
    {
      id: 1,
      title: "Strumming Basics",
      description: "Learn the basics of strumming and common patterns.",
      thumbnail: "https://placehold.co/80x64?text=Strumming+Basics",
    },
    {
      id: 2,
      title: "Complex Patterns",
      description: "Get to know new and complex patterns.",
      thumbnail: "https://placehold.co/80x64?text=Complex+Patterns",
    },
    {
      id: 3,
      title: "Chord Transitions",
      description: "Improve your ability to switch between chords smoothly.",
      thumbnail: "https://placehold.co/80x64?text=Chord+Transitions",
    },
    {
      id: 4,
      title: "Fingerpicking 101",
      description: "Learn the fundamentals of fingerpicking.",
      thumbnail: "https://placehold.co/80x64?text=Fingerpicking+101",
    },
    {
      id: 5,
      title: "Barre Chords",
      description: "Master the essential barre chord shapes.",
      thumbnail: "https://placehold.co/80x64?text=Barre+Chords",
    },
    {
      id: 6,
      title: "Rhythm & Timing",
      description: "Develop a strong sense of rhythm and timing.",
      thumbnail: "https://placehold.co/80x64?text=Rhythm+and+Timing",
    },
    {
      id: 7,
      title: "Scales & Improvisation",
      description: "Explore scales and how to use them for improvisation.",
      thumbnail: "https://placehold.co/80x64?text=Scales+and+Improvisation",
    },
    {
      id: 8,
      title: "Blues Guitar Basics",
      description: "Learn the fundamentals of blues guitar playing.",
      thumbnail: "https://placehold.co/80x64?text=Blues+Guitar+Basics",
    },
    {
      id: 9,
      title: "Lead Guitar Techniques",
      description: "Discover techniques for playing lead guitar.",
      thumbnail: "https://placehold.co/80x64?text=Lead+Guitar+Techniques",
    },
    {
      id: 10,
      title: "Fingerstyle Arrangements",
      description: "Arrange songs in a fingerstyle playing method.",
      thumbnail: "https://placehold.co/80x64?text=Fingerstyle+Arrangements",
    },
    {
      id: 11,
      title: "Songwriting with Guitar",
      description: "Learn how to use guitar for songwriting.",
      thumbnail: "https://placehold.co/80x64?text=Songwriting+with+Guitar",
    },
    {
      id: 12,
      title: "Advanced Soloing",
      description: "Enhance your soloing techniques and phrasing.",
      thumbnail: "https://placehold.co/80x64?text=Advanced+Soloing",
    },
  ];

  return (
    <>
      <MainNav />

      <main
        className="
          flex-1 flex flex-col
          lg:flex-row xl:max-w-[80vw] lg:self-center
          overflow-y-auto
        "
      >
        <div className="mt-4 lg:ml-4 lg:flex-1 lg:overflow-y-auto lg:mb-4">
          <div className="flex flex-col w-full">
            {/* video player */}
            <div className="bg-neutral-950 w-full lg:h-auto aspect-[16/9] flex items-center justify-center">
              <button>
                <MdPlayCircleFilled className="text-neutral-50" size={42} />
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full p-4">
            <h3 className="font-bold text-2xl">
              Strumming 101: Basic Patterns
            </h3>

            <p className="mt-2 text-base-700">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde eum
              animi ratione, officiis obcaecati voluptatibus quibusdam, cumque
              aspernatur architecto accusamus tempora velit nulla,
              exercitationem odit aliquam neque quam quaerat eaque!
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {["Guitar", "Strumming", "Techniques"].map((item) => {
                return (
                  <div
                    key={`lesson-tag-${item}`}
                    className="rounded-full p-1 px-4 text-sm border border-neutral-400"
                  >
                    {item}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-row gap-2">
              <button className="text-sm shadow-md rounded-lg p-2 px-3 pr-4 bg-primary-600 text-primary-content-600 flex items-center gap-2">
                <MdAdd size={18} />
                <p className="text-center content-center">Add to Watch Later</p>
              </button>

              <button className="text-sm shadow-md rounded-lg p-2 px-3 pr-4 bg-accent-600 text-accent-content-600 flex items-center gap-2">
                <MdShare size={18} />
                <p className="text-center content-center">Share</p>
              </button>
            </div>
          </div>
        </div>

        {/* lessons section */}
        <div className="flex flex-col border rounded-lg my-4 mx-4 lg:ml-8 lg:max-w-sm lg:my-0 lg:mb-4 lg:mt-4">
          <h2 className="font-bold m-4">Lessons</h2>

          <div className="border-t"></div>

          <div className="max-h-80 overflow-y-auto lg:max-h-none flex-1">
            {lessons.map((lesson) => {
              return (
                <LessonItem key={`lesson-item-${lesson.id}`} data={lesson} />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

function LessonItem({ data }) {
  return (
    <div className="group [&:not(:last-child)]:border-b flex">
      <img
        src={data.thumbnail}
        className="min-w-20 min-h-16 bg-neutral-500 border-b m-2 rounded-md"
      />
      <div className="p-2">
        <a className="font-bold text-sm" href="#">
          {data.title}
        </a>
        <p className="text-sm text-neutral-700">{data.description}</p>
      </div>
    </div>
  );
}

export default LessonViewPage;
