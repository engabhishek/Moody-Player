import { PauseCircle, PlayCircle, Volume2, VolumeX } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const Tracks = ({ Songs }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio());

  // Format seconds -> MM:SS
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const togglePlay = (index) => {
    const selectedSong = Songs[index];

    if (currentSong === index) {
      audioRef.current.pause();
      setCurrentSong(null);
    } else {
      audioRef.current.pause();
      audioRef.current = new Audio(selectedSong.audioUrl);
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.play();
      setCurrentSong(index);

      // Events
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current.currentTime);
        setProgress(audioRef.current.currentTime / audioRef.current.duration);
      });

      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });

      audioRef.current.addEventListener("ended", () => {
        playNext(index);
      });
    }
  };

  // Play next track when current ends
  const playNext = (currentIndex) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < Songs.length) {
      togglePlay(nextIndex);
    } else {
      // No next song
      setCurrentSong(null);
      setProgress(0);
      setCurrentTime(0);
    }
  };

  // Seek on progress bar click
  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * duration;
    audioRef.current.currentTime = seekTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      audioRef.current.pause();
    };
  }, []);

  return (
    <div className="flex flex-col p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-4">🎵 Recommended Tracks</h1>

      <ul className="flex flex-col gap-6">
        {Songs.map((song, index) => (
          <li
            key={index}
            className="relative flex flex-col gap-2 sm:flex-row sm:items-center justify-between bg-gradient-to-t from-gray-300 to-white rounded-xl p-4 hover:shadow-lg hover:shadow-gray-500 transition"
          >
            <div className="flex flex-col w-full sm:w-3/4">
              <h2 className="text-lg font-semibold">{song.title}</h2>
              <p className="text-sm text-gray-500">{song.artist}</p>
              {/* <audio
                className="w-full bg-gradient-to-t from-gray-300 to-white rounded-"
                src={song.audioUrl}
                controls
              ></audio> */}
              {/* Progress bar */}
              {currentSong === index && (
                <>
                  <div
                    className="mt-2 h-2 bg-gray-300 rounded-full cursor-pointer relative"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>

                  {/* Time Display */}
                  <div className="text-xs text-gray-600 flex justify-between mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  {/* Volume & Mute */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={toggleMute}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX size={20} />
                      ) : (
                        <Volume2 size={20} />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-32 accent-blue-500"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => togglePlay(index)}
              className="mt-4 sm:mt-0 flex items-center gap-2 text-blue-600 hover:text-blue-800"
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
