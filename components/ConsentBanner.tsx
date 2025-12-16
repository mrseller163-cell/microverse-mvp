import { useEffect, useState } from "react";
import { useLang } from "../lib/i18n";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const hasConsented = typeof window !== "undefined" ? localStorage.getItem("consent") : "true";
    if (!hasConsented) setVisible(true);
  }, []);

  const accept = async () => {
    try {
      localStorage.setItem("consent", "true");
      setVisible(false);
      await fetch("/api/consent", { method: "POST" });
    } catch (e) {
      console.error("Consent publish failed", e);
    }
  };

  if (!visible) return null;
  return (
    <div style={{position:"fixed", left:0, right:0, bottom:0, background:"#111", color:"#fff", padding:"12px 16px", zIndex:100}}>
      <div style={{maxWidth:960, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12}}>
        <span>
          {lang === "ru"
            ? "Мы используем куки для улучшения работы сайта. Продолжая, вы соглашаетесь."
            : "We use cookies to improve your experience. By continuing, you consent."}
        </span>
        <button
          onClick={accept}
          style={{padding:"8px 14px", background:"#fff", color:"#111", borderRadius:8, border:"1px solid #444"}}
        >
          {lang === "ru" ? "ОК" : "OK"}
        </button>
      </div>
    </div>
  );
}
