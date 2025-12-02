"use client";
import { useState } from "react";
import { kvRateLimit } from "../lib/utils";

export default function DeleteAccount({ user }: { user: { email: string } }) {
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  const go = async () => {
    const rate = await kvRateLimit(`delete:${user.email}`, 3, 3600);
    if (!rate.allowed) return setMsg("Слишком много попыток. Подожди час.");

    // Здесь будет реальный запрос к /api/delete-request (пока заглушка)
    setMsg("Письмо с подтверждением отправлено на " + user.email);
    setDone(true);
  };

  if (done) return <p className="text-3xl text-green-400 text-center">Письмо отправлено!</p>;

  return (
    <div className="glass p-12 rounded-3xl max-w-lg mx-auto text-center">
      <h2 className="text-4xl mb-8">Удалить аккаунт навсегда?</h2>
      <p className="text-gray-400 mb-10">Все игры и данные будут удалены без возможности восстановления.</p>
      <button onClick={go} className="px-16 py-8 bg-red-600 rounded-full text-3xl hover:bg-red-700 transition-all">
        Удалить навсегда
      </button>
      <p className="mt-6 text-gray-400">{msg}</p>
    </div>
  );
}
