// src/routes/launcher.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { Download, Cpu, ShieldCheck, Zap, Server, MessageCircle, LogIn, UserPlus, Layers, Monitor, HardDrive, Terminal, Sliders, Sparkles, CheckCircle2, ShieldAlert, Code, Eye } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 select-none antialiased">
      {/* Giriş Animasyonu Stilleri */}
      <style>{`
        @keyframes customScaleUp {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(20px);
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
        .delay-5 { animation-delay: 500ms; }
        .delay-6 { animation-delay: 600ms; }
        .delay-7 { animation-delay: 700ms; }
      `}</style>
      
      {/* Üst Alan / Hero */}
      <section className="relative isolate overflow-hidden pb-4">
        <img src={heroBg} alt="" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
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

        {/* KuramaClient Başlık */}
        <div className="relative z-10 mx-auto flex flex-col items-center pt-12 text-center px-4">
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
          <div className="opacity-0 animate-entrance delay-4 mb-16">
            <a
              href={DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 font-bold text-lg text-white shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition duration-300 hover:-translate-y-1 group"
            >
              <Download className="size-6 animate-pulse group-hover:scale-110 transition-transform" />
              KuramaLauncher İndir (.EXE)
            </a>
          </div>

          {/* LAUNCHER MOCKUP ALANI */}
          <div className="w-full max-w-4xl px-4 opacity-0 animate-entrance delay-5">
            <div className="relative rounded-2xl border border-white/10 bg-neutral-950/50 p-2 backdrop-blur shadow-[0_0_50px_rgba(245,158,11,0.1)]">
              <div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-white/5 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-orange-500/5" />
                <div className="text-center p-6 z-10">
                  <Layers className="size-16 text-amber-500/40 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
                  <p className="text-sm font-semibold text-neutral-400">KuramaLauncher Modern Arayüz Görseli</p>
                  <p className="text-xs text-neutral-600 mt-1">Sunucu listesi, kozmetikler, RAM verme alanı ve dahası burada yer alır.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İstatistik Sayacı Paneli */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl border border-white/5 bg-card/20 p-6 backdrop-blur-sm text-center">
          <div>
            <div className="text-2xl md:text-3xl font-black text-amber-400 font-display">10,000+</div>
            <div className="text-xs text-muted-foreground mt-1">Toplam İndirme</div>
          </div>
          <div className="border-l border-white/5">
            <div className="text-2xl md:text-3xl font-black text-orange-500 font-display">%0 Lag</div>
            <div className="text-xs text-muted-foreground mt-1">Network Optimizasyonu</div>
          </div>
          <div className="border-l border-white/5">
            <div className="text-2xl md:text-3xl font-black text-emerald-400 font-display">+40 FPS</div>
            <div className="text-xs text-muted-foreground mt-1">Ortalama Artış</div>
          </div>
          <div className="border-l border-white/5">
            <div className="text-2xl md:text-3xl font-black text-blue-400 font-display">v1.0.0</div>
            <div className="text-xs text-muted-foreground mt-1">Güncel Sürüm</div>
          </div>
        </div>
      </section>

      {/* Oyun Modları Entegrasyon Alanı */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-5">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-2 font-display">Gelişmiş Ağ Altyapısı</h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">KuramaClient, sunucu modları arasında yükleme ekranı olmadan anında geçiş yapmanızı sağlar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-neutral-900/60 to-neutral-950 p-6 shadow-xl">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Mod #1</div>
            <h3 className="text-2xl font-black text-white mb-3 font-display">Gelişmiş Towny</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Kendi kasabanızı kurun, krallık ittifakları yapın ve harita üzerinde sınırlarınızı genişletin. İstemciye özel harita entegrasyonuyla düşman hareketlerini anlık takip edin.
            </p>
            <div className="flex gap-2 text-xs text-amber-300 font-medium">
              <span className="bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">Kasaba Savaşları</span>
              <span className="bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">Özel Ekonomi</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-neutral-900/60 to-neutral-950 p-6 shadow-xl">
            <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">Mod #2</div>
            <h3 className="text-2xl font-black text-white mb-3 font-display">Ultra Skyblock</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Gökyüzündeki adanızı sıfırdan inşa edin, devasa fabrikalar kurun ve liderlik tablosunda en tepeye tırmanın. Optimize edilmiş parçacık efektleriyle adanız asla kasmayacak.
            </p>
            <div className="flex gap-2 text-xs text-orange-300 font-medium">
              <span className="bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">Ada Seviyesi</span>
              <span className="bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">Otomasyon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Özellikler Alanı */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-5">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-2 font-display">Neden KuramaClient?</h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">Standart başlatıcıları unutun. Sunucumuz için özel dikim bir zırh hazırladık.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-white/5 bg-card/40 p-6 backdrop-blur-sm shadow-xl hover:border-amber-500/30 transition duration-300">
            <div className="size-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4">
              <Zap className="size-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Devasa FPS Artışı</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fabric tabanlı özel motoru ve gömülü optimizasyon modları sayesinde oyun içi FPS değerlerinizi katlayın, donmaları sıfıra indirin.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-card/40 p-6 backdrop-blur-sm shadow-xl hover:border-orange-500/30 transition duration-300">
            <div className="size-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-4">
              <Cpu className="size-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Discord Rich Presence</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Oynadığınız dünyayı, kasaba durumunuzu veya adanızın seviyesini anlık olarak Discord profilinizde havalı bir şekilde sergileyin.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-card/40 p-6 backdrop-blur-sm shadow-xl hover:border-emerald-500/30 transition duration-300">
            <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-4">
              <ShieldCheck className="size-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hile Koruması & Güvenlik</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              KuramaMC ağ mimarisine tam entegre çalışan akıllı koruma sistemiyle adil ve güvenli bir oyun ortamının tadını çıkarın.
            </p>
          </div>
        </div>
      </section>

      {/* İLERİ SEVİYE AYARLAR & BELLEK YÖNETİMİ */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-6">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-neutral-950 to-neutral-900 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8">
          <div className="flex-grow space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold border border-orange-500/20">
              <Sliders className="size-3.5" /> Teknik Kontrol
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white font-display">Gelişmiş RAM & Performans Ayarları</h3>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Launcher arayüzünde bulunan gelişmiş ayarlar paneli sayesinde sisteminize en uygun RAM (bellek) miktarını tek bir sürgüyü kaydırarak atayabilirsiniz. İstemci, arka plandaki gereksiz Java çöp verilerini (Garbage Collector) sunucu mimarisine özel optimize ederek ani takılmaları engeller.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-300 pt-2">
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400 flex-shrink-0" /> Otomatik Sürüm İndirme</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400 flex-shrink-0" /> Akıllı Java Seçimi</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400 flex-shrink-0" /> Doku Paketi Önbellekleme</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-400 flex-shrink-0" /> Log Temizleme Motoru</div>
            </div>
          </div>
          <div className="w-full md:w-72 bg-neutral-900 border border-white/5 rounded-2xl p-6 space-y-4 shadow-inner flex-shrink-0">
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Örnek Panel Ön İzleme</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-neutral-300"><span>Ayrılan Bellek:</span> <span className="text-amber-400">4096 MB</span></div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden"><div className="w-1/2 h-full bg-gradient-amber rounded-full" /></div>
            </div>
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Tam Ekran Başlat</span> <div className="w-7 h-4 bg-amber-500 rounded-full p-0.5 flex justify-end"><div className="size-3 bg-black rounded-full" /></div></div>
              <div className="flex items-center justify-between text-xs"><span className="text-neutral-400">Mod Paketleri</span> <div className="w-7 h-4 bg-amber-500 rounded-full p-0.5 flex justify-end"><div className="size-3 bg-black rounded-full" /></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* YENİ ALAN: AKILLI HİLE KORUMASI (ANTI-CHEAT) DETAYLARI */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-red-950/20 border border-red-500/20 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <ShieldAlert className="size-8 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Geçit Yok!</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                KuramaClient, sunucu koruma yazılımımızla tescilli bir el sıkışma (handshake) protokolü kullanır. İstemci dışı girişler anında tespit edilir.
              </p>
            </div>
            <div className="text-xs text-red-400/70 font-mono mt-4">Korumalı Mimari v2.4</div>
          </div>
          
          <div className="md:col-span-2 bg-neutral-950/40 border border-white/5 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-white font-bold text-sm mb-1">Makro & CPS Sınırlayıcı</h4>
              <p className="text-neutral-400 text-xs">Donanımsal veya yazılımsal tıklama hileleri akıllı yapay zeka süzgecimizden kaçamaz.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-white font-bold text-sm mb-1">X-Ray Engelleme</h4>
              <p className="text-neutral-400 text-xs">Madenlerin yerini gösteren doku paketleri ve harici enjeksiyonlar tamamen bloke edilir.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-white font-bold text-sm mb-1">Memory Integrity Check</h4>
              <p className="text-neutral-400 text-xs">Oyun dosyalarının veya RAM verilerinin çalışma esnasında değiştirilmesi engellenir.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-white font-bold text-sm mb-1">Adil Sıralama Garantisi</h4>
              <p className="text-neutral-400 text-xs">Tüm klan ve ada yarışları tamamen eşit ve adil şartlar altında gerçekleştirilir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NASIL KURULUR? (TIMELINE ADIMLARI) */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-2 font-display">4 Kolay Adımda Başlayın</h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">Sunucuya katılmak ve oynamaya başlamak sadece birkaç dakikanızı alacak.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-neutral-950/40 border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
            <div className="text-4xl font-black text-neutral-800 absolute -top-2 -right-1 font-display group-hover:text-amber-500/10 transition-colors">01</div>
            <div className="size-9 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4 text-amber-400 font-bold text-sm">1</div>
            <h4 className="font-bold text-white text-base mb-1">İndirin</h4>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">Yukarıda bulunan devasa indirme butonunu kullanarak .EXE dosyasını bilgisayarınıza kaydedin.</p>
          </div>

          <div className="bg-neutral-950/40 border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
            <div className="text-4xl font-black text-neutral-800 absolute -top-2 -right-1 font-display group-hover:text-amber-500/10 transition-colors">02</div>
            <div className="size-9 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4 text-amber-400 font-bold text-sm">2</div>
            <h4 className="font-bold text-white text-base mb-1">Kurulumu Yapın</h4>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">İndirilen dosyaya çift tıklayarak kurulum sihirbazını başlatın ve yönergeleri takip edin.</p>
          </div>

          <div className="bg-neutral-950/40 border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
            <div className="text-4xl font-black text-neutral-800 absolute -top-2 -right-1 font-display group-hover:text-amber-500/10 transition-colors">03</div>
            <div className="size-9 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4 text-amber-400 font-bold text-sm">3</div>
            <h4 className="font-bold text-white text-base mb-1">Giriş Yapın</h4>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">KuramaMC kayıtlı kullanıcı adınız ve şifrenizle veya Premium hesabınızla oturum açın.</p>
          </div>

          <div className="bg-neutral-950/40 border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
            <div className="text-4xl font-black text-neutral-800 absolute -top-2 -right-1 font-display group-hover:text-amber-500/10 transition-colors">04</div>
            <div className="size-9 rounded-xl bg-gradient-amber flex items-center justify-center mb-4 text-primary-foreground font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.4)]">4</div>
            <h4 className="font-bold text-white text-base mb-1">Maceraya Atılın</h4>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">Oyna butonuna basarak gelişmiş Towny ve Skyblock sunucularımıza anında bağlanın.</p>
          </div>
        </div>
      </section>

      {/* KOZMETİK VE MAĞAZA REKLAMI */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-6">
        <div className="bg-[#12161f] border border-gray-800 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex-grow space-y-3">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-md">
              <Sparkles className="size-3" /> Görsel Şölen
            </span>
            <h3 className="text-2xl font-extrabold text-white font-display">Karakterinizi Özel Kozmetiklerle Özelleştirin</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              KuramaClient kullanan tüm oyuncularımız, sunucu ekosistemine entegre pelerinleri, şapkaları, özel kanatları ve evcil hayvan yoldaşlarını oyun içerisinde tamamen görebilir. Tarzınızı gökyüzünde veya krallığınızda ilan edin!
            </p>
            <div className="pt-2">
              <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 transition">
                Kozmetik Mağazasına Göz At
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto flex-shrink-0">
            <div className="bg-neutral-900/60 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-xs text-neutral-500 font-medium">Özel Pelerinler</div>
              <div className="text-lg font-bold text-white mt-0.5">Builder Cape</div>
            </div>
            <div className="bg-neutral-900/60 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-xs text-neutral-500 font-medium">Şapkalar</div>
              <div className="text-lg font-bold text-white mt-0.5">Hatchling Hat</div>
            </div>
            <div className="bg-neutral-900/60 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-xs text-neutral-500 font-medium">Evcil Hayvan</div>
              <div className="text-lg font-bold text-white mt-0.5">Turtle Tunes</div>
            </div>
            <div className="bg-neutral-900/60 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-xs text-neutral-500 font-medium">Aksesuarlar</div>
              <div className="text-lg font-bold text-white mt-0.5">Bunnie Beanie</div>
            </div>
          </div>
        </div>
      </section>

      {/* YENİ ALAN: LAUNCHER GELİŞTİRİCİ KONSOLU & YAMA NOTLARI */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-6">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white font-display">Son Güncellemeler & Geliştirici Konsolu</h2>
        </div>
        <div className="bg-neutral-950 rounded-2xl border border-white/10 p-5 font-mono text-xs shadow-2xl space-y-2 text-neutral-400 overflow-hidden relative">
          <div className="absolute top-2 right-4 flex gap-1.5">
            <div className="size-2 rounded-full bg-red-500" />
            <div className="size-2 rounded-full bg-yellow-500" />
            <div className="size-2 rounded-full bg-green-500" />
          </div>
          <div className="text-neutral-500 select-none pb-2 flex items-center gap-1"><Code className="size-3.5 text-amber-500" /> kuramalancher_debug_log.txt</div>
          <p className="text-emerald-400">[OK] KuramaClient v1.0.0 basariyla derlendi ve yayinlandi.</p>
          <p className="text-blue-400">[YAMA] Fabric engine son kararli sürüme yukseltildi.</p>
          <p className="text-white">[YAMA] GTX 1050 Ti ve alti ekran kartlari icin parcacik optimizasyonu saglandi.</p>
          <p className="text-amber-400">[BILGI] RAM tasan bellek alanlari otomatik Garbage Collector ile temizleniyor...</p>
          <p className="text-purple-400">[YENI] Discord Rich Presence durum bildirimleri artik kasaba adini gosteriyor.</p>
          <p className="text-neutral-600">[OK] Baglanti kuruldu: oyna.kuramamc.com.tr</p>
        </div>
      </section>

      {/* Sistem Gereksinimleri Alanı */}
      <section className="mx-auto max-w-5xl px-6 py-12 opacity-0 animate-entrance delay-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-2 font-display">Sistem Gereksinimleri</h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">Sorunsuz bir akıcılık elde etmek için gereken donanım tablosu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Minimum */}
          <div className="rounded-2xl border border-white/5 bg-neutral-950/40 p-6 backdrop-blur">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2 mb-4">
              <Terminal className="size-5" /> Minimum Gereksinimler
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex justify-between border-b border-white/5 pb-2"><span>İşletim Sistemi:</span> <span className="text-white">Windows 10 (64-bit)</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>İşlemci:</span> <span className="text-white">Intel Core i3-4130 / AMD FX-4300</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Bellek (RAM):</span> <span className="text-white">4 GB RAM</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Ekran Kartı:</span> <span className="text-white">Intel HD Graphics 4000</span></li>
              <li className="flex justify-between"><span>Depolama:</span> <span className="text-white">1 GB Boş Alan</span></li>
            </ul>
          </div>

          {/* Önerilen */}
          <div className="rounded-2xl border border-amber-500/10 bg-neutral-950/60 p-6 backdrop-blur shadow-[0_0_30px_rgba(245,158,11,0.02)]">
            <h3 className="text-lg font-bold text-orange-500 flex items-center gap-2 mb-4">
              <Monitor className="size-5" /> Önerilen Gereksinimler
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex justify-between border-b border-white/5 pb-2"><span>İşletim Sistemi:</span> <span className="text-white">Windows 10/11 (64-bit)</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>İşlemci:</span> <span className="text-white">Intel Core i5-7400 / AMD Ryzen 5 1600</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Bellek (RAM):</span> <span className="text-white">8 GB RAM (4GB İstemciye Ayrılan)</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Ekran Kartı:</span> <span className="text-white">NVIDIA GeForce GTX 1050 Ti / AMD RX 570</span></li>
              <li className="flex justify-between"><span>Depolama / Disk:</span> <span className="text-white">SSD (1 GB Boş Alan)</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* SSS / Sıkça Sorulan Sorular Alanı */}
      <section className="mx-auto max-w-3xl px-6 py-12 opacity-0 animate-entrance delay-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2 font-display">Sıkça Sorulan Sorular</h2>
          <p className="text-neutral-400 text-sm">Aklınıza takılabilecek temel sorular ve çözümleri.</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-white/5 bg-card/30 p-4">
            <h4 className="font-bold text-white text-sm sm:text-base mb-1">KuramaLauncher'ı kullanmak için orijinal hesaba ihtiyacım var mı?</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">Hayır, istemcimiz hem orijinal (Premium) hem de tescilli KuramaMC kayıt sisteminizle giriş yapabileceğiniz hibrit bir altyapıya sahiptir.</p>
          </div>

          <div className="rounded-xl border border-white/5 bg-card/30 p-4">
            <h4 className="font-bold text-white text-sm sm:text-base mb-1">Java kurmam gerekiyor mu?</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">Hayır, KuramaLauncher tamamen gömülü ve optimize edilmiş bir Java runtime mimarisiyle birlikte gelir. Bilgisayarınızda Java yüklü olmasa bile tek tıkla açılır.</p>
          </div>

          <div className="rounded-xl border border-white/5 bg-card/30 p-4">
            <h4 className="font-bold text-white text-sm sm:text-base mb-1">Windows "Korumalı PC" uyarısı alıyorum, ne yapmalıyım?</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">Yeni yayınlanan yürütülebilir dosyalar (.exe) Windows SmartScreen filtresine takılabilir. "Ek Bilgi" butonuna tıklayıp "Yine de Çalıştır" diyerek kurulumu güvenle tamamlayabilirsiniz.</p>
          </div>
        </div>
      </section>

      {/* BOTTOM DISCORD CALL TO ACTION (CTA) */}
      <section className="mx-auto max-w-5xl px-6 py-12 mb-12 opacity-0 animate-entrance delay-7">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-neutral-950 border border-indigo-500/20 p-8 text-center overflow-hidden shadow-2xl">
          <div className="absolute -bottom-10 -left-10 size-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-white font-display">Büyük Topluluğun Bir Parçası Olun!</h3>
            <p className="text-sm text-indigo-200/70 leading-relaxed">
              Launcher kurulumunda bir sorun mu yaşıyorsunuz? Ya da klan bulmak, çekilişlere katılmak ve güncellemelerden anında haberdar mı olmak istiyorsunuz? Hemen resmi Discord sunucumuza katılarak binlerce oyuncuyla etkileşime geçin.
            </p>
            <div className="pt-2">
              <a 
                href="#" 
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200"
              >
                <MessageCircle className="size-4" /> Discord Sunucusuna Katıl
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
