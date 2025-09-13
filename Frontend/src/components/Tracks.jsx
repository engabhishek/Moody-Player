import { PauseCircle, PlayCircle } from "lucide-react";
import React, { useState } from "react";

const Tracks = () => {
  const [songs] = useState([
    {
      title: "Abhishek Song",
      artist: "Artist One",
      url: "https://example.com/song1.mp3",
    },
    {
      title: "Second Song",
      artist: "Artist Two",
      url: "https://example.com/song2.mp3",
    },
    {
      title: "Third Song",
      artist: "Artist Three",
      url: "https://example.com/song3.mp3",
    },
  ]);

  const [currentSong, setCurrentSong] = useState(null);

  const togglePlay = (index) => {
    if (currentSong === index) {
      setCurrentSong(null);
    } else {
      setCurrentSong(index);
    }
  };

  return (
    <div className="flex flex-col p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-4">🎵 Recommended Tracks</h1>

      <ul className="flex flex-col gap-6">
        {songs.map((song, index) => (
          <li
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-100 rounded-xl p-4 hover:shadow-md transition"
          >
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">{song.title}</h2>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>

            <button
              onClick={() => togglePlay(index)}
              className="mt-2 sm:mt-0 flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              {currentSong === index ? (
                <>
                  <PauseCircle size={28} /> <span>Pause</span>
                </>
              ) : (
                <>
                  <PlayCircle size={28} /> <span>Play</span>
                </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tracks;
