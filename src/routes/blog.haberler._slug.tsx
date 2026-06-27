import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Copy, LogIn, UserPlus, Server, MessageCircle, ChevronRight, Home, Calendar, User, Eye, MessageSquare } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { getServerStatus } from "@/lib/site.functions"; // Kendi fonksiyon yoluna göre ayarlayabilirsin

// Örnek TanStack Route tanımı - url yapına göre değiştirebilirsin
export const Route = createFileRoute("/blog/haberler/$slug")({
  component: NewsDetail,
});

const SERVER_IP = "oyna.kuramamc.com.tr";

export function NewsDetail() {
  const { slug } = Route.useParams();
  const [copied, setCopied] = useState(false);
  
  // Örnek dinamik veri yapısı (Burayı kendi veri çekme fonksiyonunla besleyebilirsin)
  const [news, setNews] = useState({
    title: "KuramaMC Towny Sunucusu Yakında Açılıyor!",
    content: "Gelişmiş teması ve eşsiz mekanikleriyle yeni Towny sunucumuz çok yakın...",
    author: "Shiva",
    date: "27.06.2026",
    views: 124,
    comments: 0
  });

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Üst Kısım: image_a7eceb.jpg'deki gibi Header ve Hero Alanı */}
      <section className="relative isolate overflow-hidden pb-16">
        <img src={heroBg} alt="" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-500/20 via-background/80 to-background" />
        
        {/* Üst Menü / Navbar */}
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

        {/* Orta Logo Alanı */}
        <div className="relative z-10 mx-auto flex flex-col items-center pt-10 text-center">
          <img src={logo} alt="KuramaMC" width={96} height={96} className="drop-shadow-[0_8px_24px_oklch(0.7_0.2_60/0.4)]" />
        </div>
      </section>

      {/* İçerik Kısmı */}
      <main className="mx-auto max-w-4xl px-6 pb-24">
        
        {/* Breadcrumb (Yol Haritası) - image_a7eceb.jpg Tasarımı */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-card/60 px-4 py-2.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <a href="/" className="flex items-center gap-1 hover:text-foreground transition">
            <Home className="size-3.5" /> Ana Sayfa
          </a>
          <ChevronRight className="size-3 text-white/30" />
          <a href="/#news" className="hover:text-foreground transition">Haber</a>
          <ChevronRight className="size-3 text-white/30" />
          <span className="text-white/40">Bildiri</span>
          <ChevronRight className="size-3 text-white/30" />
          <span className="text-primary font-semibold truncate max-w-[200px]">{news.title}</span>
        </div>

        {/* Ana Haber Kartı */}
        <article className="overflow-hidden rounded-3xl border border-white/10 bg-card backdrop-blur shadow-2xl">
          <div className="p-6 sm:p-8">
            
            {/* Başlık */}
            <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl text-foreground mb-6">
              {news.title}
            </h1>

            {/* Yazar ve Meta Bilgileri Alanı */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
              <div className="flex items-center gap-3">
                {/* Minotar ile Yazar Kafası */}
                <img
                  src={`https://minotar.net/avatar/${news.author}/40`}
                  alt={news.author}
                  className="size-10 rounded-lg bg-white/5 ring-1 ring-white/10"
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

              {/* Sağ Taraf: Gösterim ve Yorum Sayaçları */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  <Eye className="size-3.5 text-amber-500/80" /> {news.views}
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  <MessageSquare className="size-3.5 text-primary" /> {news.comments}
                </div>
              </div>
            </div>

            {/* Haber Metni İçeriği */}
            <div className="prose prose-invert max-w-none text-muted-foreground text-base leading-relaxed space-y-4">
              <p>{news.content}</p>
            </div>

          </div>
        </article>

        {/* Yorumlar Alanı Başlangıcı (Gerekirse eklenebilir) */}
        <div className="mt-6 rounded-2xl bg-gradient-amber/10 border border-amber-500/20 p-4 text-center text-xs font-bold uppercase tracking-wider text-amber-300">
          Yorumlar Kapalı
        </div>

      </main>

      {/* Alt Bilgi */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} KuramaMC — Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

// Canlı çevrimiçi oyuncu dot bileşeni
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
