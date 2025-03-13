import MainNav from "@/components/main-nav";
import React from "react";
import { NavLink } from "react-router";

function LessonsPage() {
  const lessons = [
    {
      id: 1,
      title: "Strumming",
      description: "Learn the art of strumming from experts.",
      thumbnail:
        "https://www.postergully.com/cdn/shop/products/a11b624fde54661c0202be302b4c69b7.jpeg?v=1578638696",
    },
    {
      id: 2,
      title: "Fingerpicking Basics",
      description: "Master the fundamental techniques of fingerpicking.",
      thumbnail:
        "https://guitarpickreviews.com/wp-content/uploads/2021/12/How-to-fingerpicking-acoustic-guitar-basic.png",
    },
    {
      id: 3,
      title: "Power Chords 101",
      description: "Discover how to play power chords like a pro.",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK7enjEaHXwTlQ9c_iZUBpdsMNEkbSjmr1Qw&s",
    },
    {
      id: 4,
      title: "Barre Chords Made Easy",
      description: "Simplify barre chords with step-by-step instructions.",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2-fR7pfWw-_GH8Y-k8u-yHooyk_Ma5GSneQ&s",
    },
    {
      id: 5,
      title: "Lead Guitar Essentials",
      description: "Get started with soloing and lead guitar techniques.",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwOt6Gj5j0UYEpYUuamRAZ8sYXqdb4C2x4dw&s",
    },
    {
      id: 6,
      title: "Blues Guitar Basics",
      description: "Dive into the soulful sounds of blues guitar.",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4j1QcggurGsubb51y0OkHvsyj4aH8AjXMtw&s",
    },
    {
      id: 7,
      title: "Jazz Chord Progressions",
      description: "Learn essential jazz chords and progressions.",
      thumbnail: "https://i.ytimg.com/vi/rCs5t5ItVVw/maxresdefault.jpg",
    },
    {
      id: 8,
      title: "Advanced Rock Techniques",
      description: "Take your rock guitar skills to the next level.",
      thumbnail: "https://i.ytimg.com/vi/0tuU7-DezYU/sddefault.jpg?v=6384daa5",
    },
  ];

  return (
    <>
      <MainNav className={"m-2 lg:m-4"} />

      <main className="flex flex-col place-items-center">
        <div
          className="
            w-full max-w-5xl place-self-center grid grid-cols-1
            p-4 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3
          "
        >
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

  const lessonLink = `/lessons/${data.id}`;

  return (
    <div className="flex flex-col w-full rounded-lg overflow-none shadow-sm border border-base-300">
      <NavLink
        className={"w-full min-h-60 h-60 flex-1 flex flex-col"}
        to={lessonLink}
      >
        <img
          className="w-full rounded-t-lg flex-1 object-cover bg-neutral-300 min-h-60 h-60"
          src={data.thumbnail}
        />
      </NavLink>
      <div className="min-h-20">
        <h3 className="mt-4 mx-4 font-bold">
          <NavLink to={lessonLink}>{data.title}</NavLink>
        </h3>
        <p className="mx-4 mb-4 text-neutral-500">{data.description}</p>
      </div>
    </div>
  );
}

export default LessonsPage;
