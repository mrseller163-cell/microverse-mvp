export default function SocialLinks() {
  const socials = [
    { name: "Facebook", icon: "📘", url: "https://facebook.com/microverse", color: "hover:text-blue-400" },
    { name: "TikTok", icon: "🎵", url: "https://tiktok.com/@microverse", color: "hover:text-black" },
    { name: "Telegram", icon: "📱", url: "https://t.me/microverse", color: "hover:text-blue-300" },
    { name: "YouTube", icon: "📺", url: "https://youtube.com/microverse", color: "hover:text-red-500" },
    { name: "Twitter", icon: "🐦", url: "https://twitter.com/microverse", color: "hover:text-blue-200" },
    { name: "VK", icon: "🌐", url: "https://vk.com/microverse", color: "hover:text-blue-600" },
    { name: "Instagram", icon: "📷", url: "https://instagram.com/microverse", color: "hover:text-pink-500" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-2xl transition-all duration-300 transform hover:scale-125 ${social.color}`}
          title={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
