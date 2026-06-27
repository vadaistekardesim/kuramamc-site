import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react"; // <-- Patlamaya sebep olan useRef buraya eklendi
import { useServerFn } from "@tanstack/react-start";
import { Copy, LogIn, UserPlus, Users, Activity, ChevronDown, MessageCircle, Server, ShoppingBag, LifeBuoy, Circle as HelpCircle, Trophy, Crown, Sparkles, Mail, Send, CircleCheck as CheckCircle2, Loader as Loader2, Signal, Wifi, Clock, Calendar, User, ArrowRight, Image as ImageIcon } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { submitContact, subscribeNewsletter, getServerStatus } from "@/lib/site.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KuramaMC — Gelişmiş Minecraft Deneyimi" },
      { name: "description", content: "KuramaMC: Gelişmiş temalı, kaliteli, yüksek performanslı ve kararlı bir Minecraft deneyimi. IP: oyna.kuramamc.com.tr" },
      { property: "og:title", content: "KuramaMC" },
      { property: "og:description", content: "Gelişmiş ve yenilikçi bir Minecraft deneyimi. IP: oyna.kuramamc.com.tr" },
    ],
  }),
  component: Home,
});

const SERVER_IP = "oyna.kuramamc.com.tr";

const overall = [
  { name: "NF4EVER", amount: "625.00 ₺" },
  { name: "Rixon323", amount: "400.00 ₺" },
  { name: "Admin", amount: "1.00 ₺" },
];

const faqs = [
  { q: "Sunucuya nasıl katılabilirim?", a: `Minecraft'ı açın → Çok Oyunculu → Sunucu Ekle → IP: ${SERVER_IP}` },
  { q: "Mağaza ürünleri ne zaman teslim edilir?", a: "Satın aldığınız ürünler genellikle 1-5 dakika içerisinde otomatik olarak teslim edilir." },
  { q: "Yetkili alımları var mı?", a: "Yetkili alımları olduğunda Discord sunucumuz üzerinden duyuru yapılmaktadır." },
  { q: "Hangi sürümlerden bağlanabilirim?", a: "1.20.x ve üzeri tüm Java Edition sürümlerinden bağlanabilirsiniz." },
];

const STATIC_NEWS = [
  {
    _id: "1",
    slug: "towny-yakinda-aciliyor",
    tag: "DUYURU",
    title: "⚔️ Gelişmiş Towny Dünyası Açılıyor!",
    author: "MrShivada",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200", 
    excerpt: "Gelişmiş teması, eşsiz mekanikleri ve kusursuz ağ mimarisiyle yeni Towny sunucumuz çok yakın...",
    createdAt: "2026-06-27T13:25:00.000Z"
  },
  {
    _id: "2",
    slug: "skyblock-yakinda-aciliyor",
    tag: "DUYURU",
    title: "☁️ Gelişmiş Skyblock Dünyası Geliyor!",
    author: "MrShivada",
    image: "", 
    excerpt: "Gökyüzündeki imparatorluğunuzu kurmaya hazır olun. Tamamen baştan tasarlanan gelişmiş Skyblock sunucumuz çok yakında kapılarını açıyor!",
    createdAt: "2026-06-28T10:00:00.000Z"
  }
];

function Home() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden select-none">
      <style>{`
        @keyframes customScaleUp {
          0% {
            opacity: 0;
            transform: scale(0.6) translateY(20px);
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
      `}</style>

      <Hero copyIp={copyIp} copied={copied} />
      <StatusSection />
      <NewsSection />
      <LeaderboardSection />
      <ContactSection />
      <NewsletterSection />
      <FAQSection faqs={faqs} open={open} setOpen={setOpen} />
      <CTASection copyIp={copyIp} copied={copied} />
      <Footer />
    </div>
  );
}

