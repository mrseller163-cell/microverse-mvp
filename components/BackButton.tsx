"use client";

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.back()}
      style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        background: 'linear-gradient(45deg, #00f0ff, #0090ff)',
        color: '#0c0c14',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        zIndex: 10
      }}
    >
      ← Назад
    </button>
  );
}
