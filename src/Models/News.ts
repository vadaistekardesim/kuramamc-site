import mongoose, { Schema, Document, model, models } from "mongoose";

export interface INews extends Document {
  slug: string;
  tag: string;
  title: string;
  author: string;
  excerpt: string;
  body: string;
  views: number;
  commentsCount: number;
  createdAt: Date;
}

const NewsSchema = new Schema<INews>({
  slug: { type: String, required: true, unique: true },
  tag: { type: String, required: true, default: "Duyuru" },
  title: { type: String, required: true },
  author: { type: String, required: true, default: "Admin" },
  excerpt: { type: String, required: true },
  body: { type: String, required: true },
  views: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const News = models.News || model<INews>("News", NewsSchema);
