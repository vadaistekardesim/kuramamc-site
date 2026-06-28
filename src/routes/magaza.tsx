import { createFileRoute, Link, Outlet, useParams } from '@tanstack/react-router';
import { ChevronRight, Home } from 'lucide-react';

// --- VERİ YAPISI (Görsellerdeki başlıklar ve düzenle birebir aynı) ---
const CATEGORIES_DATA = [
  { id: "vip-uyelikler", title: "VIP ÜYELİKLER", img: "https://placehold.co/600x350/060814/ffffff?text=VIP+UYELIKLER" },
  { id: "kasa-anahtarlari", title: "KASA ANAHTARLARI", img: "https://placehold.co/600x350/060814/ffffff?text=KASA+ANAHTARLARI" },
  { id: "nadir-esyalar", title: "NADİR EŞYALAR", img: "https://placehold.co/600x350/060814/ffffff?text=NADIR+ESYALAR" },
  { id: "paketler", title: "PAKETLER", img: "https://placehold.co/600x350/060814/ffffff?text=PAKETLER" },
  { id: "kasaba-fly", title: "KASABA FLY", img: "https://placehold.co/600x350/060814/ffffff?text=KASABA+FLY" },
  { id: "spawnerler", title: "SPAWNERLER | CANAVAR DOĞURUCU", img: "https://placehold.co/600x350/060814/ffffff?text=SPAWNERLER" },
];

// --- 1. ANA MAĞAZA COMPONENTI (/magaza) ---
export const Route = createFileRoute('/magaza')({
  component: MagazaLayout,
});

