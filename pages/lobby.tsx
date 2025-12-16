"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase/client";
import { useRouter } from "next/router";

export default function Lobby() {
  const [code, setCode] = useState("");
  const router = useRouter();

  async function createRoom() {
    const codeGen = Math.random().toString(36).slice(2, 7).toUpperCase();
    const { data, error } = await supabase
      .from("rooms")
      .insert({ code: codeGen })
      .select()
      .single();

    if (!error && data) {
      router.push(`/room/${data.code}`);
    }
  }

  const joinRoom = () => {
    if (code.trim()) {
      router.push(`/room/${code.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="p-8 flex flex-col gap-4">
      <button className="btn-primary" onClick={createRoom}>
        Создать комнату
      </button>
      <div className="flex gap-2">
        <input
          className="input"
          placeholder="Код комнаты"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && joinRoom()}
        />
        <button className="btn" onClick={joinRoom}>
          Войти
        </button>
      </div>
    </div>
  );
}
