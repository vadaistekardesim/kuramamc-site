// src/routes/magaza.tsx
import { createFileRoute, Link, useNavigate, useParams } from '@tanstack/react-router';
import { ChevronRight, Home, ShoppingBag, Layers, ShieldCheck } from 'lucide-react';

// Görsellerdeki koyu lacivert/siyah temalı HanedanMC esintili alt oyun ve kategori verileri
const GAME_MODES = {
  towny: {
    title: "Towny",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop", // Örnek Towny çizimi/görseli
    categories: [
      { id: "vip-uyelikler", title: "VIP ÜYELİKLER", image: "https://placehold.co/600x400/0f172a/fff?text=VIP" },
      { id: "kasa-anahtarlari", title: "KASA ANAHTARLARI", image: "https://placehold.co/600x400/0f172a/fff?text=KASA" },
      { id: "nadir-esyalar", title: "NADİR EŞYALAR", image: "https://placehold.co/600x400/0f172a/fff?text=EŞYA" },
      { id: "paketler", title: "PAKETLER", image: "https://placehold.co/600x400/0f172a/fff?text=PAKET" },
      { id: "kasaba-fly", title: "KASABA FLY", image: "https://placehold.co/600x400/0f172a/fff?text=FLY" },
      { id: "spawnerler", title: "SPAWNERLER | CANAVAR DOĞURUCU", image: "https://placehold.co/600x400/0f172a/fff?text=SPAWNER" },
    ]
  },
  skyblock: {
    title: "Skyblock",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop", // Örnek Skyblock/Ada çizimi
    categories: [
      { id: "vip-uyelikler", title: "VIP ÜYELİKLER", image: "https://placehold.co/600x400/0f172a/fff?text=VIP" },
      { id: "kasa-anahtarlari", title: "KASA ANAHTARLARI", image: "https://placehold.co/600x400/0f172a/fff?text=KASA" },
      { id: "nadir-esyalar", title: "NADİR EŞYALAR", image: "https://placehold.co/600x400/0f172a/fff?text=EŞYA" },
      { id: "paketler", title: "PAKETLER", image: "https://placehold.co/600x400/0f172a/fff?text=PAKET" },
      { id: "ada-fly", title: "ADA FLY", image: "https://placehold.co/600x400/0f172a/fff?text=FLY" },
      { id: "spawnerler", title: "SPAWNERLER | CANAVAR DOĞURUCU", image: "https://placehold.co/600x400/0f172a/fff?text=SPAWNER" },
    ]
  }
};

export const Route = createFileRoute('/magaza')({
  component: MagazaComponent,
});

