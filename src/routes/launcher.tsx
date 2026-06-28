// src/routes/launcher.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { Download, Cpu, ShieldCheck, Zap, Server, MessageCircle, LogIn, UserPlus, Layers, Monitor, Terminal, Sliders, Sparkles, CheckCircle2, ShieldAlert, Code, HelpCircle, ArrowRight } from 'lucide-react';
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { getServerStatus } from "@/lib/site.functions";

const SERVER_IP = "oyna.kuramamc.com.tr";
const DOWNLOAD_LINK = "https://indirmek-istedigin-url.com/KuramaClient.exe"; 

export const Route = createFileRoute('/launcher')({
  component: LauncherComponent,
});

function LauncherComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 select-none antialiased">
      {/* Gelişmiş Giriş Animasyonları */}
      <style>{`
        @keyframes customScaleUp {
          0% { opacity: 0; transform: scale(0.96) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-entrance { animation: customScaleUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-1 { animation-delay: 100ms; }
        .delay-2 { animation-delay: 200ms; }
        .delay-3 { animation-delay: 300ms; }
        .delay-4 { animation-delay: 400ms; }
        .delay-5 { animation-delay: 500ms; }
        .delay-6 { animation-delay: 600ms; }
        .delay-7 { animation-delay: 700ms; }
      `}</style>
      
      {/* Hero / Üst Görsel Alanı */}
      <section className="relative isolate overflow-hidden pb-4">
        <img src={heroBg} alt="" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-500/10 via-background/90 to-background" />
        
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
            <a href="#" className="flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-2 text-xs font-semibold text-indigo-200 hover:bg-indigo-500/30 transition">
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
            <button className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/5 sm:flex transition">
              <LogIn className="size-4" /> Giriş Yap
            </button>
            <button className="flex items-center gap-2 rounded-full bg-gradient-amber px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition">
              <UserPlus className="size-4" /> Kayıt Ol
            </button>
          </div>
        </header>

        {/* Ana Başlık Alanı */}
        <div className="relative z-10 mx-auto flex flex-col items-center pt-12 text-center px-4">
          <img src={logo} alt="KuramaMC" width={96} height={96} className="drop-shadow-[0_8px_24px_oklch(0.7_0.2_60/0.4)] mb-6 opacity-0 animate-entrance delay-1" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4 border border-amber-500/20 backdrop-blur-sm opacity-0 animate-entrance delay-1">
            <Sparkles className="size-4 text-amber-400" />
            <span>Resmi Sunucu Başlatıcısı</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 font-display max-w-4xl leading-tight opacity-0 animate-entrance delay-2">
            Kusursuz Performans, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Özel Tasarımlarla Buluştu!</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg mb-8 opacity-0 animate-entrance delay-3">
            Oyun deneyiminizi sıfır donma, optimize edilmiş RAM yönetimi ve akıllı FPS artışıyla taçlandırmak için özel hazırladığımız KuramaLauncher sizi bekliyor. Sunucumuzdaki tüm özel detayları en yüksek kararlılıkta deneyimleyin.
          </p>

          {/* İndirme Butonu */}
          <div className="flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-entrance delay-4 mb-16 w-full justify-center px-4">
            <a
              href={DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 font-bold text-base md:text-lg text-white shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:shadow-[0_0_40px_rgba(245,158,11,0.45)] transition duration-300 hover:-translate-y-1 group"
            >
              <Download className="size-5 md:size-6 animate-pulse group-hover:scale-110 transition-transform" />
              KuramaLauncher İndir (.EXE)
            </a>
          </div>

          {/* MOCKUP PANEL */}
          <div className="w-full max-w-4xl px-4 opacity-0 animate-entrance delay-5">
            <div className="relative rounded-2xl border border-white/10 bg-neutral-950/50 p-2 backdrop-blur shadow-[0_0_50px_rgba(245,158,11,0.08)]">
              <div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-white/5 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-orange-500/5" />
                <div className="text-center p-6 z-10">
                  <Layers className="size-16 text-amber-500/30 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
                  <p className="text-sm font-semibold text-neutral-400">KuramaLauncher Modern Gösterge Paneli</p>
                  <p className="text-xs text-neutral-600 mt-1">Gelişmiş RAM tahsisi, akıllı optimizasyon motoru ve yerleşik ağ köprüsü.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ÖZEL SETLER VE EKİPMANLAR VURGUSU */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-5">
        <div className="bg-gradient-to-br from-[#12161f] via-neutral-900 to-[#0e1117] border border-gray-800 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex-grow space-y-3">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2.5 py-1 rounded-md">
              <Sparkles className="size-3" /> Sunucuya Özel İçerikler
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white font-display">Göz Alıcı Özel Setler ve Silahlar</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              Sıradan bir dünyadan çok daha fazlası! KuramaLauncher, sunucumuzda yer alan tamamen benzersiz, özel tasarım zırh setlerini, kılıçları ve tematik ekipmanları en yüksek kalitede, hiçbir ek doku paketi yükleme zahmeti olmadan doğrudan görmenizi sağlar.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto flex-shrink-0 font-display">
            <div className="bg-neutral-950/60 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">Eşsiz Zırh</div>
              <div className="text-base font-black text-white mt-0.5">Özel Setler</div>
            </div>
            <div className="bg-neutral-950/60 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-[10px] text-orange-400 font-semibold uppercase tracking-wider">Ekipman</div>
              <div className="text-base font-black text-white mt-0.5">Nadir Kılıçlar</div>
            </div>
          </div>
        </div>
      </section>

      {/* LAUNCHER AVANTAJLARI (Donanım Odaklı) */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-5">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-2 font-display">Neden KuramaLauncher?</h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">Launcher ile elde edeceğiniz teknik ayrıcalıklar ve üst düzey kararlılık adımları:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-white/5 bg-card/40 p-6 backdrop-blur-sm shadow-xl hover:border-amber-500/30 transition duration-300">
            <div className="size-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4">
              <Zap className="size-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Donanım Dostu FPS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Özel hafif motor yapısı sayesinde GTX 1050 Ti gibi giriş ve orta seviye ekran kartlarında bile en kararlı ve akıcı FPS değerlerini yakalarsınız.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-card/40 p-6 backdrop-blur-sm shadow-xl hover:border-orange-500/30 transition duration-300">
            <div className="size-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-4">
              <Cpu className="size-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Dinamik RAM Yönetimi</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Arka plandaki gereksiz süreçleri akıllıca filtreleyerek ani takılmaları (drop) ve bellek sızıntılarından kaynaklı çökmeleri tamamen engeller.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-card/40 p-6 backdrop-blur-sm shadow-xl hover:border-emerald-500/30 transition duration-300">
            <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-4">
              <ShieldCheck className="size-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Otomatik Senkronizasyon</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sunucuya eklenen en yeni görsel ögeler ve güncellemeler arka planda otomatik olarak senkronize edilir, manuel kuruluma gerek kalmaz.
            </p>
          </div>
        </div>
      </section>

      {/* GELİŞMİŞ RAM & BELLEK YÖNETİMİ PANELİ */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-6">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-neutral-950 to-neutral-900 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8">
          <div className="flex-grow space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold border border-orange-500/20">
              <Sliders className="size-3.5" /> Teknik İnceleme
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white font-display">Gelişmiş Bellek Kontrolü Sürgüsü</h3>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Launcher arayüzünde yer alan gelişmiş ayarlar paneli sayesinde sisteminize en uygun RAM miktarını tek bir sürgüyü kaydırarak atayabilirsiniz. Başlatıcı, bilgisayarınızın yükünü hafifletmek için en kararlı Java mimarisini otomatik seçer.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-300 pt-2">
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400 flex-shrink-0" /> Otomatik Entegrasyon</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400 flex-shrink-0" /> Akıllı Java Seçimi</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400 flex-shrink-0" /> Önbellek Optimizasyonu</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400 flex-shrink-0" /> Otomatik Log Temizleyici</div>
            </div>
          </div>
          <div className="w-full md:w-72 bg-neutral-900 border border-white/5 rounded-2xl p-6 space-y-4 shadow-inner flex-shrink-0">
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Arayüz Sürgüsü Ön İzleme</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-neutral-300"><span>Ayrılan Bellek:</span> <span className="text-amber-400">4096 MB</span></div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden"><div className="w-1/2 h-full bg-gradient-amber rounded-full" /></div>
            </div>
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Tam Ekran Başlat</span> <div className="w-7 h-4 bg-amber-500 rounded-full p-0.5 flex justify-end"><div className="size-3 bg-black rounded-full" /></div></div>
              <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Doku Paketi Sabitleyici</span> <div className="w-7 h-4 bg-amber-500 rounded-full p-0.5 flex justify-end"><div className="size-3 bg-black rounded-full" /></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* GÜVENLİK VE ADİL OYUN PANELİ */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-red-950/20 border border-red-500/20 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <ShieldAlert className="size-8 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Hilesiz & Adil Rekabet</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                KuramaLauncher, harici enjeksiyonları ve hile girişimlerini ağ seviyesinde bloke eden yerleşik güvenlik katmanlarına sahiptir.
              </p>
            </div>
            <div className="text-xs text-red-400/70 font-mono mt-4">Güvenlik Katmanı v2.4</div>
          </div>
          
          <div className="md:col-span-2 bg-neutral-950/40 border border-white/5 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-white font-bold text-sm mb-1">Makro Filtreleme</h4>
              <p className="text-neutral-400 text-xs">Donanımsal veya yazılımsal suni tıklamalar akıllı koruma filtreleri tarafından süzülür.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-white font-bold text-sm mb-1">Veri Doğrulama</h4>
              <p className="text-neutral-400 text-xs">İstemci bütünlüğü sürekli kontrol edilerek güvenli bir köprü oluşturulur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CANLI LOG SİMÜLASYONU */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-6">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white font-display">Canlı Çekirdek Notları & Konsol</h2>
        </div>
        <div className="bg-neutral-950 rounded-2xl border border-white/10 p-5 font-mono text-xs shadow-2xl space-y-2 text-neutral-400 overflow-hidden relative">
          <div className="absolute top-2 right-4 flex gap-1.5">
            <div className="size-2 rounded-full bg-red-500" />
            <div className="size-2 rounded-full bg-yellow-500" />
            <div className="size-2 rounded-full bg-green-500" />
          </div>
          <div className="text-neutral-500 select-none pb-2 flex items-center gap-1"><Code className="size-3.5 text-amber-500" /> kuramaclient_core.log</div>
          <p className="text-emerald-400">[BAŞARILI] KuramaLauncher optimizasyon motoru stabil durumda.</p>
          <p className="text-blue-400">[BİLGİ] Sunucuya özel 3D model katmanları başarıyla yüklendi.</p>
          <p className="text-white">[GÜNCELLEME] GTX 1050 Ti ve dengi donanımlar için kararlılık yaması aktif.</p>
          <p className="text-amber-400">[AĞ] Sunucu veri aktarım köprüleri optimize edildi.</p>
          <p className="text-neutral-600">[BAĞLANTI] IP Dinleniyor: oyna.kuramamc.com.tr</p>
        </div>
      </section>

      {/* Sistem Gereksinimleri */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-2 font-display">Sistem Gereksinimleri</h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">Maksimum akıcılık ve stabil bir oyun performansı için önerilen donanım tablosu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-white/5 bg-neutral-950/40 p-6 backdrop-blur">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2 mb-4">
              <Terminal className="size-5" /> Minimum Gereksinimler
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex justify-between border-b border-white/5 pb-2"><span>İşletim Sistemi:</span> <span className="text-white">Windows 10 (64-bit)</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>İşlemci:</span> <span className="text-white">Intel Core i3-4130 / AMD FX-4300</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Bellek (RAM):</span> <span className="text-white">4 GB RAM</span></li>
              <li className="flex justify-between"><span>Depolama:</span> <span className="text-white">1 GB Boş Alan</span></li>
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-500/10 bg-neutral-950/60 p-6 backdrop-blur shadow-[0_0_30px_rgba(245,158,11,0.02)]">
            <h3 className="text-lg font-bold text-orange-500 flex items-center gap-2 mb-4">
              <Monitor className="size-5" /> Önerilen Gereksinimler
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex justify-between border-b border-white/5 pb-2"><span>İşletim Sistemi:</span> <span className="text-white">Windows 10/11 (64-bit)</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>İşlemci:</span> <span className="text-white">Intel Core i5-7400 / AMD Ryzen 5 1600</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Bellek (RAM):</span> <span className="text-white">8 GB RAM (4GB Ayrılan)</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Ekran Kartı:</span> <span className="text-white">NVIDIA GeForce GTX 1050 Ti / AMD RX 570</span></li>
              <li className="flex justify-between"><span>Depolama / Disk:</span> <span className="text-white">SSD (1 GB Boş Alan)</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* DISCORD CALL TO ACTION */}
      <section className="mx-auto max-w-5xl px-6 py-12 mb-12 opacity-0 animate-entrance delay-7">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-neutral-950 border border-indigo-500/20 p-8 text-center overflow-hidden shadow-2xl">
          <div className="absolute -bottom-10 -left-10 size-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-white font-display">Topluluğumuza Katılın!</h3>
            <p className="text-sm text-indigo-200/70 leading-relaxed">
              Büyük topluluğumuzun bir parçası olmak, güncellemeleri anında takip etmek ve çekilişlere katılmak için resmi Discord sunucumuza davetlisiniz!
            </p>
            <div className="pt-2">
              <a 
                href="#" 
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200"
              >
                <MessageCircle className="size-4" /> Discord Topluluğuna Katıl
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-muted-foreground opacity-0 animate-entrance delay-7">
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
