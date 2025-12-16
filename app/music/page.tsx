"use client";

import BackButton from '../../components/BackButton';
import ConsentBanner from '../../components/ConsentBanner';
import LegalNoticeRU from '../../components/LegalNoticeRU';

export default function Page() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <BackButton />
      <h1>🎧 Музыка</h1>
      <iframe
        width="100%"
        height="166"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/123456789&color=%23ff5500&auto_play=false"
        frameBorder="0"
        allow="autoplay"
      ></iframe>
      <ConsentBanner />
      <LegalNoticeRU />
    </div>
  );
}