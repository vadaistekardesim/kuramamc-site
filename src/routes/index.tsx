import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Copy, LogIn, UserPlus, Users, Activity, Megaphone, ChevronDown, MessageCircle, Server, ShoppingBag, LifeBuoy, Circle as HelpCircle, Trophy, Crown, Sparkles, Mail, Send, CircleCheck as CheckCircle2, Loader as Loader2, Signal, Wifi, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { submitContact, subscribeNewsletter, getServerStatus } from "@/lib/site.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raines Network — Minecraft Sunucusu" },
      { name: "description", content: "Raines Network: Farklı bir minecraft deneyimi sunmak için buradayız. IP: oyna.rainesmc.net.tr" },
      { property: "og:title", content: "Raines Network" },
      { property: "og:description", content: "Farklı bir minecraft deneyimi. IP: oyna.rainesmc.net.tr" },
    ],
  }),
  component: Home,
});

const SERVER_IP = "oyna.rainesmc.net.tr";

const news = [
  { tag: "Bildiri", date: "12 Haz, 18:00", title: "Yeni VIPLER", body: "Yeni eklenen VIP paketleriyle çok daha fazla ayrıcalığa sahip olabilirsiniz." },
  { tag: "Bildiri", date: "10 Haz, 21:15", title: "Spawn Düzenlemesi", body: "SMP başlangıç bölgesi tamamen yenilendi. Keyifli oyunlar dileriz." },
  { tag: "Bildiri", date: "08 Haz, 12:40", title: "Discord Çekilişleri", body: "Discord sunucumuzda VIP, anahtar ve daha fazlasını hediye ediyoruz." },
];

const weekly = [
  { name: "ruyagibi", amount: "9,175.00 ₺" },
  { name: "xkios", amount: "900.00 ₺" },
  { name: "leeeeth", amount: "500.00 ₺" },
  { name: "cliesthebest", amount: "500.00 ₺" },
  { name: "zeynoopsi", amount: "350.00 ₺" },
];
const overall = [
  { name: "ruyagibi", amount: "9,225.00 ₺" },
  { name: "cliesthebest", amount: "1,350.00 ₺" },
  { name: "xkios", amount: "900.00 ₺" },
  { name: "leeeeth", amount: "500.00 ₺" },
  { name: "zeynoopsi", amount: "350.00 ₺" },
];
const purchases = [
  { name: "fivecanine", item: "2.500 KRİSTAL", ago: "8 saat önce" },
  { name: "cliesthebest", item: "500 KRİSTAL", ago: "3 gün önce" },
  { name: "cliesthebest", item: "5.000 KRİSTAL", ago: "3 gün önce" },
  { name: "cliesthebest", item: "10.000 KRİSTAL", ago: "3 gün önce" },
  { name: "ruyagibi", item: "25.000 KRİSTAL", ago: "5 gün önce" },
];

const faqs = [
  { q: "Sunucuya nasıl katılabilirim?", a: `Minecraft'ı açın → Çok Oyunculu → Sunucu Ekle → IP: ${SERVER_IP}` },
  { q: "Mağaza ürünleri ne zaman teslim edilir?", a: "Satın aldığınız ürünler genellikle 1-5 dakika içerisinde otomatik olarak teslim edilir." },
  { q: "Yetkili alımları var mı?", a: "Yetkili alımları olduğunda Discord sunucumuz üzerinden duyuru yapılmaktadır." },
  { q: "Hangi sürümlerden bağlanabilirim?", a: "1.20.x ve üzeri tüm Java Edition sürümlerinden bağlanabilirsiniz." },
];

