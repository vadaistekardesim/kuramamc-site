// src/lib/db.ts
// IMPORT yolunu şu şekilde değiştir:
import { createServerFn } from '@tanstack/start/server'; 
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

export const connectToDatabase = async () => {
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
