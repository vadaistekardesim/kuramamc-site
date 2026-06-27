import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Eye, MessageSquare, Calendar, User, Server, MessageCircle, LogIn, UserPlus, Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import { getNewsBySlug } from "@/lib/site.functions";

export const Route = createFileRoute("/blog/haberler/$slug")({
  component: BlogDetails,
});

function BlogDetails() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const fetchNewsDetail = useServerFn(getNewsBySlug);

  useEffect(() => {
    setLoading(true);
    fetchNewsDetail({ data: { slug } })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug, fetchNewsDetail]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white gap-3">
        <Loader2 className="animate-spin text-primary size-8" />
        <span>Haber yükleniyor...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
        <h2 className="text-2xl font-bold">Haber Bulunamadı!</h2>
        <Link to="/" className="text-primary hover:underline">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative isolate overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 -z-10 h-[500px] w-full object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background to-background" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur md:flex">
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
            <Server className="size-4 text-primary" />
            <span className="text-xs font-semibold">oyna.kuramamc.com.tr</span>
          </div>
          <a href="#" className="flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-2 text-xs font-semibold text-indigo-200">
            <MessageCircle className="size-4" /> Discord
          </a>
        </div>
        <img src={logo} alt="KuramaMC" className="w-10 h-10 md:absolute md:left-1/2 md:-translate-x-1/2" />
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-medium"><LogIn className="size-4" /> Giriş Yap</button>
          <button className="flex items-center gap-2 rounded-full bg-gradient-amber px-4 py-2 text-sm font-semibold text-primary-foreground"><UserPlus className="size-4" /> Kayıt Ol</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Ana Sayfa</Link>
          <span>&gt;</span>
          <span className="hover:text-foreground">Haber</span>
          <span>&gt;</span>
          <span className="hover:text-foreground">{post.tag}</span>
          <span>&gt;</span>
          <span className="text-primary truncate max-w-[120px]">{post.title}</span>
        </div>

        <article className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur p-6 md:p-8 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <img src={`https://minotar.net/avatar/${post.author}/40`} alt={post.author} className="rounded-md ring-1 ring-white/10" />
              <div>
                <div className="text-sm font-semibold flex items-center gap-1"><User className="size-3.5 text-primary" /> {post.author}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Calendar className="size-3.5" /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString("tr-TR") : "Bilinmiyor"}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground">
                <Eye className="size-3.5" /> {post.views}
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground">
                <MessageSquare className="size-3.5" /> {post.commentsCount || 0}
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-base">
            <p className="whitespace-pre-line">{post.body}</p>
          </div>
        </article>
      </main>
    </div>
  );
}