function MagazaComponent() {
  // TanStack Router parametrelerini (veya arama parametrelerini) projenin router yapısına göre yakala.
  // Burada tek sayfada tüm kırılımları simüle etmek ve yönlendirmek için state veya alt route parametresi kullanabilirsin.
  // Örnek kullanım kolaylığı açısından alt kırılımları state tabanlı simüle ediyoruz, gerçek router linklerine tam uyumludur.
  const params = useParams({ strict: false }) as { mode?: 'towny' | 'skyblock', cat?: string };
  const navigate = useNavigate();

  // Rota Kontrolü (Simülasyon veya state ile kontrol edilebilir, projenin TanStack /magaza/$mode/$cat yapısına bağlanabilir)
  const currentMode = params.mode; 
  const currentCat = params.cat;

  return (
    <div className="min-h-screen bg-[#0b0d19] text-slate-200 antialiased font-sans select-none pb-24">
      
      {/* İnce Üst Bilgilendirme Çubuğu */}
      <div className="border-b border-white/5 bg-black/20 py-2 px-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-amber-500" />
            <span>GÜVENLİ ÖDEME: PayTR & Shopier API Entegrasyonu Aktif</span>
          </div>
          <div className="hidden sm:block">KuramaMC Network Mağazası v2.0</div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-10">
        
        {/* Breadcrumb - image_336bc3.jpg dosyasındaki şık navigasyon barı */}
        <div className="mb-10 flex items-center gap-2 rounded-xl bg-[#0f1224] border border-white/5 p-4 text-xs font-semibold text-slate-400 shadow-md">
          <Link to="/" className="flex items-center gap-1 hover:text-white transition">
            <Home className="size-3.5" />
          </Link>
          <ChevronRight className="size-3 text-slate-600" />
          <Link to="/magaza" className={`hover:text-white transition ${!currentMode ? 'text-amber-500 font-bold' : ''}`}>
            Mağaza
          </Link>
          {currentMode && (
            <>
              <ChevronRight className="size-3 text-slate-600" />
              <span className={`capitalize ${!currentCat ? 'text-amber-500 font-bold' : ''}`}>{currentMode}</span>
            </>
          )}
          {currentCat && (
            <>
              <ChevronRight className="size-3 text-slate-600 text-slate-600" />
              <span className="text-amber-500 font-bold uppercase font-mono">{currentCat.replace('-', ' ')}</span>
            </>
          )}
        </div>

        {/* --- 1. ADIM: ANA MAĞAZA ALANI (/magaza) --- */}
        {!currentMode && !currentCat && (
          <div className="space-y-12">
            {/* Mağaza Hero Başlık Yapısı (image_3367fe.jpg referansı) */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#11142d] to-[#0d0f22] border border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold tracking-widest uppercase">
                  <ShoppingBag className="size-3" /> Mağaza
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-display">KURAMAMC MAĞAZASI</h1>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Resmi KuramaMC Mağazasına Hoşgeldiniz. Bu, oyuncu deneyiminizi geliştirmek için yerinizdir. Mod seçimi yaparak ürünleri listeyebilirsiniz.
                </p>
              </div>
              {/* image_3367fe.jpg dosyasındaki sağ taraftaki maskot/vurgu alanı */}
              <div className="relative size-40 bg-[#161a3a] rounded-2xl border border-white/5 flex items-center justify-center p-4 shadow-inner group">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                <span className="text-4xl">🦜</span> {/* Görseldeki Papağan maskotuna atıf */}
              </div>
            </div>

            {/* Kategoriler Başlığı */}
            <div>
              <h2 className="text-2xl font-black text-white mb-6 tracking-wide flex items-center gap-2">
                <Layers className="size-5 text-amber-500" /> Kategoriler
              </h2>
              
              {/* Sadece Towny ve Skyblock Kartları (image_3367fe.jpg düzeni) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(GAME_MODES).map(([key, mode]) => (
                  <div 
                    key={key}
                    onClick={() => navigate({ to: `/magaza`, search: { mode: key } as any })} // Projenin yapısına göre link düzenlenebilir
                    className="bg-[#0f1124] border border-white/5 rounded-2xl p-4 cursor-pointer hover:border-amber-500/30 shadow-lg hover:shadow-amber-500/5 transition duration-300 group flex flex-col justify-between"
                  >
                    <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/5">
                      <img src={mode.image} alt={mode.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1124] via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-display">{mode.title}</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#161933] group-hover:bg-amber-500 text-slate-300 group-hover:text-black font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition duration-300 flex items-center justify-center gap-1">
                      {mode.title} Giriş <ChevronRight className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- 2. ADIM: ALT KATEGORİ SEÇİM ALANI (/magaza/towny veya /magaza/skyblock) --- */}
        {currentMode && !currentCat && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-2xl font-black text-white tracking-wide uppercase font-display">
                {currentMode} Kategorileri
              </h2>
              <button 
                onClick={() => navigate({ to: '/magaza' })}
                className="text-xs bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white px-4 py-2 rounded-lg border border-white/5 transition"
              >
                Geri Dön
              </button>
            </div>

            {/* image_336bc3.jpg dosyasındaki 3'lü Grid Düzeni */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GAME_MODES[currentMode as keyof typeof GAME_MODES]?.categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => navigate({ to: `/magaza`, search: { mode: currentMode, cat: cat.id } as any })}
                  className="bg-[#0f1124] border border-white/5 rounded-2xl p-4 cursor-pointer hover:border-amber-500/30 shadow-lg hover:shadow-amber-500/5 transition duration-300 group flex flex-col justify-between"
                >
                  <div className="relative h-36 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/5 flex items-center justify-center">
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1124] via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                      <span className="text-lg font-black text-white tracking-wide drop-shadow-md group-hover:text-amber-400 transition font-display">{cat.title}</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#161933] group-hover:bg-amber-500 text-slate-300 group-hover:text-black font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition duration-300 flex items-center justify-center gap-1">
                    {cat.title} <ChevronRight className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 3. ADIM: KATEGORİ İÇERİKLERİ BOŞ ALANLAR (/magaza/towny/vip-uyelikler vb.) --- */}
        {currentMode && currentCat && (
          <div className="rounded-3xl border border-white/5 bg-[#0f1124] p-12 text-center space-y-4">
            <div className="text-4xl">🛠️</div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider font-mono">
              {currentMode} &gt; {currentCat.replace('-', ' ')} Alanı
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Bu kategori içeriği şu anda boş bırakılmıştır. Ürün kartlarını, fiyat parametrelerini ve custom paket detaylarını buraya dilediğin gibi ekleyip ayarlayabiliriz.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => navigate({ to: `/magaza`, search: { mode: currentMode } as any })}
                className="text-xs bg-amber-500 text-black font-bold px-5 py-2.5 rounded-xl hover:bg-amber-400 transition"
              >
                Kategorilere Geri Dön
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
