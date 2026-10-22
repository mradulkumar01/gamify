"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { horrorAudio } from "@/lib/audio";

export function AudioAtmosphere() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedAudio = localStorage.getItem("afterdark_audio_active");
    if (savedAudio === "true") {
      // Browsers block autoplay before user gesture; do not auto-resume without gesture
    }
  }, []);

  const toggleAtmosphere = () => {
    if (isPlaying) {
      horrorAudio.stopAtmosphere();
      setIsPlaying(false);
      localStorage.setItem("afterdark_audio_active", "false");
    } else {
      horrorAudio.setVolume(volume);
      horrorAudio.startAtmosphere();
      horrorAudio.playCreepyClick();
      setIsPlaying(true);
      localStorage.setItem("afterdark_audio_active", "true");
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    horrorAudio.setVolume(newVol);
  };

  if (!isClient) return null;

  return (
    <div className="flex items-center gap-2 rounded-full border border-abyss-700/60 bg-abyss-900/80 px-3 py-1.5 backdrop-blur-md shadow-lg transition-all hover:border-blood/50">
      <button
        onClick={toggleAtmosphere}
        type="button"
        className="flex items-center gap-2 text-xs font-mono tracking-wider transition-colors focus:outline-none"
        title={isPlaying ? "Mute Atmospheric Sound" : "Enable Ambient Horror Soundscape"}
        aria-label={isPlaying ? "Mute Atmospheric Sound" : "Enable Ambient Horror Soundscape"}
      >
        {isPlaying ? (
          <>
            <Volume2 className="h-4 w-4 text-blood animate-pulse" />
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-blood h-3 animate-pulse" />
              <span className="w-0.5 bg-blood h-2 animate-bounce" />
              <span className="w-0.5 bg-blood h-3.5 animate-pulse" />
            </div>
            <span className="hidden sm:inline text-blood font-semibold">ATMOSPHERE ON</span>
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4 text-ghost-ash hover:text-white" />
            <span className="hidden sm:inline text-ghost-ash hover:text-white">ATMOSPHERE OFF</span>
          </>
        )}
      </button>

      {isPlaying && (
        <input
          type="range"
          min="0.05"
          max="0.8"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-14 accent-blood h-1 cursor-pointer bg-abyss-700 rounded-lg"
          aria-label="Atmospheric sound volume"
        />
      )}
    </div>
  );
}