function Hero({ copyIp, copied }: { copyIp: () => void; copied: boolean }) {
  return (
    <section className="relative isolate overflow-hidden">
      <img src={heroBg} alt="" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-500/30 via-background/60 to-background" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.8_0.2_60/0.35),transparent_60%)]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 opacity-0 animate-entrance">
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
          <Link to="/" className="rounded-full px-4 py-2 text-sm bg-white/10 text-foreground transition">Ana Sayfa</Link>
          <Link to="/launcher" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Launcher</Link>
          <Link to="/blog" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Haberler</Link>
          <a href="#" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Mağaza</a>
          <a href="#contact" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Destek</a>
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

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-32 pt-20 text-center md:pt-28">
        <img src={logo} alt="KuramaMC" width={96} height={96} className="mb-6 drop-shadow-[0_8px_24px_oklch(0.7_0.2_60/0.6)] opacity-0 animate-entrance delay-1" />
        <h1 className="font-display text-6xl font-extrabold tracking-tight md:text-8xl opacity-0 animate-entrance delay-2">
          <span className="text-gradient-amber">KuramaMC</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground opacity-0 animate-entrance delay-3">
          Gelişmiş altyapısı, kaliteli sistemleri & kararlı yapısıyla benzersiz bir Minecraft deneyimi.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0 animate-entrance delay-4">
          <button className="rounded-xl bg-gradient-amber px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]">
            Hemen Kayıt Ol
          </button>
          <button onClick={copyIp} className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wider backdrop-blur transition hover:bg-white/5">
            <Copy className="size-4" /> {copied ? "Kopyalandı!" : SERVER_IP}
          </button>
        </div>
      </div>
    </section>
  );
}

function LiveDot() {
  const [s, setS] = useState<{ online: boolean; players: number; max: number } | null>(null);
  const fetchStatus = useServerFn(getServerStatus);
  useEffect(() => {
    let cancelled = false;
    const run = () => fetchStatus({ data: { host: SERVER_IP } }).then(r => { if (!cancelled) setS(r); }).catch(() => {});
    run();
    const t = setInterval(run, 30000);
    return () => { cancelled = true; clearInterval(t); };
  }, [fetchStatus]);
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <span className={`size-1.5 rounded-full ${s?.online ? "bg-emerald-400" : "bg-rose-400"}`} />
      {s ? `${s.players}/${s.max} Çevrimiçi` : "Bağlanıyor…"}
    </div>
  );
}

