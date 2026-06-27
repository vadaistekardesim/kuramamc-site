import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LifeBuoy, Circle as HelpCircle, MessageCircle, Mail, CreditCard, Shield, Settings, Users, ChevronDown, Search, BookOpen, Clock, CircleCheck as CheckCircle2, ExternalLink } from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Yardım Merkezi — Raines Network" },
      { name: "description", content: "Aradığınız cevabı bulamıyor musunuz? Aşağıdan konulara göz atın veya doğrudan arama yapın." },
    ],
  }),
  component: HelpPage,
});

const SERVER_IP = "oyna.rainesmc.net.tr";

const topics = [
  {
    id: "satinalim",
    title: "Satın Alım İşlemleri",
    description: "Ödeme, teslimat ve iade koşulları hakkında bilgiler.",
    icon: <CreditCard className="size-6" />,
    articles: [
      { title: "Ürünlerim neden teslim edilmedi?", views: 1250 },
      { title: "Hangi ödeme yöntemlerini kabul ediyorsunuz?", views: 892 },
      { title: "İade talebinde nasıl bulunurum?", views: 456 },
      { title: "Satın aldığım ürünü başkasına hediye edebilir miyim?", views: 234 },
    ],
  },
  {
    id: "oyun",
    title: "Oyun & Bağlantı",
    description: "Sunucuya bağlanma, oyun mekanikleri ve kurallar.",
    icon: <Settings className="size-6" />,
    articles: [
      { title: "Sunucuya nasıl bağlanırım?", views: 2341 },
      { title: "Hangi Minecraft sürümlerini destekliyorsunuz?", views: 1567 },
      { title: "Sunucu kuralları nelerdir?", views: 987 },
      { title: "Lag sorunu yaşıyorum, ne yapmalıyım?", views: 654 },
    ],
  },
  {
    id: "yetkili",
    title: "Yetkili Başvuruları",
    description: "Yetkili olma süreci ve başvuru koşulları.",
    icon: <Users className="size-6" />,
    articles: [
      { title: "Yetkili başvurusu nasıl yapılır?", views: 1890 },
      { title: "Yetkili başvurusu için şartlar nelerdir?", views: 1234 },
      { title: "Başvurum neden reddedildi?", views: 567 },
    ],
  },
  {
    id: "guvenlik",
    title: "Hesap Güvenliği",
    description: "Hesabınızı koruma ve güvenlik ipuçları.",
    icon: <Shield className="size-6" />,
    articles: [
      { title: "Hesabım çalındı, ne yapmalıyım?", views: 432 },
      { title: "2FA nasıl etkinleştirilir?", views: 765 },
      { title: "Şifremi nasıl değiştiririm?", views: 543 },
    ],
  },
];

const faqs = [
  {
    q: "Sunucuya nasıl katılabilirim?",
    a: "Minecraft'ı açın → Çok Oyunculu → Sunucu Ekle → IP: oyna.rainesmc.net.tr portu yazın ve bağlanın.",
  },
  {
    q: "Mağaza ürünleri ne zaman teslim edilir?",
    a: "Satın aldığınız ürünler genellikle 1-5 dakika içerisinde otomatik olarak teslim edilir. Geç teslimat durumunda Discord üzerinden destek alabilirsiniz.",
  },
  {
    q: "Yetkili alımları var mı?",
    a: "Yetkili alımları dönem dönem Discord sunucumuz üzerinden duyurulmaktadır. Duyuruları takip edin.",
  },
  {
    q: "Destek sistemine nasıl ulaşırım?",
    a: "Discord sunucumuzda #destek kanalından veya bu sitedeki iletişim formundan bize ulaşabilirsiniz.",
  },
  {
    q: "Para birimi nedir ve nasıl kazanılır?",
    a: "Kristal sunucumuzun para birimidir. Oyun içi ekonomi ile veya mağazadan satın alarak elde edebilirsiniz.",
  },
];

