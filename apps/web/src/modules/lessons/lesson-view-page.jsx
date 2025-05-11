import MainNav from "@/components/main-nav";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";

import { MdAdd, MdExpand, MdExpandMore } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { MdPlayCircleFilled } from "react-icons/md";

function LessonViewPage() {
  const sections = [
    {
      _id: "66400a001f4a2c9a1d000001",
      title: "Strumming Basics",
      course: "courseObjectId",
      items: [
        {
          type: "Lesson",
          ref: {
            title: "Strumming Basics",
            content: "Learn the basics of strumming and common patterns.",
            videoUrl: "",
            resources: [],
          },
        },
      ],
      order: 1,
    },
    {
      _id: "66400a001f4a2c9a1d000002",
      title: "Complex Patterns",
      course: "courseObjectId",
      items: [
        {
          type: "Lesson",
          ref: {
            title: "Complex Patterns",
            content: "Get to know new and complex patterns.",
            videoUrl: "",
            resources: [],
          },
        },
      ],
      order: 2,
    },
    {
      _id: "66400a001f4a2c9a1d000003",
      title: "Chord Transitions",
      course: "courseObjectId",
      items: [
        {
          type: "Lesson",
          ref: {
            title: "Chord Transitions",
            content: "Improve your ability to switch between chords smoothly.",
            videoUrl: "",
            resources: [],
          },
        },
      ],
      order: 3,
    },
    {
      _id: "66400a001f4a2c9a1d000004",
      title: "Fingerpicking 101",
      course: "courseObjectId",
      items: [
        {
          type: "Lesson",
          ref: {
            title: "Fingerpicking 101",
            content: "Learn the fundamentals of fingerpicking.",
            videoUrl: "",
            resources: [],
          },
        },
      ],
      order: 4,
    },
    {
      _id: "66400a001f4a2c9a1d000005",
      title: "Barre Chords",
      course: "courseObjectId",
      items: [
        {
          type: "Lesson",
          ref: {
            title: "Barre Chords",
            content: "Master the essential barre chord shapes.",
            videoUrl: "",
            resources: [],
          },
        },
      ],
      order: 5,
    },
    {
      _id: "66400a001f4a2c9a1d000006",
      title: "Rhythm & Timing",
      course: "courseObjectId",
      items: [
        {
          type: "Lesson",
          ref: {
            title: "Rhythm & Timing",
            content: "Develop a strong sense of rhythm and timing.",
            videoUrl: "",
            resources: [],
          },
        },
      ],
      order: 6,
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

        {/* Sections */}
        <div className="flex flex-col border rounded-lg my-4 px-4 lg:ml-8 lg:max-w-sm lg:my-0 lg:mb-4 lg:mt-4 w-full">
          <h2 className="font-bold m-4">Sections</h2>

          <div className="border-t"></div>

          <div className="max-h-80 overflow-y-auto lg:max-h-none flex-1">
            {sections.map((lesson) => {
              return (
                <SectionItem key={`lesson-item-${lesson._id}`} data={lesson} />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

function LessonItem({ data }) {
  const { ref: item, type } = data;

  return (
    <div className="border-t [&:not(:last-child)]:border-b p-4 cursor-pointer hover:bg-neutral-100">
      {item.title}
    </div>
  );
}

function SectionItem({ data }) {
  return (
    <div className="group [&:not(:last-child)]:border-b flex">
      <Accordion className="w-full">
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p>{data.title}</p>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: 0,
          }}
        >
          {data.items.map((item) => {
            return <LessonItem key={`lesson_item_${item._id}`} data={item} />;
          })}
        </AccordionDetails>
      </Accordion>
      {/* <img
        src={data.thumbnail}
        className="min-w-20 min-h-16 bg-neutral-500 border-b m-2 rounded-md"
      />
      <div className="p-2">
        <a className="font-bold text-sm" href="#">
          {data.title}
        </a>
        <p className="text-sm text-neutral-700">{data.description}</p>
      </div> */}
    </div>
  );
}

export default LessonViewPage;
