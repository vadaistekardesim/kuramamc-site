// src/routes/blog.tsx
import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import { Calendar, User, ArrowRight, BookOpen, Eye, MessageSquare, ChevronRight, Home, Server, MessageCircle, LogIn, UserPlus } from 'lucide-react';
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { getServerStatus } from "@/lib/site.functions";

const SERVER_IP = "oyna.kuramamc.com.tr";

// GELİŞMİŞ TEMA KONSEPTİNE UYGUN BAŞTAN DİZAYN EDİLEN HABER VERİLERİ
const MANUAL_NEWS = [
  {
    _id: "1",
    slug: "towny-yakinda-aciliyor",
    tag: "DUYURU",
    title: "⚔️ KuramaMC Gelişmiş Towny Dünyası Kapılarını Açıyor!",
    author: "MrShivada",
    excerpt: "Gelişmiş teması, eşsiz mekanikleri ve kusursuz ağ mimarisiyle yeni Towny sunucumuz çok yakın...",
    body: `Değerli KuramaMC topluluğu ve asil kasaba liderleri,

Uzun süredir arka planda titizlikle yürüttüğümüz, her bir detayı ince ince işlenen gelişmiş Towny projemizin sonuna yaklaştık! Standart ve birbirini tekrar eden Towny deneyimlerinden tamamen uzak, oyuncu odaklı ve modern sistemlerle donatılmış yepyeni bir çağ başlatıyoruz.

🚀 Öne Çıkan Gelişmiş Sistemler & Özellikler:

• Optimize Edilmiş Ağ Mimarisi: Sıfır gecikme (lag) ve yüksek TPS garantisiyle kesintisiz bir savaş ve üretim deneyimi.
• Özel Geliştirilmiş Mekanikler: Kasabanızı büyütürken ve krallığınızı kurarken derin stratejiler oluşturabileceğiniz benzersiz eklentiler.
• Gelişmiş Ekonomi ve Ticaret: Tamamen oyuncuların yön verdiği, dengeli ve rekabetçi bir piyasa ekosistemi.
• Kusursuz Görsel Tasarım: KuramaMC kalitesini her detayda hissettiren arayüzler ve özel içerikler.

Açılış tarihi, açılışa özel büyük etkinlik takvimi, spawner ve başlangıç kiti detayları çok yakında Discord sunucumuz üzerinden eş zamanlı olarak duyurulacaktır. Kendi krallığınızı kurmaya ve bu büyük macerada yerinizi almaya hazır olun!

Takipte kalın, gözünüz bizde olsun.`,
    createdAt: "2026-06-27T13:25:00.000Z",
    views: 1,
    comments: 0
  }
];

export const Route = createFileRoute('/blog')({
  loader: async () => {
    return { news: MANUAL_NEWS };
  },
  component: BlogComponent,
});

function BlogComponent() {
  const { news } = Route.useLoaderData();
  const location = useLocation();

  // /blog/haberler/... linkine girildiyse sadece detay sayfasını basar
  const isDetailActive = location.pathname.includes('/blog/haberler/');

  if (isDetailActive) {
    // URL'deki slug değerini bulup eşleşen haberin tüm içeriğini çekiyoruz
    const currentSlug = location.pathname.split('/').pop();
    const activeNews = news.find(n => n.slug === currentSlug) || news[0];

    return (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        
        {/* Üst Alan: Header ve Arka Plan Görselleri */}
        <section className="relative isolate overflow-hidden pb-12">
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
              <Link to="/" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Ana Sayfa</Link>
              <a href="/#status" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Launcher</a>
              <Link to="/blog" className="rounded-full px-4 py-2 text-sm text-foreground transition">Haberler</Link>
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

        {/* Sayfa İçerik Alanı */}
        <main className="mx-auto max-w-4xl px-6 pb-24">
          
          {/* Breadcrumb (Yol Haritası) */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-card/60 px-4 py-2.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Link to="/" className="flex items-center gap-1 hover:text-foreground transition">
              <Home className="size-3.5" /> Ana Sayfa
            </Link>
            <ChevronRight className="size-3 text-white/30" />
            <Link to="/blog" className="hover:text-foreground transition">Haber</Link>
            <ChevronRight className="size-3 text-white/30" />
            <span className="text-white/40">Bildiri</span>
            <ChevronRight className="size-3 text-white/30" />
            <span className="text-primary font-semibold truncate max-w-[240px]">{activeNews.title}</span>
          </div>

          {/* Ana Haber İçerik Kutusu (Yazıların Tamamı Burada Yüklenir) */}
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-card/70 backdrop-blur-md shadow-2xl">
            <div className="p-6 sm:p-8">
              
              {/* Haber Başlığı */}
              <h1 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl text-foreground mb-6">
                {activeNews.title}
              </h1>

              {/* Profil ve Bilgi Çubuğu */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src="https://minotar.net/avatar/MrShivada/38"
                    alt={activeNews.author}
                    width={38}
                    height={38}
                    className="rounded-md bg-white/5 ring-1 ring-white/10 shadow-md"
                  />
                  <div>
                    <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <User className="size-3.5 text-primary" /> {activeNews.author}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Calendar className="size-3" /> {new Date(activeNews.createdAt).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                </div>

                {/* Sayaçlar */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                    <Eye className="size-3.5 text-amber-500/80" /> {activeNews.views}
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                    <MessageSquare className="size-3.5 text-primary" /> {activeNews.comments}
                  </div>
                </div>
              </div>

              {/* Yeni Tasarlanan Uzun Haber Metni (Dinamik Devamı) */}
              <div className="prose prose-invert max-w-none text-muted-foreground text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {activeNews.body}
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

  // --- BURASI ANA BLOG LİSTELEME EKRANI (LİSTE HALİ) ---
  return (
    <div className="min-h-screen bg-[#0b0c10] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Başlık Alanı */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm font-medium mb-4 border border-orange-500/20">
            <BookOpen size={16} />
            <span>KuramaMC Günlükleri</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Haberler & Güncellemeler
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Sunucumuzla ilgili en son gelişmeleri ve yama notlarını buradan takip edebilirsiniz.
          </p>
        </div>

        {/* Haber Kartları Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article 
              key={item._id} 
              className="group flex flex-col bg-[#151a23] rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div className="p-6 flex flex-col flex-grow">
                {/* Tag / Kategori */}
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-orange-500/10 text-orange-500 font-bold text-xs px-2.5 py-1 rounded border border-orange-500/20 uppercase">
                    {item.tag}
                  </span>
                  <span className="text-xs flex items-center gap-1 text-gray-500">
                    <Calendar size={12} />
                    {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>

                {/* Başlık */}
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                  {item.title}
                </h2>

                {/* Özet */}
                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                  {item.excerpt}
                </p>

                {/* Alt Bilgiler ve Link */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-auto">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <User size={12} className="text-orange-500" />
                    <span>{item.author}</span>
                  </div>
                  
                  <Link 
                    to={`/blog/haberler/${item.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500 group-hover:text-orange-400"
                  >
                    Detaylar 
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
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
