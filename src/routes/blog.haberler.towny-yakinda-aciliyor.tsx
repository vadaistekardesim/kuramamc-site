import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { LogIn, UserPlus, Server, MessageCircle, ChevronRight, Home, Calendar, User, Eye, MessageSquare } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { getServerStatus } from "@/lib/site.functions";

// Manuel (statik) rota tanımı
export const Route = createFileRoute("/blog/haberler/towny-yakinda-aciliyor")({
  component: TownyNewsDetail,
});

const SERVER_IP = "oyna.kuramamc.com.tr";

export function TownyNewsDetail() {
  // Manuel içerik verisi (MrShivada ve skin kafası entegreli)
  const news = {
    title: "KuramaMC Towny Sunucusu Yakında Açılıyor!",
    content: "Gelişmiş teması ve eşsiz mekanikleriyle yeni Towny sunucumuz çok yakın...",
    author: "MrShivada",
    date: "27.06.2026",
    views: 1,
    comments: 0
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      
      {/* Üst Alan: Header ve Arka Plan */}
      <section className="relative isolate overflow-hidden pb-12">
        <img src={heroBg} alt="" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-500/20 via-background/80 to-background" />
        
        {/* Navbar */}
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
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
            <a href="/" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Ana Sayfa</a>
            <a href="/#status" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Launcher</a>
            <a href="/#news" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Haberler</a>
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

        {/* KuramaMC Logosu */}
        <div className="relative z-10 mx-auto flex flex-col items-center pt-8 text-center">
          <img src={logo} alt="KuramaMC" width={96} height={96} className="drop-shadow-[0_8px_24px_oklch(0.7_0.2_60/0.4)]" />
        </div>
      </section>

      {/* İçerik Alanı */}
      <main className="mx-auto max-w-4xl px-6 pb-24">
        
        {/* Yol Haritası (Breadcrumb) */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-card/60 px-4 py-2.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <a href="/" className="flex items-center gap-1 hover:text-foreground transition">
            <Home className="size-3.5" /> Ana Sayfa
          </a>
          <ChevronRight className="size-3 text-white/30" />
          <a href="/#news" className="hover:text-foreground transition">Haber</a>
          <ChevronRight className="size-3 text-white/30" />
          <span className="text-white/40">Bildiri</span>
          <ChevronRight className="size-3 text-white/30" />
          <span className="text-primary font-semibold truncate max-w-[240px]">{news.title}</span>
        </div>

        {/* Haber Detay Kutusu */}
        <article className="overflow-hidden rounded-3xl border border-white/10 bg-card/70 backdrop-blur-md shadow-2xl">
          <div className="p-6 sm:p-8">
            
            {/* Başlık */}
            <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl text-foreground mb-6">
              {news.title}
            </h1>

            {/* Profil Çubuğu */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
              <div className="flex items-center gap-3">
                {/* İstediğin Skin Kafası Linki */}
                <img
                  src="https://minotar.net/avatar/MrShivada/38"
                  alt={news.author}
                  width={38}
                  height={38}
                  className="rounded-md bg-white/5 ring-1 ring-white/10 shadow-md"
                />
                <div>
                  <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <User className="size-3.5 text-primary" /> {news.author}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Calendar className="size-3" /> {news.date}
                  </div>
                </div>
              </div>

              {/* Sayaç İkonları */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  <Eye className="size-3.5 text-amber-500/80" /> {news.views}
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  <MessageSquare className="size-3.5 text-primary" /> {news.comments}
                </div>
              </div>
            </div>

            {/* Haber Metni */}
            <div className="prose prose-invert max-w-none text-muted-foreground text-base leading-relaxed">
              <p>{news.content}</p>
            </div>

          </div>
        </article>

        {/* Alt Kısım Bildirimi */}
        <div className="mt-6 rounded-2xl bg-gradient-amber/10 border border-amber-500/20 p-4 text-center text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-sm">
          Yorumlar Kapalı
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-muted-foreground">
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
