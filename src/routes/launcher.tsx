// src/routes/launcher.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { Download, Cpu, ShieldCheck, Zap, Server, MessageCircle, LogIn, UserPlus, Sparkles, CheckCircle2, Terminal, Monitor, HelpCircle, Sword, Box, Layers } from 'lucide-react';
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import heroBg from "@/assets/hero-bg.jpg"; // Projenizdeki görsel yolunuz
import logo from "@/assets/logo.png";
import { getServerStatus } from "@/lib/site.functions";

const SERVER_IP = "oyna.kuramamc.com.tr";
const DOWNLOAD_LINK = "https://indirmek-istedigin-url.com/KuramaClient.exe"; 

export const Route = createFileRoute('/launcher')({
  component: LauncherComponent,
});

function LauncherComponent() {
  return (
    <div className="min-h-screen bg-[#050505] text-foreground selection:bg-amber-500/30 select-none antialiased">
      <style>{`
        @keyframes customScaleUp {
          0% { opacity: 0; transform: scale(0.98) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-entrance { animation: customScaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-[#050505] to-[#050505]" />
        
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="size-8" />
            <span className="font-bold text-lg tracking-tight">Kurama<span className="text-amber-500">MC</span></span>
          </div>
          <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition">Ana Sayfaya Dön</Link>
        </header>

        <div className="mx-auto max-w-4xl px-6 pt-16 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest border border-amber-500/20 mb-6 animate-entrance">
            <Sparkles className="size-3" /> KuramaLauncher v2.0 Şimdi Yayında
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 animate-entrance [animation-delay:100ms]">
            Oyununu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Zirveye</span> Taşı.
          </h1>
          
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-entrance [animation-delay:200ms]">
            KuramaLauncher, sadece bir başlatıcı değil; ItemsAdder ile donatılmış özel setlerin, yüksek FPS'in ve kusursuz bir oyun deneyiminin anahtarıdır.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-entrance [animation-delay:300ms]">
            <a href={DOWNLOAD_LINK} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <Download className="size-5" /> Hemen İndir (Windows)
            </a>
            <div className="text-xs text-neutral-600 font-mono">
              v2.0.4 • 45MB • EXE Formatı
            </div>
          </div>
        </div>
      </section>

      {/* ÖZEL SETLER VURGUSU */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-500">
              <Sword className="size-5" />
              <span className="font-bold uppercase tracking-wider text-sm">Görsel Devrim</span>
            </div>
            <h2 className="text-4xl font-black text-white leading-tight">ItemsAdder İle Gelen <br /> Özel Set Dünyası</h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Standart Minecraft görsellerinden sıkıldın mı? KuramaLauncher, sunucumuzdaki tüm ItemsAdder özel setlerini, kılıç tasarımlarını ve nadir ekipmanları en akıcı şekilde render eder. Kendi özel modellemelerimizi ve doku paketimizi kusursuz çalıştıran tek yer burası.
            </p>
            <ul className="space-y-3">
              {[ "Özel 3D Model Tasarımlar", "Yüksek Kalite Doku Paketi Otomasyonu", "FPS Dostu Görsel İşleme"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-300">
                  <div className="bg-amber-500/20 p-1 rounded"><CheckCircle2 className="size-4 text-amber-500" /></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-neutral-900/50 border border-white/5 p-4 rounded-3xl backdrop-blur relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-3xl" />
             <div className="aspect-video bg-neutral-950 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden">
                <Box className="size-20 text-neutral-800" />
                <span className="absolute text-neutral-700 font-bold text-sm">Özel Set Görseli Buraya</span>
             </div>
          </div>
        </div>
      </section>

      {/* PERFORMANS VE ÖZELLİKLER */}
      <section className="bg-neutral-900/20 border-y border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white mb-4">Launcher'ın Gücünü Hisset</h2>
            <p className="text-neutral-400">Sadece oyun değil, performans odaklı bir ekosistem.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Maksimum FPS", desc: "Fabric tabanlı özel motor ile donma ve kasmaları tarihe göm." },
              { icon: Cpu, title: "Akıllı RAM Yönetimi", desc: "Sisteminize en uygun bellek tahsisini otomatik yapar, RAM şişmelerini engeller." },
              { icon: ShieldCheck, title: "Anlık Güncellemeler", desc: "Yeni çıkan özel setler ve içerikler için paketi manuel indirmenize gerek kalmaz." }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl bg-neutral-950/50 border border-white/5 hover:border-amber-500/30 transition-all group">
                <div className="size-12 rounded-xl bg-neutral-900 flex items-center justify-center mb-6 group-hover:bg-amber-500/10 transition">
                  <f.icon className="size-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SİSTEM GEREKSİNİMLERİ */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="bg-neutral-950 rounded-3xl border border-white/10 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
                <Monitor className="text-amber-500" />
                <h3 className="text-2xl font-black text-white">Sistem Gereksinimleri</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-4">
                    <p className="text-neutral-500 uppercase font-bold text-xs tracking-wider">Minimum</p>
                    <div className="flex justify-between border-b border-white/5 pb-2 text-neutral-300"><span>RAM</span> <span>4 GB</span></div>
                    <div className="flex justify-between border-b border-white/5 pb-2 text-neutral-300"><span>İşlemci</span> <span>Core i3 4. Nesil</span></div>
                </div>
                <div className="space-y-4">
                    <p className="text-neutral-500 uppercase font-bold text-xs tracking-wider">Önerilen</p>
                    <div className="flex justify-between border-b border-white/5 pb-2 text-neutral-300"><span>RAM</span> <span>8 GB+</span></div>
                    <div className="flex justify-between border-b border-white/5 pb-2 text-neutral-300"><span>Ekran Kartı</span> <span>GTX 1050 Ti veya üstü</span></div>
                </div>
            </div>
        </div>
      </section>

      <footer className="py-12 text-center text-neutral-600 text-sm">
        KuramaMC © 2026 • Launcher V2 • Tüm Hakları Saklıdır.
      </footer>
    </div>
  );
}
