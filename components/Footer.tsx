export default function Footer() {
  const socials = [
    { name: "Telegram",   icon: "Telegram", url: "https://t.me/microverse_fun" },
    { name: "Facebook",   icon: "Facebook", url: "https://facebook.com/groups/microverse.fun" },
    { name: "TikTok",     icon: "TikTok",   url: "https://tiktok.com/@microverse" },
    { name: "YouTube",    icon: "YouTube",  url: "https://youtube.com/@microverse" },
    { name: "X",          icon: "X",        url: "https://x.com/microverse_fun" },
    { name: "VK",         icon: "VK",       url: "https://vk.com/microverse" },
    { name: "Instagram",  icon: "Instagram",url: "https://instagram.com/microverse.fun" },
  ];

  return (
    <footer className="border-t border-cyan-400/20 py-16 mt-32 bg-black/95">
      <div className="container mx-auto px-6 text-center">
        <div className="flex flex-wrap justify-center gap-10 mb-10">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              title={s.name}
            >
              <span className="text-4xl transition-all duration-500 group-hover:scale-150 group-hover:drop-shadow-[0_0_30px_currentColor]">
                {s.icon}
              </span>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-cyan-300 whitespace-nowrap">
                {s.name}
              </span>
            </a>
          ))}
        </div>
        <div className="text-gray-500 text-sm space-x-4">
          © 2025 MICROVERSE •{" "}
          <a href="/privacy" className="underline hover:text-cyan-400">Privacy</a> •{" "}
          <a href="/about" className="underline hover:text-cyan-400">About</a>
        </div>
      </div>
    </footer>
  );
}
