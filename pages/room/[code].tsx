"use client";
import { useEffect, useState, type ComponentType } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { RoomChannel } from "../../lib/realtime/room";

type GameViewProps = { room: RoomChannel };
const GameView = dynamic(() => import("../../lib/game/GameView"), {
  ssr: false,
}) as ComponentType<GameViewProps>;

interface Player {
  id: string;
  name: string;
}

export default function RoomPage() {
  const router = useRouter();
  const { code } = router.query;

  const [room, setRoom] = useState<RoomChannel | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!router.isReady || typeof code !== "string") return;

    const rc = new RoomChannel(code);
    setRoom(rc);

    const playerId = crypto.randomUUID();
    const playerName = `Player-${Math.floor(Math.random() * 9999)}`;

    rc.join({ id: playerId, name: playerName });
    rc.onPresence(setPlayers);

    return () => {
      rc.leave();
    };
  }, [router.isReady, code]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">
        Комната #{String(code).toUpperCase()}
      </h1>
      <p>Игроки: {players.map((p) => p.name).join(", ")}</p>
      {room && <GameView room={room} />}
    </div>
  );
}