function StatusSection() {
  const [s, setS] = useState<Awaited<ReturnType<typeof getServerStatus>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [uptimeStart] = useState(() => Date.now());
  const [, setTick] = useState(0);
  const fetchStatus = useServerFn(getServerStatus);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const r = await fetchStatus({ data: { host: SERVER_IP } });
        if (cancelled) return;
        setS(r); setLastUpdate(new Date()); setLoading(false);
      } catch { if (!cancelled) setLoading(false); }
    };
    run();
    const refresh = setInterval(run, 30000);
    const tick = setInterval(() => setTick(t => t + 1), 1000);
    return () => { cancelled = true; clearInterval(refresh); clearInterval(tick); };
  }, [fetchStatus]);

  const sessionUptime = Math.floor((Date.now() - uptimeStart) / 1000);
  const fmt = (sec: number) => {
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    return `${h}sa ${m}d ${s}sn`;
  };

  const stats = [
    { icon: <Users className="size-5" />, label: "Çevrimiçi Oyuncu", value: s ? `${s.players}/${s.max}` : "—" },
    { icon: <Signal className="size-5" />, label: "Ping (Sunucudan)", value: s ? `${s.ping} ms` : "—", tint: s && s.ping < 100 ? "text-emerald-400" : s && s.ping < 250 ? "text-amber-400" : "text-rose-400" },
    { icon: <Wifi className="size-5" />, label: "Versiyon", value: s?.version ?? "—" },
    { icon: <Activity className="size-5" />, label: "Uptime (Oturum)", value: fmt(sessionUptime) },
  ];

  return (
    <section id="status" className="mx-auto max-w-7xl px-6 py-24 opacity-0 animate-entrance delay-3">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold md:text-5xl">Canlı <span className="text-gradient-amber">Sunucu Durumu</span></h2>
        <p className="mt-3 text-muted-foreground">{SERVER_IP} — 30 saniyede bir güncellenir.</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-card backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className={`relative flex size-3`}>
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${s?.online ? "bg-emerald-400" : "bg-rose-400"}`} />
              <span className={`relative inline-flex size-3 rounded-full ${s?.online ? "bg-emerald-400" : "bg-rose-400"}`} />
            </span>
            <div>
              <div className="font-bold">{loading ? "Kontrol ediliyor…" : s?.online ? "Çevrimiçi" : "Çevrimdışı"}</div>
              <div className="text-xs text-muted-foreground">
                {lastUpdate ? `Son güncelleme: ${lastUpdate.toLocaleTimeString("tr-TR")}` : "—"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs">
            <Clock className="size-3.5 text-primary" /> 99.9% genel uptime
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/5 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card p-6">
              <div className="mb-2 flex items-center gap-2 text-primary">{stat.icon}<span className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</span></div>
              <div className={`text-2xl font-bold ${stat.tint ?? ""}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {s?.motd && (
          <div className="border-t border-white/5 px-6 py-4 text-center text-sm text-muted-foreground">
            <span className="text-primary">MOTD:</span> {s.motd}
          </div>
        )}
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section id="news" className="mx-auto max-w-7xl px-6 py-24 opacity-0 animate-entrance delay-4">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold md:text-5xl">Son <span className="text-gradient-amber">Haberler</span></h2>
        <p className="mt-3 text-muted-foreground">Sunucumuzdan en son gelişmeler, etkinlikler ve duyurular.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {STATIC_NEWS.map((item) => (
          <article 
            key={item._id} 
            className="group flex flex-col bg-[#151a23]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
          >
            <div className="w-full h-48 relative overflow-hidden bg-gray-900 flex items-center justify-center border-b border-gray-800">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none" 
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-600/20 via-slate-800 to-[#151a23] flex items-center justify-center">
                  <ImageIcon className="size-8 text-gray-700 group-hover:text-orange-500/40 transition-colors" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-orange-500/90 backdrop-blur text-white font-bold text-[10px] tracking-wide px-2.5 py-1 rounded-md uppercase shadow-md">
                  {item.tag}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs flex items-center gap-1 text-gray-500">
                  <Calendar size={12} />
                  {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                {item.title}
              </h2>

              <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-grow">
                {item.excerpt}
              </p>

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
    </section>
  );
}

function LeaderboardSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 opacity-0 animate-entrance delay-4">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold md:text-5xl">Sıralama & <span className="text-gradient-amber">Aktivite</span></h2>
        <p className="mt-3 text-muted-foreground">Sunucumuzun en aktif ve destekçi oyuncularını buradan takip edebilirsiniz.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-card p-6 backdrop-blur flex flex-col justify-between">
          <div className="mb-5 flex items-center gap-2 font-semibold">
            <Trophy className="size-5 text-primary" /> Haftalık Destekçiler
          </div>
          <div className="flex flex-1 items-center justify-center py-12 text-sm text-muted-foreground italic">
            Bulunamadı...
          </div>
        </div>

        <LeaderCard icon={<Crown className="size-5" />} title="Genel Destekçiler" rows={overall} label="Efsane Destekçi" />

        <div className="rounded-2xl border border-white/10 bg-card p-6 backdrop-blur flex flex-col justify-between">
          <div className="mb-5 flex items-center gap-2 font-semibold">
            <ShoppingBag className="size-5 text-primary" /> Son Mağaza İşlemleri
          </div>
          <div className="flex flex-1 items-center justify-center py-12 text-sm text-muted-foreground italic">
            Bulunamadı...
          </div>
        </div>
      </div>
    </section>
  );
}

function LeaderCard({ icon, title, rows, label }: { icon: React.ReactNode; title: string; rows: { name: string; amount: string }[]; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 backdrop-blur">
      <div className="mb-5 flex items-center gap-2 font-semibold">
        <span className="text-primary">{icon}</span> {title}
      </div>
      <ul className="space-y-3">
        {rows.map((r, i) => (
          <li key={i} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <span className={`flex size-7 items-center justify-center rounded-md text-xs font-bold ${i === 0 ? "bg-gradient-amber text-primary-foreground" : "bg-white/10 text-muted-foreground"}`}>#{i + 1}</span>
            <img 
              src={`https://minotar.net/avatar/${r.name}/32.png`} 
              alt="" 
              className="size-8 rounded-md bg-white/10"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://minotar.net/avatar/MHF_Steve/32.png";
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{r.name}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
            <div className="text-sm font-bold text-primary">{r.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// BU BİLEŞEN ARTIK HATA VERMEYECEK
function ContactSection() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const mountedAt = useRef(Date.now());
  const send = useServerFn(submitContact);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); setErrMsg("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      elapsedMs: Date.now() - mountedAt.current,
    };

    const ce: Record<string, string> = {};
    if (!payload.name.trim()) ce.name = "İsim zorunlu";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) ce.email = "Geçerli e-posta girin";
    if (!payload.subject.trim()) ce.subject = "Konu zorunlu";
    if (payload.message.trim().length < 5) ce.message = "Mesaj en az 5 karakter";
    if (Object.keys(ce).length) { setErrors(ce); return; }

    setState("loading");
    try {
      await send({ data: payload });
      setState("ok");
      (e.target as HTMLFormElement).reset();
      mountedAt.current = Date.now();
    } catch (err) {
      setState("err");
      setErrMsg(err instanceof Error ? err.message : "Bir hata oluştu");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24 opacity-0 animate-entrance delay-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold md:text-5xl">Bize <span className="text-gradient-amber">Ulaşın</span></h2>
        <p className="mt-3 text-muted-foreground">Sorularınız, önerileriniz veya iş birliği için doldurun. En kısa sürede dönüş yaparız.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-card p-6 backdrop-blur sm:p-8">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] size-0 opacity-0" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="İsim" name="name" error={errors.name} />
          <Field label="E-posta" name="email" type="email" error={errors.email} />
        </div>
        <Field label="Konu" name="subject" error={errors.subject} />
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mesaj</label>
          <textarea name="message" rows={5} maxLength={2000}
            className="w-full resize-y rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm outline-none ring-primary/40 transition focus:border-primary/40 focus:ring-2" />
          {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message}</p>}
        </div>

        {state === "ok" && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <CheckCircle2 className="size-4" /> Mesajınız alındı! En kısa sürede dönüş yapacağız.
          </div>
        )}
        {state === "err" && (
          <div className="rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{errMsg || "Gönderilemedi"}</div>
        )}

        <button type="submit" disabled={state === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-amber px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-glow)] transition disabled:opacity-60">
          {state === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          {state === "loading" ? "Gönderiliyor…" : "Mesaj Gönder"}
        </button>
        <p className="text-center text-[11px] text-muted-foreground">Spam korumalı form · IP başına saatte 3 mesaj sınırı.</p>
      </form>
    </section>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input name={name} type={type} maxLength={255}
        className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm outline-none ring-primary/40 transition focus:border-primary/40 focus:ring-2" />
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  const [already, setAlready] = useState(false);
  const hp = useRef<HTMLInputElement>(null);
  const subscribe = useServerFn(subscribeNewsletter);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("err"); setMsg("Geçerli bir e-posta girin."); return;
    }
    setState("loading"); setMsg("");
    try {
      const r = await subscribe({ data: { email, website: hp.current?.value ?? "" } });
      setAlready(!!r.already);
      setState("ok");
      setEmail("");
    } catch (err) {
      setState("err");
      setMsg(err instanceof Error ? err.message : "Hata oluştu");
    }
  };

  return (
    <section className="relative isolate overflow-hidden opacity-0 animate-entrance delay-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.2_50/0.2),transparent_60%)]" />
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <Mail className="mx-auto mb-3 size-8 text-primary" />
        <h2 className="text-3xl font-extrabold md:text-4xl">Bültenimize <span className="text-gradient-amber">Abone Olun</span></h2>
        <p className="mt-3 text-muted-foreground">Güncellemeler, etkinlikler ve özel kodlar doğrudan e-postanıza gelsin.</p>

        <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
          <input ref={hp} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
            className="pointer-events-none absolute -left-[9999px] size-0 opacity-0" />
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@eposta.com" maxLength={255}
            className="flex-1 rounded-xl border border-white/10 bg-background/60 px-4 py-3.5 text-sm outline-none ring-primary/40 transition focus:border-primary/40 focus:ring-2"
          />
          <button type="submit" disabled={state === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-amber px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-glow)] transition disabled:opacity-60">
            {state === "loading" ? <Loader2 className="size-4 animate-spin" /> : "Abone Ol"}
          </button>
        </form>

        {state === "ok" && (
          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            <CheckCircle2 className="size-4" />
            {already ? "Zaten abonesiniz — teşekkürler!" : "Aboneliğiniz alındı! Hoş geldiniz."}
          </div>
        )}
        {state === "err" && (
          <div className="mx-auto mt-4 inline-flex rounded-full bg-rose-500/10 px-4 py-2 text-sm text-rose-300">{msg}</div>
        )}
      </div>
    </section>
  );
}

function FAQSection({ faqs, open, setOpen }: { faqs: { q: string; a: string }[]; open: number | null; setOpen: (n: number | null) => void }) {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-24 opacity-0 animate-entrance delay-4">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold md:text-5xl">Sıkça Sorulan <span className="text-gradient-amber">Sorular</span></h2>
        <p className="mt-3 text-muted-foreground">Sunucumuz hakkında en çok sorulan sorular.</p>
        <a href="#contact" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-amber px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
          <LifeBuoy className="size-4" /> Destek Al
        </a>
      </div>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-card backdrop-blur">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left">
              <span className="flex items-center gap-3 font-semibold">
                <HelpCircle className="size-5 text-primary" />
                <span className="text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                {f.q}
              </span>
              <ChevronDown className={`size-5 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <div className="border-t border-white/5 px-5 py-4 text-sm text-muted-foreground">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ copyIp, copied }: { copyIp: () => void; copied: boolean }) {
  return (
    <section className="relative isolate overflow-hidden opacity-0 animate-entrance delay-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.2_50/0.35),transparent_60%)]" />
      <div className="mx-auto max-w-4xl px-6 py-28 text-center">
        <Sparkles className="mx-auto mb-4 size-8 text-primary" />
        <h2 className="text-4xl font-extrabold md:text-6xl">Maceraya katılmaya <span className="text-gradient-amber">hazır mısın?</span></h2>
        <p className="mt-4 text-muted-foreground">Hemen kaydol ve krallığın için ilk adımı at.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="rounded-xl bg-gradient-amber px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-glow)]">Hemen Kayıt Ol</button>
          <button onClick={copyIp} className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-white/5">
            <Copy className="size-4" /> {copied ? "Kopyalandı!" : SERVER_IP}
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-center text-sm text-muted-foreground opacity-0 animate-entrance delay-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6">
        <img src={logo} alt="" width={36} height={36} loading="lazy" />
        <div>© {new Date().getFullYear()} KuramaMC — Tüm hakları saklıdır.</div>
        <div className="flex gap-4 text-xs">
          <a href="#" className="hover:text-foreground">Gizlilik</a>
          <a href="#" className="hover:text-foreground">Şartlar</a>
          <a href="#contact" className="hover:text-foreground">İletişim</a>
        </div>
      </div>
    </footer>
  );
}
