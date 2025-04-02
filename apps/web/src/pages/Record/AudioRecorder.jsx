import React, { useState, useRef } from "react";

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-6 py-2 text-white rounded-lg ${
          recording ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioBlob && (
        <div className="flex flex-col items-center gap-2">
          <audio controls>
            <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <a href={URL.createObjectURL(audioBlob)} download="recording.wav">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Download Audio
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
