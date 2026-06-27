// src/routes/blog.haberler._slug.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { Calendar, User, ArrowLeft } from 'lucide-react';

// Yukarıdaki verilerin aynısı (Detay eşleşmesi için)
const MANUAL_NEWS = [
  {
    _id: "1",
    slug: "towny-yakinda-aciliyor",
    tag: "DUYURU",
    title: "KuramaMC Towny Sunucusu Yakında Açılıyor!",
    author: "MrShivada",
    excerpt: "Gelişmiş teması ve eşsiz mekanikleriyle yeni Towny sunucumuz çok yakın...",
    body: `Değerli KuramaMC topluluğu,

Büyük bir heyecanla beklenen Towny sunucumuz çok yakında sizlerle buluşuyor! 

Gelişmiş sistemler, optimize edilmiş ağ mimarisi ve tamamen özel olarak geliştirilen mekaniklerle sıradan bir oyun deneyiminin çok ötesine geçiyoruz. KuramaMC kalitesini Towny haritasında iliklerinize kadar hissedeceksiniz.

Açılış tarihi, özel etkinlikler ve spawner/kit detayları çok yakında Discord sunucumuz üzerinden duyurulacaktır. Takipte kalın!`,
    createdAt: "2026-06-27T13:25:00.000Z"
  }
];

export const Route = createFileRoute('/blog/haberler/$slug')({
  loader: async ({ params }) => {
    const article = MANUAL_NEWS.find(item => item.slug === params.slug);
    if (!article) {
      throw new Error('Haber bulunamadı');
    }
    return { article };
  },
  component: ArticleComponent,
});

function ArticleComponent() {
  const { article } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          Haberlere Geri Dön
        </Link>

        <article className="bg-[#151a23] rounded-2xl p-6 md:p-10 border border-gray-800 shadow-2xl">
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6">
            <span className="bg-orange-500/10 text-orange-500 font-bold px-2.5 py-1 rounded border border-orange-500/20 uppercase">
              {article.tag}
            </span>
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-orange-500" />
              <span>{new Date(article.createdAt).toLocaleDateString('tr-TR')}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={14} className="text-orange-500" />
              <span>{article.author}</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-gray-400 italic text-lg border-l-4 border-orange-500 pl-4 mb-8">
            {article.excerpt}
          </p>

          <div className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line space-y-4">
            {article.body}
          </div>

        </article>
      </div>
    </div>
  );
}
