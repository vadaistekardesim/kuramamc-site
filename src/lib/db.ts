// src/lib/db.ts
import { createServerFn } from '@tanstack/start';
import { MongoClient } from 'mongodb';

// MongoDB bağlantı dizesi
const client = new MongoClient(process.env.MONGODB_URI!);

// Hata veren fonksiyonu dışa aktar
export const connectToDatabase = async () => {
  // Cloudflare üzerinde bağlantıyı yönetmek için basit bir kontrol
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db('kuramamc');
};

export const getNews = createServerFn({ method: 'GET' }).handler(async () => {
  const db = await connectToDatabase();
  return await db.collection('news').find().toArray();
});

export const getNewsBySlug = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const db = await connectToDatabase();
    return await db.collection('news').findOne({ slug });
  });
