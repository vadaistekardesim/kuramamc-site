// src/routes/index.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { Server, Users, Shield, Zap, Award, ChevronRight, MessageCircle, Download, LayoutGrid, Cpu, Database, HardDrive, Swords, Key, HelpCircle } from 'lucide-react';
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { getServerStatus } from "@/lib/site.functions";

const SERVER_IP = "oyna.kuramamc.com.tr";

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 select-none antialiased">
      <style>{`
        @keyframes customScaleUp {
          0% { opacity: 0; transform: scale(0.96) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-entrance { animation: customScaleUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-1 { animation-delay: 100ms; }
        .delay-2 { animation-delay: 200ms; }
        .delay-3 { animation-delay: 300ms; }
      `}</style>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pb-20 pt-4">
        <img src={heroBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-500/5 via-background/90 to-background" />
        
        {/* Navbar */}
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 opacity-0 animate-entrance">
          <div className="flex items-center gap-3">
            <img src={logo} alt="KuramaMC" className="size-10 drop-shadow-[0_4px_12px_rgba(245,158,11,0.3)]" />
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-2 py-1.5 backdrop-blur md:flex">
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                <Server className="size-3.5 text-primary" />
                <span className="text-xs font-semibold text-neutral-300">{SERVER_IP}</span>
              </div>
              <LiveStatus ip={SERVER_IP} />
            </div>
          </div>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-1.5 backdrop-blur md:flex">
            <Link to="/" className="rounded-full px-4 py-1.5 text-sm bg-white/10 text-foreground transition">Ana Sayfa</Link>
            <Link to="/launcher" className="rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground transition">Launcher</Link>
            <Link to="/blog" className="rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground transition">Haberler</Link>
            <Link to="/shop" className="rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground transition">Mağaza</Link>
            <Link to="/support" className="rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground transition">Destek</Link>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center gap-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 px-4 py-2 text-xs font-bold text-indigo-300 hover:bg-indigo-500/30 transition">
              <MessageCircle className="size-3.5" /> Discord
            </a>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight opacity-0 animate-entrance delay-1">
            Gelişmiş Karma Ağ Mimarisi<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">KuramaMC Network</span>
          </h1>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-base md:text-lg opacity-0 animate-entrance delay-2">
            Klasik sunucu deneyimlerini unutun. Towny ve Skyblock modlarını tek bir çatı altında toplayan, optimize edilmiş asenkron çekirdek yapısıyla kesintisiz bir dünya mimarisi sizi bekliyor.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-entrance delay-3">
            <Link to="/launcher" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-amber px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition group">
              <Download className="size-5 group-hover:translate-y-0.5 transition-transform" /> KuramaLauncher İndir
            </Link>
            <button 
              onClick={() => navigator.clipboard.writeText(SERVER_IP)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-4 font-semibold text-white transition"
            >
              <Key className="size-5 text-amber-500" /> IP'yi Kopyala
            </button>
          </div>
        </div>
      </section>

      {/* Ağ Mimarisi & Altyapı Verileri (Hardcore Teknik Alan) */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4 text-amber-400">
              <Database className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Towny Gelişmiş Modülü</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Özel veritabanı optimizasyonumuz sayesinde binlerce chunk ve kasaba verisi asenkron işlenir. Sınırlar genişlerken TPS değeriniz asla düşmez.
            </p>
          </div>

          <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-4 text-orange-400">
              <Cpu className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Skyblock Çekirdek Havuzu</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Ada jeneratörleri ve gelişmiş huni (hopper) filtreleme algoritmaları, işlemci çekirdeklerine (multi-threading) dengeli şekilde dağıtılır.
            </p>
          </div>

          <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="size-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mb-4 text-indigo-400">
              <HardDrive className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Velocity Proxy Köprüsü</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Lobiler ve oyun dünyaları arasındaki geçişlerde paket kayıpları (packet loss) sıfıra indirgenmiştir. Kararlı bir el sıkışma protokolü devrededir.
            </p>
          </div>
        </div>
      </section>

      {/* Sunucu Canlı İstatistik Monitörü */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="bg-neutral-950 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="space-y-2">
            <div className="text-xs font-bold text-amber-500 uppercase tracking-wider">Ağ Operasyon Merkezi (NOC)</div>
            <h2 className="text-2xl md:text-3xl font-black text-white font-display">Donanımsal Sağlık & Küresel Durum</h2>
            <p className="text-sm text-neutral-400 max-w-md">KuramaMC sunucuları, en kararlı altyapıyı sunmak adına anlık olarak donanım izleme (UptimeRobot/Better Stack) sistemleriyle kontrol edilir.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full md:w-auto font-mono text-xs">
            <div className="bg-white/5 border border-white/5 rounded-xl p-4"><div className="text-neutral-500 uppercase">Hat Kapasitesi</div><div className="text-base font-bold text-white mt-1">1 Gbps Simetrik</div></div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4"><div className="text-neutral-500 uppercase">Yedekleme Döngüsü</div><div className="text-base font-bold text-white mt-1">6 Saat / Uzak</div></div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4 col-span-2 sm:col-span-1"><div className="text-neutral-500 uppercase">Ortalama Uptime</div><div className="text-base font-bold text-emerald-400 mt-1">%99.98</div></div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LiveStatus({ ip }: { ip: string }) {
  const [s, setS] = useState<{ online: boolean; players: number; max: number } | null>(null);
  const fetchStatus = useServerFn(getServerStatus);
  useEffect(() => {
    fetchStatus({ data: { host: ip } }).then(setS).catch(() => {});
  }, [ip, fetchStatus]);
  return (
    <span className="text-xs text-neutral-400">
      {s ? `${s.players}/${s.max} Çevrimiçi` : "Soket taranıyor..."}
    </span>
  );
}