function MagazaLayout() {
  return (
    <div className="min-h-screen bg-[#070913] text-slate-200 antialiased font-sans select-none pb-20">
      {/* Üst Üst Menü / Üst Navbar (Görsel 1 & 2'deki Siyah Şerit) */}
      <nav className="w-full bg-[#0a0c16] border-b border-[#141829] px-4 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-6">
          {/* Logo Alanı */}
          <Link to="/" className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 font-display">
            KURAMAMC
          </Link>
          
          {/* Navbar Linkleri */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link to="/" className="px-4 py-2 rounded-lg hover:text-white transition">Anasayfa</Link>
            <Link to="/magaza" className="px-4 py-2 rounded-lg bg-[#14182c] text-white border border-white/5 shadow-inner">Mağaza</Link>
            <Link to="/kredi-yukle" className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold shadow-md hover:opacity-90 transition">Kredi Satın Al</Link>
            <Link to="/destek" className="px-4 py-2 rounded-lg hover:text-white transition">Destek</Link>
            <Link to="/wiki" className="px-4 py-2 rounded-lg hover:text-white transition">Wiki</Link>
            <Link to="/yetkili" className="px-4 py-2 rounded-lg hover:text-white transition">Yetkili Başvuru</Link>
            <Link to="/oy-ver" className="px-4 py-2 rounded-lg hover:text-white transition">Oy Ver</Link>
          </div>
        </div>

        {/* Sağ Taraf Kullanıcı Girişi ve Sosyal Medya */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <a href="#" className="p-2 rounded-lg bg-[#111428] border border-white/5 text-indigo-400 hover:bg-indigo-500 hover:text-white transition text-sm">🍇</a>
            <a href="#" className="p-2 rounded-lg bg-[#111428] border border-white/5 text-pink-400 hover:bg-pink-500 hover:text-white transition text-sm">📷</a>
            <a href="#" className="p-2 rounded-lg bg-[#111428] border border-white/5 text-red-400 hover:bg-red-500 hover:text-white transition text-sm">📺</a>
          </div>
          <button className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition shadow-lg">
            Giriş Yap <ChevronRight className="size-3.5" />
          </button>
        </div>
      </nav>

      {/* Dinamik Alt İçerik Buraya Gelecek */}
      <Outlet />
    </div>
  );
}

// --- 2. MAĞAZA ANA SEÇİM COMPONENTI (/magaza) ---
export const MagazaIndexRoute = createFileRoute('/magaza/')({
  component: MagazaIndex,
});

function MagazaIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 space-y-12">
      {/* Hero Banner Bölümü (Görsel 1) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d0f1d] to-[#0a0c16] border border-[#161b33] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-3 max-w-2xl">
          <span className="text-[11px] font-black tracking-widest text-sky-400 uppercase font-mono">MAĞAZA</span>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">KURAMAMC MAĞAZASI</h1>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-xl">
            Resmi KuramaMC Mağazasına Hoşgeldiniz. Bu, oyuncu deneyiminizi geliştirmek için yerinizdir.
          </p>
        </div>
        {/* Sağdaki Papağan Maskot Kutusu (Görsel 1) */}
        <div className="relative w-36 h-36 bg-[#111429] rounded-xl border border-white/5 flex items-center justify-center shadow-inner">
          <span className="text-5xl animate-bounce">🦜</span>
        </div>
      </div>

      {/* Kategoriler Kısmı */}
      <div className="space-y-6">
        <h2 className="text-xl font-extrabold text-white tracking-tight border-l-4 border-sky-500 pl-3">Kategoriler</h2>
        
        {/* Sadece Towny ve Skyblock 2'li Grid (Görsel 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Towny Kartı */}
          <Link to="/magaza/towny" className="bg-[#0b0d1a] border border-[#161b33] rounded-xl p-3.5 hover:border-sky-500/40 transition group shadow-lg flex flex-col justify-between">
            <div className="relative h-48 rounded-lg overflow-hidden mb-3.5 bg-[#05060c]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d1a] via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <span className="text-2xl font-black text-white tracking-wider group-hover:scale-105 transition duration-300">TOWNY</span>
              </div>
            </div>
            <div className="w-full bg-[#11142a] text-slate-300 group-hover:bg-sky-600 group-hover:text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1">
              TOWNY <ChevronRight className="size-4" />
            </div>
          </Link>

          {/* Skyblock Kartı */}
          <Link to="/magaza/skyblock" className="bg-[#0b0d1a] border border-[#161b33] rounded-xl p-3.5 hover:border-sky-500/40 transition group shadow-lg flex flex-col justify-between">
            <div className="relative h-48 rounded-lg overflow-hidden mb-3.5 bg-[#05060c]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d1a] via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <span className="text-2xl font-black text-white tracking-wider group-hover:scale-105 transition duration-300">SKYBLOCK</span>
              </div>
            </div>
            <div className="w-full bg-[#11142a] text-slate-300 group-hover:bg-sky-600 group-hover:text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1">
              SKYBLOCK <ChevronRight className="size-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- 3. MOD SEÇİM COMPONENTI (/magaza/towny veya /magaza/skyblock) ---
export const MagazaModeRoute = createFileRoute('/magaza/$mode')({
  component: MagazaModeIndex,
});

function MagazaModeIndex() {
  const { mode } = useParams({ from: '/magaza/$mode' });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 space-y-8">
      {/* Görsel 2'deki Özel Breadcrumb Barı */}
      <div className="flex items-center gap-2 rounded-xl bg-[#0c0e1a] border border-[#161b33] px-4 py-3.5 text-xs font-semibold text-slate-400 shadow-md">
        <Link to="/" className="hover:text-white transition"><Home className="size-3.5" /></Link>
        <ChevronRight className="size-3 text-slate-600" />
        <Link to="/magaza" className="hover:text-white transition">Mağaza</Link>
        <ChevronRight className="size-3 text-slate-600" />
        <span className="text-sky-400 font-bold capitalize">{mode}</span>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-extrabold text-white tracking-tight border-l-4 border-sky-500 pl-3">Kategoriler</h2>
        
        {/* Görsel 2'deki Birebir 3'lü Alt Kategori Grid Düzeni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.id}
              to={`/magaza/$mode/$category`}
              params={{ mode: mode, category: cat.id }}
              className="bg-[#0b0d1a] border border-[#161b33] rounded-xl p-3.5 hover:border-sky-500/40 transition group shadow-lg flex flex-col justify-between"
            >
              {/* İç Görsel Alanı */}
              <div className="relative h-40 rounded-lg overflow-hidden mb-3.5 bg-[#05060c] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d1a] via-transparent to-transparent z-10" />
                <span className="text-sm font-black text-white tracking-wide z-20 group-hover:text-sky-400 transition duration-200 text-center px-4">
                  {cat.title}
                </span>
              </div>
              
              {/* Alt Buton Alanı */}
              <div className="w-full bg-[#11142a] text-slate-300 group-hover:bg-sky-600 group-hover:text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1">
                {cat.id === 'spawnerler' ? 'SPAWNERLER | CANAVAR DOĞURUCU' : cat.title} <ChevronRight className="size-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 4. ALT KATEGORİ İÇERİK COMPONENTI (/magaza/towny/vip-uyelikler vb.) ---
export const MagazaCategoryRoute = createFileRoute('/magaza/$mode/$category')({
  component: MagazaCategoryIndex,
});

function MagazaCategoryIndex() {
  const { mode, category } = useParams({ from: '/magaza/$mode/$category' });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 space-y-8">
      {/* Derinleşen Breadcrumb */}
      <div className="flex items-center gap-2 rounded-xl bg-[#0c0e1a] border border-[#161b33] px-4 py-3.5 text-xs font-semibold text-slate-400 shadow-md">
        <Link to="/" className="hover:text-white transition"><Home className="size-3.5" /></Link>
        <ChevronRight className="size-3 text-slate-600" />
        <Link to="/magaza" className="hover:text-white transition">Mağaza</Link>
        <ChevronRight className="size-3 text-slate-600" />
        <Link to={`/magaza/$mode`} params={{ mode }} className="hover:text-white transition capitalize">{mode}</Link>
        <ChevronRight className="size-3 text-slate-600" />
        <span className="text-sky-400 font-bold uppercase font-mono">{category.replace('-', ' ')}</span>
      </div>

      {/* İstediğin Gibi Ayarlayabileceğin Boş Kategori Alanı */}
      <div className="rounded-2xl border border-[#161b33] bg-[#0b0d1a] p-16 text-center space-y-4 shadow-2xl">
        <div className="text-5xl">📦</div>
        <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
          {mode} &gt; {category.replace('-', ' ')} Ürünleri
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Burası şimdilik boş bırakılmıştır. Sunucu paketlerini, VIP özelliklerini ve fiyat listelerini bu şablonun içerisine dilediğin gibi entegre edebilirsin.
        </p>
        <div className="pt-2">
          <Link 
            to={`/magaza/$mode`} 
            params={{ mode }}
            className="inline-block text-xs bg-[#141933] text-slate-300 border border-white/5 font-bold px-6 py-3 rounded-lg hover:bg-sky-600 hover:text-white transition"
          >
            Kategorilere Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
