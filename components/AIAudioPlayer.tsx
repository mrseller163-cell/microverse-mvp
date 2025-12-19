"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Plus, Save, Sparkles, Mic, Send } from "lucide-react";

type Track = {
  id: string;
  title: string;
  artist: string;
  url: string;
  mood: string;
  duration: number;
  isCustom?: boolean; // для треков Suno
};

// Mock: сохранение плейлистов в localStorage
const loadPlaylists = (): Record<string, Track[]> => {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem("grokmusic_playlists");
  return data ? JSON.parse(data) : {};
};

const savePlaylists = (playlists: Record<string, Track[]>) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("grokmusic_playlists", JSON.stringify(playlists));
  }
};

export function AIAudioPlayer({ context }: { context?: string }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mood, setMood] = useState("focus");
  const [playlists, setPlaylists] = useState<Record<string, Track[]>>({});
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showSuno, setShowSuno] = useState(false);
  const [sunoPrompt, setSunoPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Загрузка плейлистов
  useEffect(() => {
    const saved = loadPlaylists();
    setPlaylists(saved);
  }, []);

  // Контекст из инструмента
  useEffect(() => {
    if (context) {
      let selectedMood = "focus";
      if (context.includes("video") || context.includes("creative")) selectedMood = "energy";
      if (context.includes("relax")) selectedMood = "chill";
      setMood(selectedMood);
    }
  }, [context]);

  const mockTracks = {
    focus: [
      { id: "1", title: "Deep Concentration", artist: "AI LoFi Lab", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", mood: "focus", duration: 184 },
    ],
    chill: [
      { id: "3", title: "Evening Rain", artist: "Ambient AI", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", mood: "chill", duration: 198 },
    ],
    energy: [
      { id: "5", title: "Productivity Boost", artist: "Synthwave AI", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", mood: "energy", duration: 205 }
    ],
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) setProgress(audioRef.current.currentTime);
  };

  const onEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // === Suno AI ===
  const generateWithSuno = async () => {
    if (!sunoPrompt.trim()) return;
    setIsGenerating(true);

    // Эмуляция генерации (в реальности — вызов Suno API)
    setTimeout(() => {
      const customTrack: Track = {
        id: `suno-${Date.now()}`,
        title: sunoPrompt.substring(0, 30) + "...",
        artist: "Suno AI",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", // заменить на URL от Suno
        mood: "custom",
        duration: 180,
        isCustom: true
      };
      playTrack(customTrack);
      setIsGenerating(false);
      setSunoPrompt("");
      setShowSuno(false);
    }, 2000);
  };

  // === Плейлисты ===
  const saveCurrentTrackToPlaylist = () => {
    if (!currentTrack || !newPlaylistName.trim()) return;
    const name = newPlaylistName.trim();
    const updated = {
      ...playlists,
      [name]: playlists[name] ? [...playlists[name], currentTrack] : [currentTrack]
    };
    setPlaylists(updated);
    savePlaylists(updated);
    setNewPlaylistName("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
      {currentTrack && (
        <>
          <audio
            ref={audioRef}
            src={currentTrack.url}
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={onTimeUpdate}
            onEnded={onEnded}
            controls

          />

          <div className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="flex items-end justify-center space-x-1 h-8">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/70 rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${10 + Math.random() * 20}px` : "4px",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{currentTrack.title}</h4>
                <p className="text-sm text-gray-500">{currentTrack.artist}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => playTrack(mockTracks[mood as keyof typeof mockTracks]?.[0] || mockTracks.focus[0])}
                  className="text-gray-400 hover:text-purple-600"
                  title="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                {currentTrack.isCustom && (
                  <span title="Сгенерировано Suno AI">
  <Sparkles className="w-4 h-4 text-yellow-500" />
</span>
                )}
              </div>
            </div>

            <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={(e) => {
                const t = parseFloat(e.target.value);
                setProgress(t);
                if (audioRef.current) audioRef.current.currentTime = t;
              }}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 mb-1"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button onClick={togglePlay} className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <div className="flex items-center space-x-2">
                <VolumeX className="w-4 h-4 text-gray-500" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVolume(v);
                    if (audioRef.current) audioRef.current.volume = v;
                  }}
                  className="w-20 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-600"
                />
                <Volume2 className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Плейлисты */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="Название плейлиста"
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                />
                <button
                  onClick={saveCurrentTrackToPlaylist}
                  className="bg-green-600 text-white p-1.5 rounded"
                  title="Сохранить в плейлист"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suno AI */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setShowSuno(!showSuno)}
                className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800"
              >
                <Sparkles className="w-3 h-3" />
                Создать трек с Suno AI
              </button>

              {showSuno && (
                <div className="mt-2 flex gap-1">
                  <input
                    type="text"
                    value={sunoPrompt}
                    onChange={(e) => setSunoPrompt(e.target.value)}
                    placeholder="Опиши трек: 'лоу-фай для кодинга с джазовыми аккордами'..."
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                  />
                  <button
                    onClick={generateWithSuno}
                    disabled={isGenerating}
                    className="bg-yellow-500 text-black p-1.5 rounded disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <div className="w-3 h-3 border-2 border-transparent border-t-black rounded-full animate-spin" />
                    ) : (
                      <Send className="w-3 h-3" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
``