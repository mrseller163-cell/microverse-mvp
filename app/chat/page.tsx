"use client";

import BackButton from '../../components/BackButton';
import ConsentBanner from '../../components/ConsentBanner';
import LegalNoticeRU from '../../components/LegalNoticeRU';

export default function Page() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <BackButton />
      <h1>💬 Чат</h1>
      <p>Реальный чат в разработке. Сейчас — демонстрация.</p>
      <ConsentBanner />
      <LegalNoticeRU />
    </div>
  );
}