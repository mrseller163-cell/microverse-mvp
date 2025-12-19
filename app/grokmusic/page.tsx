"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Zap,
  Sparkles
} from "lucide-react";

type Track = {
  id: string;
  title: string;
  artist: string;
  url: string;
  mood: string;
  duration: number;
};

const MOCK_TRACKS: Record<string, Track[]> = {
  focus: [
    {
      id: "1",
      title: "Deep Concentration",
      artist: "AI LoFi Lab",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      mood: "focus",
      duration: 184
    },
    {
      id: "2",
      title: "Code Flow",
      artist: "Neural Beats",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      mood: "focus",
      duration: 210
    }
  ],
  chill: [
    {
      id: "3",
      title: "Evening Rain",
      artist: "Ambient AI",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      mood: "chill",
      duration: 198
    },
    {
      id: "4",
      title: "Calm Mind",
      artist: "Zen Generator",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      mood: "chill",
      duration: 176
    }
  ],
  energy: [
    {
      id: "5",
      title: "Productivity Boost",
      artist: "Synthwave AI",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      mood: "energy",
      duration: 205
    }
  ],
  "deep-work": [
    {
      id: "6",
      title: "Neural Focus",
      artist: "Brainwave Studio",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      mood: "deep-work",
      duration: 220
    }
  ]
};

export default function GrokMusicPage() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mood, setMood] = useState("focus");

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const tracks = MOCK_TRACKS[mood] || MOCK_TRACKS.focus;
    if (tracks.length > 0 && (!currentTrack || currentTrack.mood !== mood)) {
      setCurrentTrack(tracks[0]);
    }
  }, [mood, currentTrack]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const onProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Назад на microverse.fun
          </Link>

          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full mb-4">
            <Zap className="w-5 h-5" />
            <span className="font-bold">GrokMusic</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI-саундтрек под вашу задачу
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Генеративная музыка, подобранная ИИ под ваше настроение, задачу или
            текущий AI-инструмент
          </p>
        </div>

        {/* Плеер */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700">
          {currentTrack && (
            <>
              <audio
                ref={audioRef}
                src={currentTrack.url}
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
                onEnded={onEnded}
                autoPlay={isPlaying}
              />

              <div className="text-center mb-8">
                <div className="flex items-end justify-center space-x-1 h-12 mb-6">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-purple-500 rounded-full transition-all duration-300"
                      style={{
                        height: isPlaying
                          ? `${20 + Math.random() * 40}px`
                          : "8px"
                      }}
                    />
                  ))}
                </div>

                <h2 className="text-2xl font-bold mb-1">
                  {currentTrack.title}
                </h2>
                <p className="text-purple-400">{currentTrack.artist}</p>
              </div>

              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={progress}
                  onChange={onProgressChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <button
                  onClick={() => playTrack(MOCK_TRACKS[mood][0])}
                  className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                  <RotateCcw className="w-5 h-5" />
                  Заново
                </button>

                <button
                  onClick={togglePlay}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </button>

                <div className="flex items-center gap-3 text-gray-400">
                  <VolumeX className="w-5 h-5" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={onVolumeChange}
                    className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <Volume2 className="w-5 h-5" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Выбор настроения */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Выберите настроение
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(MOCK_TRACKS).map(key => (
              <button
                key={key}
                onClick={() => setMood(key)}
                className={`px-5 py-3 rounded-xl font-medium capitalize transition-all ${
                  mood === key
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {key === "deep-work" ? "Deep Work" : key}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-800/50">
          <h3 className="text-xl font-bold mb-2">
            Слушайте GrokMusic прямо в каталоге
          </h3>
          <p className="text-gray-400 mb-4">
            Откройте любой AI-инструмент — и мы предложим идеальный саундтрек
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium"
          >
            Перейти к инструментам →
          </Link>
        </div>

        {/* Плейлисты */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Ваши плейлисты</h3>
          <div className="text-gray-400 text-sm bg-gray-800/40 border border-gray-700 rounded-xl p-4">
            Плейлисты сохраняются автоматически при воспроизведении трека.
          </div>
        </div>

        {/* Suno AI */}
        <div className="mt-8 p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl border border-yellow-800/30">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Создать трек с Suno AI
          </h3>
          <p className="text-sm text-gray-300 mb-3">
            Опишите музыку — и мы сгенерируем её за вас.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="энергичный синтвейв для стартапа"
              className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white"
            />
            <button className="bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500">
              Сгенерировать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