function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <HelpHeader />
      <SearchSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TopicsSection
        topics={filteredTopics}
        openTopic={openTopic}
        setOpenTopic={setOpenTopic}
      />
      <FAQSection faqs={faqs} open={openFaq} setOpen={setOpenFaq} />
      <ContactBanner />
      <Footer />
    </div>
  );
}

function HelpHeader() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.7_0.2_50/0.2),transparent_60%)]" />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Raines Network" width={40} height={40} />
          <span className="font-display text-xl font-bold">
            <span className="text-gradient-amber">Raines</span>Network
          </span>
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur md:flex">
          {[{ l: "Ana Sayfa", h: "/" }, { l: "Durum", h: "/#status" }, { l: "Mağaza", h: "/store" }, { l: "Yardım", h: "/help", active: true }].map((x) => (
            <a
              key={x.l}
              href={x.h}
              className={`rounded-full px-4 py-2 text-sm transition ${x.active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {x.l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/" className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/5 sm:flex">
            <LifeBuoy className="size-4" /> {SERVER_IP}
          </a>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-amber shadow-[var(--shadow-glow)]">
          <LifeBuoy className="size-8 text-primary-foreground" />
        </div>
        <h1 className="font-display text-5xl font-extrabold md:text-6xl">
          Yardım <span className="text-gradient-amber">Merkezi</span>
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
          Aradığınız cevabı bulamıyor musunuz? Aşağıdan konulara göz atın veya doğrudan arama yapın.
        </p>
      </div>
    </section>
  );
}

function SearchSection({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  return (
    <section className="mx-auto -mt-6 max-w-2xl px-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Konu veya makale ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-card py-4 pl-12 pr-4 text-sm outline-none ring-primary/40 transition focus:border-primary/40 focus:ring-2"
        />
      </div>
    </section>
  );
}

function TopicsSection({
  topics,
  openTopic,
  setOpenTopic,
}: {
  topics: typeof topics;
  openTopic: string | null;
  setOpenTopic: (id: string | null) => void;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-8 text-2xl font-bold">Konular</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <div key={topic.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-card backdrop-blur transition hover:border-primary/40">
            <button
              onClick={() => setOpenTopic(openTopic === topic.id ? null : topic.id)}
              className="flex w-full items-center gap-4 p-6 text-left"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {topic.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{topic.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{topic.description}</p>
              </div>
              <ChevronDown
                className={`size-5 text-muted-foreground transition ${openTopic === topic.id ? "rotate-180" : ""}`}
              />
            </button>
            {openTopic === topic.id && (
              <div className="border-t border-white/5 px-6 py-4">
                <ul className="space-y-3">
                  {topic.articles.map((article, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 transition hover:bg-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="size-4 text-primary" />
                          <span className="text-sm font-medium">{article.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="size-3" /> {article.views} görüntülenme
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection({
  faqs,
  open,
  setOpen,
}: {
  faqs: { q: string; a: string }[];
  open: number | null;
  setOpen: (n: number | null) => void;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Sıkça Sorulan <span className="text-gradient-amber">Sorular</span></h2>
        <p className="mt-2 text-muted-foreground">En çok sorulan soruları senin için bir araya getirdik.</p>
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
  );
}

function ContactBanner() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.2_50/0.2),transparent_60%)]" />
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-card">
          <MessageCircle className="size-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Hala yardıma mı ihtiyacınız var?</h2>
        <p className="mt-3 text-muted-foreground">
          Ekibimiz sorularınızı yanıtlamak için hazır. Discord sunucumuzdan veya e-posta yoluyla bize ulaşabilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-amber px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
          >
            <MessageCircle className="size-4" /> Discord'a Katıl
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-card px-6 py-3.5 text-sm font-bold uppercase tracking-wider backdrop-blur transition hover:bg-white/5"
          >
            <Mail className="size-4" /> İletişim Formu
          </a>
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
          <a href="/#contact" className="hover:text-foreground">İletişim</a>
        </div>
      </div>
    </footer>
  );
}
