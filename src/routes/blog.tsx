import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { connectToDatabase } from '../lib/db';
import { Calendar, User, ArrowRight, BookOpen, Tag } from 'lucide-react';

// MongoDB'den tüm haberleri çeken server fonksiyonu
const fetchAllNews = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const db = await connectToDatabase();
    const news = await db.collection('news')
      .find({})
      .sort({ createdAt: -1 }) // En yeni haber üstte
      .toArray();

    return news.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.error("Haberler yüklenirken hata oluştu:", error);
    return [];
  }
});

export const Route = createFileRoute('/blog')({
  loader: async () => {
    const news = await fetchAllNews();
    return { news };
  },
  component: BlogComponent,
});

function BlogComponent() {
  const { news } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white py-12 px-4 sm:px-6 lg:px-8">
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
            Sunucumuzla ilgili en son gelişmeleri ve yama notlarını buradan takip edebilirsiniz.
          </p>
        </div>

        {/* Haber Kartları Grid */}
        {news.length === 0 ? (
          <div className="text-center py-12 bg-[#151a23] rounded-xl border border-gray-800">
            <p className="text-gray-500 text-lg">Henüz yayınlanmış bir haber bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item: any) => (
              <article 
                key={item._id} 
                className="group flex flex-col bg-[#151a23] rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col flex-grow">
                  {/* Tag / Kategori */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-orange-500/10 text-orange-500 font-bold text-xs px-2.5 py-1 rounded border border-orange-500/20 uppercase">
                      {item.tag || "DUYURU"}
                    </span>
                    <span className="text-xs text-gray-550 flex items-center gap-1 text-gray-500">
                      <Calendar size={12} />
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString('tr-TR') : "27.06.2026"}
                    </span>
                  </div>

                  {/* Başlık */}
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {item.title}
                  </h2>

                  {/* Özet (excerpt) */}
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                    {item.excerpt || "Detaylar için tıklayın..."}
                  </p>

                  {/* Alt Bilgiler ve Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-auto">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <User size={12} className="text-orange-500" />
                      <span>{item.author || "Shiva"}</span>
                    </div>
                    
                    {/* Link yapısı tam istediğin gibi blog/haberler/$slug yönlendirmesi yapar */}
                    <Link 
                      to="/blog/haberler/$slug"
                      params={{ slug: item.slug }}
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
        )}

      </div>
    </div>
  );
}
