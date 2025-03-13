import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { FaTimes, FaUpload } from "react-icons/fa";
import { CSS } from "@dnd-kit/utilities";

function SortableImage({ id, src, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative group"
    >
      <img
        src={src}
        alt="Uploaded Preview"
        className="w-24 h-24 object-cover rounded-lg shadow-md"
        {...listeners}
      />
      <button
        className="grid-image-remove-button absolute top-1 right-1 bg-white rounded-full p-1 opacity-100 transition z-100 pointer-events-auto"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}
      >
        <FaTimes className="text-red-500" />
      </button>
    </div>
  );
}

function ImageUploadGrid({ images, setImages }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        id: undefined, // Undefined for local images
        src: undefined, // No remote URL yet
        previewURL: URL.createObjectURL(file), // Local preview
        status: "local",
        file: file,
      }));

      setImages((prev) => [...prev, ...newImages]);
    },
    [setImages]
  );

  function handleRemove(previewURL) {
    setImages((prev) => prev.filter((img) => img.previewURL !== previewURL));
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setImages((prev) => {
        const oldIndex = prev.findIndex((img) => img.previewURL === active.id);
        const newIndex = prev.findIndex((img) => img.previewURL === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".bmp",
        ".tiff",
        ".tif",
        ".ico",
        ".heic",
        ".heif",
        ".avif",
      ],
    },
    multiple: true,
  });

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={images.map((img) => {
              return img.previewURL;
            })}
            strategy={rectSortingStrategy}
          >
            {images.map((img, index) => (
              <SortableImage
                key={img.previewURL}
                id={img.previewURL}
                src={img.src || img.previewURL}
                onRemove={() => handleRemove(img.previewURL)}
              />
            ))}
          </SortableContext>
        </DndContext>

        {/* Upload Dropzone */}
        <div
          {...getRootProps()}
          className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer transition hover:border-blue-500"
        >
          <input {...getInputProps()} />
          <FaUpload className="text-gray-500 text-3xl" />
        </div>
      </div>
    </div>
  );
}

export default ImageUploadGrid;
