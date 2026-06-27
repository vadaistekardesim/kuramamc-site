import { MongoClient } from 'mongodb';

// Cloudflare Workers/Pages ortamında çevre değişkenlerini garantiye almak için kontrol
const uri = typeof process !== 'undefined' && process.env ? process.env.MONGODB_URI : null;

// Eğer üstteki boşsa global context'i (Cloudflare binding) kontrol et
const MONGODB_URI = uri || (globalThis as any).MONGODB_URI || (globalThis as any).process?.env?.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Kritik Hata: MONGODB_URI tanımlı değil!");
}

// Serverless ortamda (Cloudflare) bağlantıyı önbelleğe alarak havuz (pool) oluşturuyoruz
let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI çevre kütüphanesinde veya global değişkenlerde bulunamadı.");
  }

  if (cachedClient && cachedClient.topology && cachedClient.topology.isConnected()) {
    return cachedClient.db();
  }

  // Yeni bağlantı oluştur ve optimize et
  const client = new MongoClient(MONGODB_URI, {
    maxPoolSize: 10, // Bağlantı şişmesini önler
    minPoolSize: 1,
  });

  await client.connect();
  cachedClient = client;
  return client.db();
}
