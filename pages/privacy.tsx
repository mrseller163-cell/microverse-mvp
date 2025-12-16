"use client";

import LegalNoticeRU from "../components/LegalNoticeRU";
import { useLang } from "../lib/i18n";
import BackButton from "../components/BackButton";

export default function PrivacyPage() {
  const { lang } = useLang();

  return (
    <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
      <BackButton />

      <h1>
        {lang === "ru" ? "Политика конфиденциальности" : "Privacy Policy"}
      </h1>

      <p style={{ marginTop: 12 }}>
        {lang === "ru"
          ? "Мы уважаем вашу приватность и не собираем лишних данных. Все данные используются только для работы сервиса."
          : "We respect your privacy and collect only minimal data required for the service to function."}
      </p>

      <p style={{ marginTop: 12 }}>
        {lang === "ru"
          ? "Вы можете запросить экспорт или удаление данных в разделе «Мои данные»."
          : "You can request data export or deletion in the My Data section."}
      </p>

      <LegalNoticeRU />
    </div>
  );
}
