"use client";

import BackButton from '../../components/BackButton';
import ConsentBanner from '../../components/ConsentBanner';
import LegalNoticeRU from '../../components/LegalNoticeRU';

export default function Page() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <BackButton />
      <h1>🎥 Видео</h1>
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Видео"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <ConsentBanner />
      <LegalNoticeRU />
    </div>
  );
}