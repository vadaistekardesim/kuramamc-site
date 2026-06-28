// src/routes/magaza.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronRight, Home, Users, Gamepad2 } from 'lucide-react';
import { useState } from 'react';

// --- VERİ YAPISI ---
const CATEGORIES_DATA = [
  { id: "vip-uyelikler", title: "VIP ÜYELİKLER" },
  { id: "kasa-anahtarlari", title: "KASA ANAHTARLARI" },
  { id: "nadir-esyalar", title: "NADİR EŞYALAR" },
  { id: "paketler", title: "PAKETLER" },
  { id: "fly", title: "FLY AYRICALIĞI" },
  { id: "spawnerler", title: "SPAWNERLER | CANAVAR DOĞURUCU" },
];

export const Route = createFileRoute('/magaza')({
  component: MagazaComponent,
});

function MagazaComponent() {
  const [currentMode, setCurrentMode] = useState<'towny' | 'skyblock' | null>(null);
  const [currentCat, setCurrentCat] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#060813] text-slate-200 antialiased font-sans select-none pb-20">
      
      {/* 1. GERÇEK KURAMAMC NAVBARI */}
      <header className="w-full bg-[#090b16]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-2xl">
        {/* Sol Kısım: Sayıcı ve Hızlı Linkler */}
        <div className="flex items-center gap-6">
          {/* Çevrimiçi Oyuncu Sayacı */}
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-[11px] font-bold text-emerald-400 font-mono tracking-wide shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Users className="size-3.5 ml-1" />
            <span>43 / 200 AKTİF</span>
          </div>

          {/* Menü Linkleri */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-400">
            <Link to="/" className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition">ANASAYFA</Link>
            <button onClick={() => { setCurrentMode(null); setCurrentCat(null); }} className="px-3.5 py-2 rounded-xl bg-white/5 text-amber-400 border border-white/5 shadow-sm font-extrabold">MAĞAZA</button>
            <Link to="/kredi-yukle" className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition">KREDİ YÜKLE</Link>
            <Link to="/blog" className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition">HABERLER</Link>
            <Link to="/destek" className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition">DESTEK</Link>
          </nav>
        </div>

        {/* Orta Kısım: Gerçek Logo Tasarımı */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer" onClick={() => { setCurrentMode(null); setCurrentCat(null); }}>
          <span className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)] font-display">
            KURAMAMC
          </span>
          <span className="text-[9px] font-mono tracking-[0.3em] text-slate-500 font-bold -mt-0.5">DEVELOPED NETWORK</span>
        </div>

        {/* Sağ Kısım: Discord ve Giriş Butonları */}
        <div className="flex items-center gap-3">
          <a href="https://discord.gg/kuramamc" target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-1.5 bg-[#5865F2]/10 hover:bg-[#5865F2] border border-[#5865F2]/20 text-[#5865F2] hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition duration-200">
            <span>DISCORD</span>
          </a>
          <button className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-black px-4 py-2 rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.15)] transition duration-200">
            <Gamepad2 className="size-3.5" />
            GİRİŞ YAP
          </button>
        </div>
      </header>

      {/* 2. BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        <div className="flex items-center gap-2 rounded-xl bg-[#0b0d18] border border-[#14182c] px-4 py-3.5 text-xs font-semibold text-slate-400 shadow-md">
          <button onClick={() => { setCurrentMode(null); setCurrentCat(null); }} className="hover:text-white transition">
            <Home className="size-3.5" />
          </button>
          <ChevronRight className="size-3 text-slate-600" />
          <button onClick={() => { setCurrentMode(null); setCurrentCat(null); }} className={`hover:text-white transition ${!currentMode ? 'text-amber-400 font-bold' : ''}`}>
            Mağaza
          </button>
          {currentMode && (
            <>
              <ChevronRight className="size-3 text-slate-600" />
              <button onClick={() => setCurrentCat(null)} className={`hover:text-white transition capitalize ${!currentCat ? 'text-amber-400 font-bold' : ''}`}>
                {currentMode}
              </button>
            </>
          )}
          {currentCat && (
            <>
              <ChevronRight className="size-3 text-slate-600" />
              <span className="text-amber-400 font-bold uppercase font-mono">{currentCat.replace('-', ' ')}</span>
            </>
          )}
        </div>
      </div>

      {/* 3. İÇERİK ALANI */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        
        {/* KATMAN A: ANA MAĞAZA (Towny / Skyblock Seçimi) */}
        {!currentMode && !currentCat && (
          <div className="space-y-12">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a0c16] to-[#0d1020] border border-[#14182c] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-3 max-w-2xl">
                <span className="text-[11px] font-black tracking-widest text-amber-400 uppercase font-mono">OFFICIAL SHOP</span>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">KURAMAMC MAĞAZASI</h1>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  Resmi KuramaMC Mağazasına Hoşgeldiniz. Sunucumuzda ayrıcalık kazanmak ve bize destek olmak için kategorileri inceleyebilirsiniz.
                </p>
              </div>
              <div className="relative w-32 h-32 bg-[#111429] rounded-2xl border border-white/5 flex items-center justify-center shadow-inner">
                <span className="text-5xl animate-bounce">🦜</span>
              </div>
            </div>

            {/* Oyun Modları */}
            <div className="space-y-6">
              <h2 className="text-lg font-extrabold text-white tracking-tight border-l-4 border-amber-500 pl-3 uppercase">Kategoriler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Towny */}
                <div 
                  onClick={() => setCurrentMode('towny')}
                  className="bg-[#090b16] border border-[#14182c] rounded-2xl p-4 cursor-pointer hover:border-amber-500/30 transition group shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/5 flex items-center justify-center">
                    <span className="text-2xl font-black text-white tracking-widest group-hover:scale-105 transition duration-300 font-display">TOWNY</span>
                  </div>
                  <div className="w-full bg-[#11152c] text-slate-300 group-hover:bg-amber-500 group-hover:text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1">
                    TOWNY GİRİŞ <ChevronRight className="size-4" />
                  </div>
                </div>

                {/* Skyblock */}
                <div 
                  onClick={() => setCurrentMode('skyblock')}
                  className="bg-[#090b16] border border-[#14182c] rounded-2xl p-4 cursor-pointer hover:border-amber-500/30 transition group shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/5 flex items-center justify-center">
                    <span className="text-2xl font-black text-white tracking-widest group-hover:scale-105 transition duration-300 font-display">SKYBLOCK</span>
                  </div>
                  <div className="w-full bg-[#11152c] text-slate-300 group-hover:bg-amber-500 group-hover:text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1">
                    SKYBLOCK GİRİŞ <ChevronRight className="size-4" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* KATMAN B: ALT KATEGORİLER (6'lı Düzen) */}
        {currentMode && !currentCat && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#14182c] pb-4">
              <h2 className="text-lg font-extrabold text-white tracking-tight border-l-4 border-amber-500 pl-3 uppercase">
                {currentMode} Mağazası
              </h2>
              <button 
                onClick={() => setCurrentMode(null)}
                className="text-xs bg-[#11152c] border border-white/5 text-slate-400 hover:text-white px-4 py-2 rounded-xl transition"
              >
                Geri Dön
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATEGORIES_DATA.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setCurrentCat(cat.id)}
                  className="bg-[#090b16] border border-[#14182c] rounded-2xl p-4 cursor-pointer hover:border-amber-500/30 transition group shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-36 rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/5 flex items-center justify-center">
                    <span className="text-sm font-black text-slate-300 tracking-wide z-20 group-hover:text-amber-400 transition duration-200 text-center px-4">
                      {cat.title}
                    </span>
                  </div>
                  <div className="w-full bg-[#11152c] text-slate-300 group-hover:bg-amber-500 group-hover:text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1">
                    İNCELA <ChevronRight className="size-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KATMAN C: KATALOG İÇERİĞİ */}
        {currentMode && currentCat && (
          <div className="rounded-2xl border border-[#14182c] bg-[#090b16] p-16 text-center space-y-4 shadow-2xl">
            <div className="text-5xl">📦</div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
              {currentMode} &gt; {currentCat.replace('-', ' ')}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Bu alt kategoride listelenecek ürün paketi bulunamadı. Detayları dilediğin gibi buraya dizebiliriz.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setCurrentCat(null)}
                className="text-xs bg-[#11152c] text-slate-300 border border-white/5 font-extrabold px-6 py-3 rounded-xl hover:bg-amber-500 hover:text-black transition duration-200"
              >
                Kategorilere Dön
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
