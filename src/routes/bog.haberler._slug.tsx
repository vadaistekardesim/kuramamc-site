import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { connectToDatabase } from '../lib/db';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { Link } from '@tanstack/react-router';

// Slug değerine göre MongoDB'den tekil veri çeken fonksiyon
const fetchNewsBySlug = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      const db = await connectToDatabase();
      const article = await db.collection('news').findOne({ slug });
      
      if (!article) return null;

      return {
        ...article,
        _id: article._id.toString(),
      };
    } catch (error) {
      console.error("Haber detayı çekilirken hata oluştu:", error);
      return null;
    }
  });

export const Route = createFileRoute('/blog/haberler/$slug')({
  loader: async ({ params }) => {
    const article = await fetchNewsBySlug({ data: params.slug });
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
        
        {/* Geri Dön Butonu */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          Haberlere Geri Dön
        </Link>

        {/* Makale Kartı */}
        <article className="bg-[#151a23] rounded-2xl p-6 md:p-10 border border-gray-800 shadow-2xl">
          
          {/* Meta Bilgileri */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6">
            <span className="bg-orange-500/10 text-orange-500 font-bold px-2.5 py-1 rounded border border-orange-500/20 uppercase">
              {article.tag || "DUYURU"}
            </span>
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-orange-500" />
              <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString('tr-TR') : "27.06.2026"}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={14} className="text-orange-500" />
              <span>{article.author || "Shiva"}</span>
            </div>
          </div>

          {/* Başlık */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Özet (Varsa) */}
          {article.excerpt && (
            <p className="text-gray-400 italic text-lg border-l-4 border-orange-500 pl-4 mb-8">
              {article.excerpt}
            </p>
          )}

          {/* İçerik Gövdesi (body) */}
          <div className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line space-y-4">
            {article.body}
          </div>

        </article>
      </div>
    </div>
  );
}
