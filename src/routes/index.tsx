import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Copy, LogIn, UserPlus, Users, Activity, Megaphone,
  ChevronDown, MessageCircle, Server, ShoppingBag,
  LifeBuoy, HelpCircle, Gift, Trophy, Crown, Sparkles,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Home,
});

const news = [
  { tag: "Bildiri", date: "28 Mayıs, 13:22", title: "Yeni VIPLER", body: "Yeni Eklenen VIPler sayesinde artık çok daha fazla ayrıcalığa sahip olabilirsiniz." },
  { tag: "Bildiri", date: "28 Mayıs, 13:20", title: "Spawn Düzenlemesi", body: "SMP Sunucusu başlangıç bölgesi artık çok daha zengin bir halde sizlere açılmış durumda, keyifli oyunlar." },
  { tag: "Bildiri", date: "28 Mayıs, 13:15", title: "Discord Çekilişleri", body: "Discord Sunucumuzda VIP, Anahtar ve çok daha fazlasını sizlere hediye ediyoruz katılmayı unutmayın." },
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
  { q: "Sunucuya nasıl katılabilirim?", a: "Sunucumuza Minecraft üzerinden IP adresimizi girerek kolayca katılabilirsiniz." },
  { q: "Mağaza ürünleri ne zaman teslim edilir?", a: "Satın aldığınız ürünler genellikle 1-5 dakika içerisinde otomatik olarak teslim edilir." },
  { q: "Yetkili alımları var mı?", a: "Yetkili alımları olduğunda Discord sunucumuz üzerinden duyuru yapılmaktadır." },
  { q: "Destek sistemine nasıl ulaşırım?", a: "Sitemizdeki destek bölümünden veya Discord sunucumuzdan bilet açarak bize ulaşabilirsiniz." },
];

function Avatar({ name, size = 38 }: { name: string; size?: number }) {
  return (
    <img
      src={`https://minotar.net/avatar/${name}/${size}`}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      className="rounded-md shadow-md ring-1 ring-white/10"
    />
  );
}

function Home() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  const ip = "play.raines.net.tr";

  const copyIp = () => {
    navigator.clipboard.writeText(ip).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-500/30 via-background/60 to-background" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.8_0.2_60/0.35),transparent_60%)]" />

        {/* NAV */}
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur md:flex">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
              <Server className="size-4 text-primary" />
              <div className="text-xs leading-tight">
                <div className="font-semibold">raines.net.tr</div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-400" /> 23 Çevrimiçi
                </div>
              </div>
            </div>
            <a href="#" className="flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-2 text-xs font-semibold text-indigo-200 hover:bg-indigo-500/30">
              <MessageCircle className="size-4" /> Discord
            </a>
          </div>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur md:flex">
            {["Ana Sayfa", "Mağaza", "Yardım", "Destek", "Çarkıfelek"].map((l, i) => (
              <a key={l} href="#" className={`rounded-full px-4 py-2 text-sm transition ${i === 0 ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{l}</a>
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
          <img src={logo} alt="Raines" width={96} height={96} className="mb-6 drop-shadow-[0_8px_24px_oklch(0.7_0.2_60/0.6)]" />
          <h1 className="font-display text-6xl font-extrabold tracking-tight md:text-8xl">
            <span className="text-gradient-amber">Raines Network</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Farklı bir minecraft deneyimi sunmak için buradayız.
          </p>

          <div className="mt-10 flex items-center gap-10 rounded-2xl border border-white/10 bg-black/30 px-8 py-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <Users className="size-5 text-primary" />
              <div className="text-left">
                <div className="text-2xl font-bold text-primary">23</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Çevrimiçi Oyuncu</div>
              </div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <Activity className="size-5 text-primary" />
              <div className="text-left">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button className="rounded-xl bg-gradient-amber px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]">
              Hemen Kayıt Ol
            </button>
            <button onClick={copyIp} className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wider backdrop-blur transition hover:bg-white/5">
              <Copy className="size-4" /> {copied ? "Kopyalandı!" : "IP Kopyala"}
            </button>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
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
        <div className="mt-10 flex justify-center">
          <a href="#" className="rounded-xl border border-white/10 bg-black/40 px-6 py-3 text-sm font-semibold hover:bg-white/5">Daha Fazla Göster</a>
        </div>
      </section>

      {/* LEADERBOARD */}
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

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold md:text-5xl">Sıkça Sorulan <span className="text-gradient-amber">Sorular</span></h2>
          <p className="mt-3 text-muted-foreground">
            Sunucumuz hakkında en çok sorulan soruları senin için bir araya getirdik.
            Başka sorun varsa Discord üzerinden bize ulaşabilirsin.
          </p>
          <a href="#" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-amber px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
            <LifeBuoy className="size-4" /> Destek Al
          </a>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-card backdrop-blur">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="flex items-center gap-3 font-semibold">
                  <HelpCircle className="size-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  {f.q}
                </span>
                <ChevronDown className={`size-5 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="border-t border-white/5 px-5 py-4 text-sm text-muted-foreground">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.2_50/0.35),transparent_60%)]" />
        <div className="mx-auto max-w-4xl px-6 py-28 text-center">
          <Sparkles className="mx-auto mb-4 size-8 text-primary" />
          <h2 className="text-4xl font-extrabold md:text-6xl">
            Maceraya katılmaya <span className="text-gradient-amber">hazır mısın?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Hemen kaydol ve krallığın için ilk adımı at.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button className="rounded-xl bg-gradient-amber px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-glow)]">
              Hemen Kayıt Ol
            </button>
            <button onClick={copyIp} className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-white/5">
              <Copy className="size-4" /> {copied ? "Kopyalandı!" : "IP Kopyala"}
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6">
          <img src={logo} alt="" width={36} height={36} loading="lazy" />
          <div>© {new Date().getFullYear()} Raines Network — Tüm hakları saklıdır.</div>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-foreground">Gizlilik</a>
            <a href="#" className="hover:text-foreground">Şartlar</a>
            <a href="#" className="hover:text-foreground">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
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
            <span className={`flex size-7 items-center justify-center rounded-md text-xs font-bold ${i === 0 ? "bg-gradient-amber text-primary-foreground" : "bg-white/10 text-muted-foreground"}`}>
              #{i + 1}
            </span>
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
