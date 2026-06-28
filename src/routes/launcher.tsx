// src/routes/magaza.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { Server, MessageCircle, LogIn, UserPlus, Sparkles, Shield, Cloud, ChevronRight, Gem, Key, Package, Zap, Box, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const SERVER_IP = "oyna.kuramamc.com.tr";

export const Route = createFileRoute('/magaza')({
  component: MagazaComponent,
});

function LiveDot() {
  return (
    <div className="flex items-center gap-1.5 mt-0.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Sunucu Çevrimiçi</span>
    </div>
  );
}

// Görsel kategori kartları için yardımcı bileşen (HanedanMC Tarzı)
interface CategoryCardProps {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function CategoryCard({ title, subTitle, icon, onClick }: CategoryCardProps) {
  return (
    <button 
      onClick={onClick}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-black/40 p-6 text-left transition-all duration-300 hover:border-amber-500/30 hover:bg-black/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)]"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/[0.01] to-transparent opacity-100 transition-opacity group-hover:opacity-0" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-500/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div>
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-colors group-hover:bg-amber-500/10 group-hover:text-amber-400">
          {icon}
        </div>
        <h3 className="font-display text-xl font-bold text-white tracking-wide uppercase">{title}</h3>
        <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">{subTitle}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 w-full">
        <span className="text-xs font-semibold text-neutral-400 group-hover:text-amber-400 transition-colors">Kategoriyi İncele</span>
        <ChevronRight className="size-4 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-amber-400" />
      </div>
    </button>
  );
}

