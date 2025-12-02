"use client"; import { useRouter } from "next/navigation";
export default function Terms() { const r = useRouter(); return (
  <div className="min-h-screen bg-cosmic-black text-white p-10">
    <div className="max-w-4xl mx-auto glass p-10 rounded-3xl">
      <h1 className="text-4xl mb-8">Terms of Service</h1>
      <p className="mb-6">No illegal content, no spam, no harm.</p>
      <p className="mb-6">We can delete anything that violates this.</p>
      <button onClick={()=>r.back()} className="mt-10 px-8 py-4 bg-cosmic-gradient rounded-full">← Back</button>
    </div>
  </div>
);}