function Avatar({ name, size = 38 }: { name: string; size?: number }) {
  return (
    <img
      src={`https://minotar.net/avatar/${name}/${size}`}
      alt={name}
      width={size} height={size} loading="lazy"
      className="rounded-md shadow-md ring-1 ring-white/10"
    />
  );
}

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
    <div className="min-h-screen">
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

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
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
          {[{l:"Ana Sayfa",h:"/"},{l:"Durum",h:"#status"},{l:"Bültenler",h:"#news"},{l:"Mağaza",h:"/store"},{l:"Yardım",h:"/help"}].map((x, i) => (
            <a key={x.l} href={x.h} className={`rounded-full px-4 py-2 text-sm transition ${i === 0 ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{x.l}</a>
          ))}
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
        <img src={logo} alt="Raines Network" width={96} height={96} className="mb-6 drop-shadow-[0_8px_24px_oklch(0.7_0.2_60/0.6)]" />
        <h1 className="font-display text-6xl font-extrabold tracking-tight md:text-8xl">
          <span className="text-gradient-amber">Raines Network</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Farklı bir minecraft deneyimi sunmak için buradayız.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
    <section id="status" className="mx-auto max-w-7xl px-6 py-24">
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
    <section id="news" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold md:text-5xl">Son <span className="text-gradient-amber">Güncellemeler</span></h2>
        <p className="mt-3 text-muted-foreground">Sunucumuza eklenen en yeni özellikler ve haberler.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {news.map((n) => (
          <article key={n.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 backdrop-blur transition hover:border-primary/40">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-amber opacity-60" />
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
                <Megaphone className="size-3" /> {n.tag}
              </span>
              <span className="text-xs text-muted-foreground">{n.date}</span>
            </div>
            <h3 className="text-xl font-bold">{n.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{n.body}</p>
            <a href="#" className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline">Detaylar →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function LeaderboardSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold md:text-5xl">Sıralama & <span className="text-gradient-amber">Aktivite</span></h2>
        <p className="mt-3 text-muted-foreground">Sunucumuzun en aktif ve destekçi oyuncularını buradan takip edebilirsiniz.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <LeaderCard icon={<Trophy className="size-5" />} title="Haftalık Destekçiler" rows={weekly} label="Toplam Destek" />
        <LeaderCard icon={<Crown className="size-5" />} title="Genel Destekçiler" rows={overall} label="Efsane Destekçi" />

        <div className="rounded-2xl border border-white/10 bg-card p-6 backdrop-blur">
          <div className="mb-5 flex items-center gap-2 font-semibold">
            <ShoppingBag className="size-5 text-primary" /> Son Mağaza İşlemleri
          </div>
          <ul className="space-y-3">
            {purchases.map((p, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                <Avatar name={p.name} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-primary">{p.item}</div>
                </div>
                <div className="text-xs text-muted-foreground">{p.ago}</div>
              </li>
            ))}
          </ul>
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
            <Avatar name={r.name} />
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
      website: String(fd.get("website") ?? ""), // honeypot
      elapsedMs: Date.now() - mountedAt.current,
    };

    // Client-side validation mirrors server
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
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold md:text-5xl">Bize <span className="text-gradient-amber">Ulaşın</span></h2>
        <p className="mt-3 text-muted-foreground">Sorularınız, önerileriniz veya iş birliği için doldurun. 24 saat içinde dönüş yaparız.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-card p-6 backdrop-blur sm:p-8">
        {/* honeypot — hidden from humans */}
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
    <section className="relative isolate overflow-hidden">
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
    <section id="faq" className="mx-auto max-w-4xl px-6 py-24">
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
    <section className="relative isolate overflow-hidden">
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
    <footer className="border-t border-white/10 py-10 text-center text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6">
        <img src={logo} alt="" width={36} height={36} loading="lazy" />
        <div>© {new Date().getFullYear()} Raines Network — Tüm hakları saklıdır.</div>
        <div className="flex gap-4 text-xs">
          <a href="#" className="hover:text-foreground">Gizlilik</a>
          <a href="#" className="hover:text-foreground">Şartlar</a>
          <a href="#contact" className="hover:text-foreground">İletişim</a>
        </div>
      </div>
    </footer>
  );
}
