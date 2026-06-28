// src/routes/magaza.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronRight, Home } from 'lucide-react';
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
  // Sayfa içi navigasyonu router dosyaları olmadan yönetmek için state kullanıyoruz
  const [currentMode, setCurrentMode] = useState<'towny' | 'skyblock' | null>(null);
  const [currentCat, setCurrentCat] = useState<string | null>(null);

  // Geri dönüş işlevleri
  const handleGoBackToModes = () => {
    setCurrentMode(null);
    setCurrentCat(null);
  };

  const handleGoBackToCategories = () => {
    setCurrentCat(null);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-200 antialiased font-sans select-none pb-20">
      
      {/* 1. ÜST NAVBAR (Bizim logolu, butonlu kurumsal tasarım) */}
      <nav className="w-full bg-[#0a0c16] border-b border-[#141829] px-4 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 font-display">
            KURAMAMC
          </Link>
          
          {/* Linkler */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link to="/" className="px-4 py-2 rounded-lg hover:text-white transition">Anasayfa</Link>
            <button onClick={handleGoBackToModes} className="px-4 py-2 rounded-lg bg-[#14182c] text-white border border-white/5 shadow-inner">Mağaza</button>
            <Link to="/shop" className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold shadow-md hover:opacity-90 transition">Kredi Satın Al</Link>
            <Link to="/support" className="px-4 py-2 rounded-lg hover:text-white transition">Destek</Link>
            <Link to="/blog" className="px-4 py-2 rounded-lg hover:text-white transition">Haberler</Link>
          </div>
        </div>

        {/* Sağ Taraf Giriş Butonu */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition shadow-lg">
            Giriş Yap <ChevronRight className="size-3.5" />
          </button>
        </div>
      </nav>

      {/* 2. BREADCRUMB (Görsel 2'deki şık navigasyon barı) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        <div className="flex items-center gap-2 rounded-xl bg-[#0c0e1a] border border-[#161b33] px-4 py-3.5 text-xs font-semibold text-slate-400 shadow-md">
          <button onClick={handleGoBackToModes} className="hover:text-white transition">
            <Home className="size-3.5" />
          </button>
          <ChevronRight className="size-3 text-slate-600" />
          <button onClick={handleGoBackToModes} className={`hover:text-white transition ${!currentMode ? 'text-sky-400 font-bold' : ''}`}>
            Mağaza
          </button>
          {currentMode && (
            <>
              <ChevronRight className="size-3 text-slate-600" />
              <button onClick={handleGoBackToCategories} className={`hover:text-white transition capitalize ${!currentCat ? 'text-sky-400 font-bold' : ''}`}>
                {currentMode}
              </button>
            </>
          )}
          {currentCat && (
            <>
              <ChevronRight className="size-3 text-slate-600" />
              <span className="text-sky-400 font-bold uppercase font-mono">{currentCat.replace('-', ' ')}</span>
            </>
          )}
        </div>
      </div>

      {/* 3. DİNAMİK ALAN YÖNETİMİ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        
        {/* KATMAN A: ANA MAĞAZA GİRİŞİ (Towny / Skyblock Seçimi - Görsel 1) */}
        {!currentMode && !currentCat && (
          <div className="space-y-12">
            {/* Hero Banner (Görsel 1) */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d0f1d] to-[#0a0c16] border border-[#161b33] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-3 max-w-2xl">
                <span className="text-[11px] font-black tracking-widest text-sky-400 uppercase font-mono">MAĞAZA</span>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">KURAMAMC MAĞAZASI</h1>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  Resmi KuramaMC Mağazasına Hoşgeldiniz. Bu, oyuncu deneyiminizi geliştirmek için yerinizdir.
                </p>
              </div>
              <div className="relative w-36 h-36 bg-[#111429] rounded-xl border border-white/5 flex items-center justify-center shadow-inner">
                <span className="text-5xl animate-bounce">🦜</span>
              </div>
            </div>

            {/* Oyun Modları Listesi */}
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-white tracking-tight border-l-4 border-sky-500 pl-3">Kategoriler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Towny Seçeneği */}
                <div 
                  onClick={() => setCurrentMode('towny')}
                  className="bg-[#0b0d1a] border border-[#161b33] rounded-xl p-3.5 hover:border-sky-500/40 cursor-pointer transition group shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-3.5 bg-[#05060c] flex items-center justify-center">
                    <span className="text-2xl font-black text-white tracking-wider group-hover:scale-105 transition duration-300">TOWNY</span>
                  </div>
                  <div className="w-full bg-[#11142a] text-slate-300 group-hover:bg-sky-600 group-hover:text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1">
                    TOWNY <ChevronRight className="size-4" />
                  </div>
                </div>

                {/* Skyblock Seçeneği */}
                <div 
                  onClick={() => setCurrentMode('skyblock')}
                  className="bg-[#0b0d1a] border border-[#161b33] rounded-xl p-3.5 hover:border-sky-500/40 cursor-pointer transition group shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-3.5 bg-[#05060c] flex items-center justify-center">
                    <span className="text-2xl font-black text-white tracking-wider group-hover:scale-105 transition duration-300">SKYBLOCK</span>
                  </div>
                  <div className="w-full bg-[#11142a] text-slate-300 group-hover:bg-sky-600 group-hover:text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1">
                    SKYBLOCK <ChevronRight className="size-4" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* KATMAN B: MOD ALT KATEGORİLERİ (Görsel 2'deki 6'lı Grid) */}
        {currentMode && !currentCat && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#161b33] pb-4">
              <h2 className="text-xl font-extrabold text-white tracking-tight border-l-4 border-sky-500 pl-3 uppercase">
                {currentMode} KATEGORİLERİ
              </h2>
              <button 
                onClick={handleGoBackToModes}
                className="text-xs bg-[#11142a] border border-white/5 text-slate-400 hover:text-white px-4 py-2 rounded-lg transition"
              >
                Geri Dön
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATEGORIES_DATA.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setCurrentCat(cat.id)}
                  className="bg-[#0b0d1a] border border-[#161b33] rounded-xl p-3.5 hover:border-sky-500/40 cursor-pointer transition group shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-40 rounded-lg overflow-hidden mb-3.5 bg-[#05060c] flex items-center justify-center">
                    <span className="text-sm font-black text-white tracking-wide z-20 group-hover:text-sky-400 transition duration-200 text-center px-4">
                      {cat.title}
                    </span>
                  </div>
                  <div className="w-full bg-[#11142a] text-slate-300 group-hover:bg-sky-600 group-hover:text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1">
                    {cat.title} <ChevronRight className="size-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KATMAN C: SEÇİLEN KATEGORİNİN İÇERİĞİ (Boş Şablon Alanı) */}
        {currentMode && currentCat && (
          <div className="rounded-2xl border border-[#161b33] bg-[#0b0d1a] p-16 text-center space-y-4 shadow-2xl">
            <div className="text-5xl">📦</div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
              {currentMode} &gt; {currentCat.replace('-', ' ')} Ürünleri
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Burası şimdilik boş bırakılmıştır. KuramaMC sunucu paketlerini ve VIP fiyat listelerini buraya dilediğin gibi ekleyebilirsin.
            </p>
            <div className="pt-2">
              <button 
                onClick={handleGoBackToCategories}
                className="text-xs bg-[#141933] text-slate-300 border border-white/5 font-bold px-6 py-3 rounded-lg hover:bg-sky-600 hover:text-white transition"
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
