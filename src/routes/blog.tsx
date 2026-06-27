// src/routes/blog/index.tsx (veya src/routes/blog.tsx)
import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { connectToDatabase } from '../../lib/db';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

// Server tarafında MongoDB'den haberleri çeken fonksiyon
const fetchAllNews = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const db = await connectToDatabase();
    const news = await db.collection('news')
      .find({})
      .sort({ createdAt: -1 }) // En yeni haberler üstte
      .toArray();

    // MongoDB Object_id'lerini frontend'de hata vermemesi için string'e çeviriyoruz
    return news.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Haberler çekilirken hata oluştu:", error);
    return [];
  }
});

// TanStack Router rota tanımı ve loader entegrasyonu
export const Route = createFileRoute('/blog/')({
  loader: async () => {
    const news = await fetchAllNews();
    return { news };
  },
  component: BlogComponent,
});

function BlogComponent() {
  const { news } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#text-white] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Başlık Alanı */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm font-medium mb-4 border border-orange-500/20">
            <BookOpen size={16} />
            <span>KuramaMC Günlükleri</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Haberler & Güncellemeler
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Sunucumuzla ilgili en son gelişmeleri, yama notlarını ve etkinlikleri buradan takip edebilirsiniz.
          </p>
        </div>

        {/* Haber Listesi */}
        {news.length === 0 ? (
          <div className="text-center py-12 bg-[#1f2833]/20 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-lg">Henüz yayınlanmış bir haber bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item: any) => (
              <article 
                key={item._id} 
                className="group flex flex-col bg-[#151a23] rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                {/* Haber Görseli */}
                <div className="relative aspect-video w-full bg-[#1f2833] overflow-hidden">
                  <img 
                    src={item.image || "/assets/blog-placeholder.jpg"} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-black font-bold text-xs px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {item.category || "Güncelleme"}
                  </div>
                </div>

                {/* Haber İçeriği */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta Bilgiler */}
                  <div className="flex items-center gap-4 text-xs text-gray-450 mb-3 text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-orange-500" />
                      <span>{item.date || "27.06.2026"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} className="text-orange-500" />
                      <span>{item.author || "Yönetim"}</span>
                    </div>
                  </div>

                  {/* Başlık ve Özet */}
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                    {item.summary || item.content?.substring(0, 120) + "..."}
                  </p>

                  {/* Detay Butonu */}
                  <Link 
                    to="/blog/$slug"
                    params={{ slug: item.slug }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 group-hover:text-orange-400 mt-auto"
                  >
                    Devamını Oku 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
