import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingBag, Package, Crown, Gem, Sparkles, Zap, Shield,
  ChevronRight, Check, Star, CreditCard
} from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Mağaza — Raines Network" },
      { name: "description", content: "Sizin için özenle hazırladığımız ürünlere göz atın ve bize destek olun!" },
    ],
  }),
  component: StorePage,
});

const SERVER_IP = "oyna.rainesmc.net.tr";

const categories = [
  { id: "smp", name: "SMP", icon: <Package className="size-5" />, description: "Survival Multiplayer ürünleri" },
  { id: "vip", name: "VIP", icon: <Crown className="size-5" />, description: "VIP paketleri ve ayrıcalıklar" },
  { id: "kristal", name: "Kristal", icon: <Gem className="size-5" />, description: "Sanal para birimi" },
  { id: "ozel", name: "Özel", icon: <Sparkles className="size-5" />, description: "Sınırlı süre ürünler" },
];

const products = [
  {
    id: 1,
    category: "kristal",
    name: "500 KRISTAL",
    price: 29.99,
    originalPrice: null,
    image: "💎",
    features: ["Anında teslim", "Tüm sunucularda geçerli", "Kalıcı"],
    popular: false,
  },
  {
    id: 2,
    category: "kristal",
    name: "2.500 KRISTAL",
    price: 99.99,
    originalPrice: 124.99,
    image: "💎",
    features: ["%20 indirim", "Anında teslim", "Bonus 250 kristal"],
    popular: true,
  },
  {
    id: 3,
    category: "kristal",
    name: "5.000 KRISTAL",
    price: 179.99,
    originalPrice: 249.99,
    image: "💎",
    features: ["%28 indirim", "Anında teslim", "Bonus 750 kristal"],
    popular: false,
  },
  {
    id: 4,
    category: "kristal",
    name: "10.000 KRISTAL",
    price: 299.99,
    originalPrice: 449.99,
    image: "💎",
    features: ["%33 indirim", "Anında teslim", "VIP özellikleri 3 gün"],
    popular: false,
  },
  {
    id: 5,
    category: "vip",
    name: "VIP",
    price: 49.99,
    originalPrice: null,
    image: "👑",
    features: ["Özel chat renk", "Fly hakkı", "5 ev hakkı", "/heal komutu"],
    popular: true,
  },
  {
    id: 6,
    category: "vip",
    name: "VIP+",
    price: 89.99,
    originalPrice: null,
    image: "👑",
    features: ["VIP özellikleri", "10 ev hakkı", "/fly her yerde", "Özel kit ve eşyalar"],
    popular: false,
  },
  {
    id: 7,
    category: "vip",
    name: "MVP",
    price: 149.99,
    originalPrice: null,
    image: "🌟",
    features: ["VIP+ özellikleri", "Sınırsız ev", "Özel prefix", "Öncelikli giriş"],
    popular: false,
  },
  {
    id: 8,
    category: "smp",
    name: "Başlangıç Paketi",
    price: 19.99,
    originalPrice: null,
    image: "📦",
    features: ["Demir set", "100 yemek", "Başlangıç parası", "Özel kit"],
    popular: false,
  },
  {
    id: 9,
    category: "ozel",
    name: "Efsanevi Anahtar",
    price: 14.99,
    originalPrice: 24.99,
    image: "🔑",
    features: ["Sınırlı stok", "Efsanevi eşyalar", "Şans sandığı", "Bonus içerik"],
    popular: true,
  },
];

function StorePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <div className="min-h-screen">
      <StoreHeader />
      <CategorySection
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ProductsSection products={filteredProducts} activeCategory={activeCategory} />
      <Footer />
    </div>
  );
}

function StoreHeader() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.7_0.2_50/0.2),transparent_60%)]" />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Raines Network" width={40} height={40} />
          <span className="font-display text-xl font-bold">
            <span className="text-gradient-amber">Raines</span> Network
          </span>
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur md:flex">
          {[{ l: "Ana Sayfa", h: "/" }, { l: "Durum", h: "/#status" }, { l: "Mağaza", h: "/store", active: true }, { l: "Yardım", h: "/help" }].map((x, i) => (
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
            <ShoppingBag className="size-4" /> {SERVER_IP}
          </a>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-amber shadow-[var(--shadow-glow)]">
          <ShoppingBag className="size-8 text-primary-foreground" />
        </div>
        <h1 className="font-display text-5xl font-extrabold md:text-6xl">
          Mağazamızı <span className="text-gradient-amber">Keşfedin</span>
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
          Sizin için özenle hazırladığımız ürünlere göz atın ve bize destek olun!
        </p>
      </div>
    </section>
  );
}

function CategorySection({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string | null;
  setActiveCategory: (c: string | null) => void;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          onClick={() => setActiveCategory(null)}
          className={`flex items-center gap-3 rounded-xl border p-4 transition ${activeCategory === null
            ? "border-primary bg-primary/10 text-foreground"
            : "border-white/10 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
        >
          <Zap className="size-5 text-primary" />
          <div className="text-left">
            <div className="font-semibold">Tümü</div>
            <div className="text-xs opacity-70">{products.length} ürün</div>
          </div>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-3 rounded-xl border p-4 transition ${activeCategory === cat.id
              ? "border-primary bg-primary/10 text-foreground"
              : "border-white/10 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
          >
            <span className="text-primary">{cat.icon}</span>
            <div className="text-left">
              <div className="font-semibold">{cat.name}</div>
              <div className="text-xs opacity-70">{products.filter((p) => p.category === cat.id).length} ürün</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductsSection({
  products,
  activeCategory,
}: {
  products: typeof products;
  activeCategory: string | null;
}) {
  const getCategoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? id;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {activeCategory ? `${getCategoryName(activeCategory)} Ürünleri` : "Tüm Ürünler"}
        </h2>
        <span className="text-sm text-muted-foreground">{products.length} ürün gösteriliyor</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card backdrop-blur transition hover:border-primary/40">
      {product.popular && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gradient-amber px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
          <Star className="size-3" /> Popüler
        </div>
      )}
      <div className="flex h-32 items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
        <span className="text-5xl">{product.image}</span>
      </div>
      <div className="p-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          {categories.find((c) => c.id === product.category)?.name}
        </div>
        <h3 className="text-xl font-bold">{product.name}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">{product.price.toFixed(2)} ₺</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice.toFixed(2)} ₺
            </span>
          )}
        </div>
        <ul className="mt-4 space-y-2">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="size-4 text-emerald-400" /> {f}
            </li>
          ))}
        </ul>
        <button className="mt-6 w-full items-center justify-center gap-2 rounded-xl bg-gradient-amber px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02] hidden sm:flex">
          <CreditCard className="size-4" /> Satın Al
        </button>
        <button className="mt-6 w-full items-center justify-center gap-2 rounded-xl bg-gradient-amber px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-glow)] transition flex sm:hidden">
          <CreditCard className="size-4" /> Satın Al
        </button>
      </div>
    </div>
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
