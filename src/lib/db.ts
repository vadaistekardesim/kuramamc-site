import { createServerFn } from '@tanstack/start';
import { MongoClient } from 'mongodb';

// MongoDB bağlantı dizesini env üzerinden almalısın
const client = new MongoClient(process.env.MONGODB_URI!);

export const getNews = createServerFn({ method: 'GET' }).handler(async () => {
  await client.connect();
  const db = client.db('kuramamc'); // Veritabanı adın
  return await db.collection('news').find().toArray();
});

export const getNewsBySlug = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    await client.connect();
    const db = client.db('kuramamc');
    return await db.collection('news').findOne({ slug });
  });
