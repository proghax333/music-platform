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
            content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde eum
animi ratione, officiis obcaecati voluptatibus quibusdam, cumque
aspernatur architecto accusamus tempora velit nulla,
exercitationem odit aliquam neque quam quaerat eaque!`,
            videoUrl: "",
            resources: [
              {
                title: "Transcript",
                file: {
                  id: "123123",
                  url: "fileurl",
                },
                type: "pdf",
              },
              {
                title: "Source Code",
                file: {
                  id: "123123",
                  url: "fileurl",
                },
                type: "zip",
              },
            ],
            tags: ["Guitar", "Techniques"],
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
            tags: ["Guitar", "Techniques"],
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
            tags: ["Guitar", "Techniques"],
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
            tags: ["Guitar", "Techniques"],
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
            tags: ["Guitar", "Techniques"],
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
            tags: ["Guitar", "Techniques"],
          },
        },
      ],
      order: 6,
    },
  ];

  const item = sections[0].items[0];

  let pageUI = null;

  if (item.type === "Lesson") {
    pageUI = <Lesson data={item.ref} />;
  }

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
        {pageUI}

        {/* Sections */}
        <div className="flex flex-col lg:border rounded-lg my-4 p-4 lg:p-0 lg:ml-8 lg:max-w-sm lg:my-0 lg:mb-4 lg:mt-4 w-full">
          <h2 className="font-bold p-4 bg-black text-white">Sections</h2>

          <div className="border-t"></div>

          <div className="max-h-80 overflow-y-auto lg:max-h-none flex-1">
            {sections.map((section) => {
              return (
                <SectionItem
                  key={`section-item-${section._id}`}
                  data={section}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

function Lesson({ data }) {
  const item = data;

  return (
    <div className="mt-4 lg:ml-4 lg:flex-1 lg:overflow-y-auto lg:mb-4">
      {/* video player */}
      <div className="flex flex-col w-full">
        <div className="bg-neutral-950 w-full lg:h-auto aspect-[16/9] flex items-center justify-center">
          <button>
            <MdPlayCircleFilled className="text-neutral-50" size={42} />
          </button>
        </div>
      </div>

      {/* details */}
      <div className="flex flex-col w-full p-4">
        <h3 className="font-bold text-2xl">{item.title}</h3>

        <p className="mt-2 text-base-700">{item.content}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {item.tags.map((item) => {
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

        <div className="pt-4">
          <h2 className="text-lg font-bold">Resources</h2>

          <div className="border my-2">
            {item.resources.length === 0 && <div>No resources.</div>}
            {item.resources.length > 0 && (
              <ol className="flex flex-col gap-2">
                {item.resources.map((resource) => {
                  return (
                    <li
                      key={`lesson_item_${resource._id}`}
                      className="flex gap-4 p-2 [&:not(:last-of-type)]:border-b"
                    >
                      <a href={resource.file.url}>{resource.title}</a>
                      <a
                        href={resource.file.url}
                        className="ml-auto underline text-blue-600 text-ellipsis"
                      >
                        Download
                      </a>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
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
          className="bg-slate-300"
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
    </div>
  );
}

export default LessonViewPage;
