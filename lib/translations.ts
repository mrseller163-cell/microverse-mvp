export const translations = {
  en: {
    // Navigation
    gallery: "GALLERY",
    create: "CREATE", 
    about: "ABOUT",
    privacy: "PRIVACY",
    terms: "TERMS",
    
    // Hero section
    heroTitle1: "CYBER",
    heroTitle2: "GAMES", 
    heroTitle3: "UNIVERSE",
    heroSubtitle: "Enter the digital realm. Create, play, share — all inside the neon matrix.",
    codeNow: "CODE NOW",
    viewGames: "VIEW GAMES",
    
    // Stats
    codersOnline: "CODERS ONLINE",
    neonGames: "NEON GAMES", 
    playSessions: "PLAY SESSIONS",
    
    // Games section
    topGames: "TOP CYBER GAMES",
    author: "Author",
    play: "PLAY",
    
    // Footer
    copyright: "© 2025 Microverse. Your cyber gaming universe."
  },
  ru: {
    // Navigation
    gallery: "ГАЛЕРЕЯ",
    create: "СОЗДАТЬ",
    about: "О НАС", 
    privacy: "КОНФИДЕНЦИАЛЬНОСТЬ",
    terms: "УСЛОВИЯ",
    
    // Hero section
    heroTitle1: "КИБЕР",
    heroTitle2: "ИГРЫ",
    heroTitle3: "ВСЕЛЕННАЯ", 
    heroSubtitle: "Войди в цифровое измерение. Создавай, играй, делись — всё в неоновой матрице.",
    codeNow: "КОДИРОВАТЬ",
    viewGames: "СМОТРЕТЬ ИГРЫ",
    
    // Stats
    codersOnline: "КОДЕРОВ ОНЛАЙН",
    neonGames: "НЕОНОВЫХ ИГР",
    playSessions: "ИГРОВЫХ СЕССИЙ",
    
    // Games section  
    topGames: "ТОП КИБЕРПАНК ИГРЫ",
    author: "Автор",
    play: "ИГРАТЬ",
    
    // Footer
    copyright: "© 2025 Microverse. Твоя кибер-игровая вселенная."
  }
};

export type Language = "en" | "ru";
export type TranslationKey = keyof typeof translations.en;