function MagazaComponent() {
  // Sayfa navigasyonunu simüle etmek için state'ler
  // '/' -> Ana Mağaza (Towny/Skyblock seçimi)
  // '/towny' -> Towny Alt Kategorileri
  // '/skyblock' -> Skyblock Alt Kategorileri
  // '/towny/vip-uyelikler' vb. -> Ürün listeleme alanları
  const [currentPath, setCurrentPath] = useState<string>('/');

  // HanedanMC 2. fotoğraftaki alt kategoriler listesi
  const subCategories = [
    { id: 'vip-uyelikler', title: 'VIP Üyelikler', sub: 'Ayrıcalıklı rütbeler ve özel yetkiler.', icon: <Gem className="size-6" /> },
    { id: 'kasa-anahtarlari', title: 'Kasa Anahtarları', sub: 'Şansını dene, efsanevi ödüller kazan.', icon: <Key className="size-6" /> },
    { id: 'nadir-esyalar', title: 'Nadir Eşyalar', sub: 'Sadece markete özel sınırlı üretim eşyalar.', icon: <ShoppingBag className="size-6" /> },
    { id: 'paketler', title: 'Paketler', sub: 'Gelişiminizi hızlandıracak avantajlı paketler.', icon: <Package className="size-6" /> },
    { id: 'kasaba-fly', title: 'Kasaba Fly', sub: 'Kasabanızda özgürce uçma yeteneği.', icon: <Zap className="size-6" /> },
    { id: 'spawnerlar', title: 'Spawnerlar & Canavar Doğurucu', sub: 'Gelişmiş spawnerlar ve çiftlik ürünleri.', icon: <Box className="size-6" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 select-none antialiased">
      <style>{`
        @keyframes customScaleUp {
          0% { opacity: 0; transform: scale(0.97) translateY(15px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-entrance { animation: customScaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
      
      {/* Hero Alanı */}
      <section className="relative isolate overflow-hidden pb-4">
        <img src={heroBg} alt="" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-500/10 via-background/90 to-background" />
        
        {/* Navbar */}
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 opacity-0 animate-entrance">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur md:flex">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
              <Server className="size-4 text-primary" />
              <div className="text-xs leading-tight">
                <div className="font-semibold text-white">{SERVER_IP}</div>
                <LiveDot />
              </div>
            </div>
            <a href="https://discord.gg/kuramamc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-2 text-xs font-semibold text-indigo-200 hover:bg-indigo-500/30 transition">
              <MessageCircle className="size-4" /> Discord
            </a>
          </div>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur md:flex">
            <Link to="/" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Ana Sayfa</Link>
            <Link to="/launcher" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Launcher</Link>
            <Link to="/blog" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Haberler</Link>
            <Link to="/magaza" onClick={() => setCurrentPath('/')} className="rounded-full px-4 py-2 text-sm bg-white/10 text-foreground transition">Mağaza</Link>
            <a href="/#contact" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Destek</a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/5 sm:flex transition">
              <LogIn className="size-4" /> Giriş Yap
            </button>
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(245,158,11,0.2)] transition hover:brightness-110">
              <UserPlus className="size-4" /> Kayıt Ol
            </button>
          </div>
        </header>

        {/* Mağaza Üst Başlık Alanı */}
        <div className="relative z-10 mx-auto flex flex-col items-center pt-12 text-center px-4">
          <img src={logo} alt="KuramaMC" width={112} height={112} className="drop-shadow-[0_8px_32px_rgba(245,158,11,0.3)] mb-6 select-none pointer-events-none hover:scale-105 transition-transform duration-300" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4 border border-amber-500/20 backdrop-blur-sm">
            <Sparkles className="size-4 text-amber-400" />
            <span>KuramaMC Resmi Mağazası</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-display max-w-4xl leading-tight">
            KURAMAMC MAĞAZASI
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm mb-6">
            Resmi KuramaMC Mağazasına Hoş Geldiniz. Bu, oyuncu deneyiminizi geliştirmeniz için yerinizdir.
          </p>

          {/* Breadcrumb - HanedanMC Tarzı Navigasyon Çubuğu */}
          <div className="w-full max-w-7xl px-6 mt-4">
            <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-sm text-gray-400 backdrop-blur-md">
              <button onClick={() => setCurrentPath('/')} className="hover:text-white transition">Mağaza</button>
              
              {currentPath !== '/' && (
                <>
                  <ChevronRight className="size-4 text-neutral-600" />
                  <button 
                    onClick={() => setCurrentPath(currentPath.startsWith('/towny') ? '/towny' : '/skyblock')} 
                    className="capitalize hover:text-white transition"
                  >
                    {currentPath.startsWith('/towny') ? 'Towny' : 'Skyblock'}
                  </button>
                </>
              )}

              {currentPath.includes('/', 1) && (
                <>
                  <ChevronRight className="size-4 text-neutral-600" />
                  <span className="text-amber-400 font-medium capitalize">
                    {currentPath.split('/')[2]?.replace('-', ' ')}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DİNAMİK MAĞAZA İÇERİK ALANI */}
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-8 animate-entrance">
        
        {/* ROTA 1: Ana Mağaza Görünümü (/magaza) */}
        {currentPath === '/' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 tracking-wide font-display uppercase border-l-4 border-amber-500 pl-3">Kategoriler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              {/* Towny Seçim Kartı */}
              <button 
                onClick={() => setCurrentPath('/towny')}
                className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/40 p-8 text-center transition-all duration-300 hover:border-amber-500/30 hover:bg-black/60"
              >
                <div className="mb-4 p-4 rounded-full bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                  <Shield className="size-10" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-wider font-display uppercase">TOWNY</h3>
                <p className="text-xs text-gray-400 mt-2 max-w-xs">Uygarlığını kur, krallığını genişlet ve Towny dünyasındaki kozmetik/avantajlara eriş.</p>
                <div className="mt-6 rounded-lg bg-white/5 px-4 py-1.5 text-xs font-semibold text-white group-hover:bg-amber-500 group-hover:text-black transition-colors w-full max-w-[200px]">Giriş Yap</div>
              </button>

              {/* Skyblock Seçim Kartı */}
              <button 
                onClick={() => setCurrentPath('/skyblock')}
                className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/40 p-8 text-center transition-all duration-300 hover:border-orange-500/30 hover:bg-black/60"
              >
                <div className="mb-4 p-4 rounded-full bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform">
                  <Cloud className="size-10" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-wider font-display uppercase">SKYBLOCK</h3>
                <p className="text-xs text-gray-400 mt-2 max-w-xs">Adanı göklere taşı, minyonlarını ve spawnerlarını yükselterek zirveye oyna.</p>
                <div className="mt-6 rounded-lg bg-white/5 px-4 py-1.5 text-xs font-semibold text-white group-hover:bg-orange-500 group-hover:text-black transition-colors w-full max-w-[200px]">Giriş Yap</div>
              </button>

            </div>
          </div>
        )}

        {/* ROTA 2: Towny Alt Kategorileri (/magaza/towny) */}
        {currentPath === '/towny' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 tracking-wide font-display uppercase border-l-4 border-amber-500 pl-3">Towny Kategorileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCategories.map((cat) => (
                <CategoryCard 
                  key={cat.id}
                  title={cat.title}
                  subTitle={cat.sub}
                  icon={cat.icon}
                  onClick={() => setCurrentPath(`/towny/${cat.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ROTA 3: Skyblock Alt Kategorileri (/magaza/skyblock) */}
        {currentPath === '/skyblock' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 tracking-wide font-display uppercase border-l-4 border-orange-500 pl-3">Skyblock Kategorileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCategories.map((cat) => (
                <CategoryCard 
                  key={cat.id}
                  title={cat.title}
                  subTitle={cat.sub}
                  icon={cat.icon}
                  onClick={() => setCurrentPath(`/skyblock/${cat.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ROTA 4: Alt Kategorilerin İçi (Örn: /magaza/towny/vip-uyelikler falan) */}
        {currentPath.includes('/', 1) && currentPath !== '/towny' && currentPath !== '/skyblock' && (
          <div className="border border-white/5 bg-black/20 backdrop-blur-md rounded-3xl p-12 text-center max-w-3xl mx-auto">
            <div className="inline-flex p-4 rounded-full bg-amber-500/5 text-amber-400 mb-4">
              <Sparkles className="size-8" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2 capitalize">
              {currentPath.split('/')[2]?.replace('-', ' ')}
            </h4>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
              Şu an <span className="text-white capitalize">{currentPath.split('/')[1]}</span> sunucusunun <span className="text-amber-400 capitalize">{currentPath.split('/')[2]?.replace('-', ' ')}</span> kategorisindesin.
            </p>
            <div className="p-8 border border-dashed border-white/10 rounded-xl bg-white/[0.02] text-xs text-neutral-500">
              Buraya ürün listeleme kartları (VIP paketleri, fiyatlar ve satın alma butonları) gelecek. Sen buraları sonra kendi DB veya veri yapına göre dönersin.
            </div>
            <button 
              onClick={() => setCurrentPath(currentPath.startsWith('/towny') ? '/towny' : '/skyblock')}
              className="mt-6 text-xs text-gray-400 hover:text-white transition underline underline-offset-4"
            >
              Geri Dön
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
