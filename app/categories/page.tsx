const categories = [
  { name: "Продуктивность", count: 142, description: "Автоматизация задач и управление временем" },
  { name: "Видео & Анимация", count: 98, description: "Генерация и редактирование видео" },
  { name: "Генерация изображений", count: 87, description: "AI-художники и фоторедакторы" },
  { name: "Текст и контент", count: 134, description: "Писатели, переводчики, копирайтинг" },
  { name: "Аудио & Музыка", count: 67, description: "Синтез голоса и генерация треков" },
  { name: "Код и разработка", count: 112, description: "Ассистенты для программистов" },
];

export default function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">Категории</h1>
      <p className="text-gray-400 mb-12">Выберите интересующую область</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.name} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
            <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
            <p className="text-gray-400 mb-4">{cat.description}</p>
            <p className="text-purple-400 font-semibold">{cat.count} инструментов</p>
          </div>
        ))}
      </div>
    </div>
  );
}