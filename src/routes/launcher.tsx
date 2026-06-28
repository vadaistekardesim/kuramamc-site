// src/routes/launcher.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { Download, Cpu, ShieldCheck, Zap, Server, MessageCircle, LogIn, UserPlus } from 'lucide-react';
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { getServerStatus } from "@/lib/site.functions";

const SERVER_IP = "oyna.kuramamc.com.tr";
const DOWNLOAD_LINK = "https://indirmek-istedigin-url.com/KuramaClient.exe"; // Gerçek indirme linkini buraya yaz

export const Route = createFileRoute('/launcher')({
  component: LauncherComponent,
});

function LauncherComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 select-none">
      {/* Giriş Animasyonu Stilleri */}
      <style>{`
        @keyframes customScaleUp {
          0% {
            opacity: 0;
            transform: scale(0.6) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-entrance {
          animation: customScaleUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 100ms; }
        .delay-2 { animation-delay: 200ms; }
        .delay-3 { animation-delay: 300ms; }
        .delay-4 { animation-delay: 400ms; }
      `}</style>
      
      {/* Üst Alan / Hero */}
      <section className="relative isolate overflow-hidden pb-12">
        <img src={heroBg} alt="" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-500/20 via-background/80 to-background" />
        
        {/* Navbar */}
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 opacity-0 animate-entrance">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur md:flex">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
              <Server className="size-4 text-primary" />
              <div className="text-xs leading-tight">
                <div className="font-semibold">{SERVER_IP}</div>
                <LiveDot />
              </div>
            </div>
            <a href="#" className="flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-2 text-xs font-semibold text-indigo-200 hover:bg-indigo-500/30">
              <MessageCircle className="size-4" /> Discord
            </a>
          </div>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur md:flex">
            <Link to="/" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Ana Sayfa</Link>
            <Link to="/launcher" className="rounded-full px-4 py-2 text-sm bg-white/10 text-foreground transition">Launcher</Link>
            <Link to="/blog" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Haberler</Link>
            <a href="#" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Mağaza</a>
            <a href="/#contact" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Destek</a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/5 sm:flex">
              <LogIn className="size-4" /> Giriş Yap
            </button>
            <button className="flex items-center gap-2 rounded-full bg-gradient-amber px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
              <UserPlus className="size-4" /> Kayıt Ol
            </button>
          </div>
        </header>

        {/* KuramaClient Başlık */}
        <div className="relative z-10 mx-auto flex flex-col items-center pt-8 text-center px-4">
          <img src={logo} alt="KuramaMC" width={96} height={96} className="drop-shadow-[0_8px_24px_oklch(0.7_0.2_60/0.4)] mb-6 opacity-0 animate-entrance delay-1" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4 border border-amber-500/20 backdrop-blur-sm opacity-0 animate-entrance delay-1">
            <span>KuramaClient v1.0.0</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 font-display max-w-3xl leading-tight opacity-0 animate-entrance delay-2">
            Oyun Deneyimini <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Zirveye Taşıyın</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg mb-8 opacity-0 animate-entrance delay-3">
            KuramaMC dünyası için özel olarak optimize edilen, Fabric motoruyla güçlendirilmiş resmi oyun istemcisiyle sınırları zorlayın.
          </p>

          {/* DEVASE İNDİRME BUTONU */}
          <div className="opacity-0 animate-entrance delay-4">
            <a
              href={DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 font-bold text-lg text-white shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition duration-300 hover:-translate-y-0.5 group"
            >
              <Download className="size-6 animate-pulse group-hover:scale-110 transition-transform" />
              KuramaLauncher İndir (.EXE)
            </a>
          </div>
        </div>
      </section>

      {/* Özellikler Alanı */}
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-12 opacity-0 animate-entrance delay-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Özellik 1 */}
          <div className="rounded-2xl border border-white/5 bg-card/40 p-6 backdrop-blur-sm shadow-xl">
            <div className="size-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4">
              <Zap className="size-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Devasa FPS Artışı</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fabric tabanlı özel motoru ve gömülü optimizasyon modları sayesinde oyun içi FPS değerlerinizi katlayın, donmaları sıfıra indirin.
            </p>
          </div>

          {/* Özellik 2 */}
          <div className="rounded-2xl border border-white/5 bg-card/40 p-6 backdrop-blur-sm shadow-xl">
            <div className="size-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-4">
              <Cpu className="size-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Discord Rich Presence</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Oynadığınız dünyayı, kasaba durumunuzu veya adanızın seviyesini anlık olarak Discord profilinizde havalı bir şekilde sergileyin.
            </p>
          </div>

          {/* Özellik 3 */}
          <div className="rounded-2xl border border-white/5 bg-card/40 p-6 backdrop-blur-sm shadow-xl">
            <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-4">
              <ShieldCheck className="size-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hile Koruması & Güvenlik</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              KuramaMC ağ mimarisine tam entegre çalışan akıllı koruma sistemiyle adil ve güvenli bir oyun ortamının tadını çıkarın.
            </p>
          </div>

        </div>

        {/* Küçük Bilgilendirme Kutusu */}
        <div className="mt-12 text-center text-xs text-muted-foreground bg-white/5 border border-white/10 rounded-xl p-4 max-w-xl mx-auto">
          ⚠️ Launcher kurulum gerektirir. Sorun yaşarsanız Discord üzerinden Destek ekibimize ulaşabilirsiniz.
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-muted-foreground opacity-0 animate-entrance delay-4">
        © {new Date().getFullYear()} KuramaMC — Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

function LiveDot() {
  const [s, setS] = useState<{ online: boolean; players: number; max: number } | null>(null);
  const fetchStatus = useServerFn(getServerStatus);
  useEffect(() => {
    let cancelled = false;
    fetchStatus({ data: { host: SERVER_IP } }).then(r => { if (!cancelled) setS(r); }).catch(() => {});
    return () => { cancelled = true; };
  }, [fetchStatus]);
  return (
    <div className="flex items-center gap-1 text-muted-foreground text-[10px]">
      <span className={`size-1.5 rounded-full ${s?.online ? "bg-emerald-400" : "bg-rose-400"}`} />
      {s ? `${s.players}/${s.max} Aktif` : "..."}
    </div>
  );
}
