import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { createHash } from "crypto";
import { connectToDatabase } from "./db";
import { News } from "@/Models/News";

// ==========================================
// 1. MEVCUT SEKTÖRLER (İletişim, Bülten, Durum)
// ==========================================

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(5).max(2000),
  website: z.string().max(0).optional().default(""),
  elapsedMs: z.number().int().min(1500),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const ipHash = createHash("sha256").update(ip).digest("hex");

    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);
    if ((count ?? 0) >= 3) {
      throw new Error("Çok fazla deneme. Lütfen daha sonra tekrar deneyin.");
    }

    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      ip_hash: ipHash,
    });
    if (error) throw new Error("Mesaj gönderilemedi.");

    return { ok: true as const };
  });

const newsletterSchema = z.object({
  email: z.string().trim().email().max(255),
  website: z.string().max(0).optional().default(""),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => newsletterSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = data.email.toLowerCase();

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email });

    if (error) {
      if (error.code === "23505") return { ok: true as const, already: true };
      throw new Error("Abonelik başarısız.");
    }
    return { ok: true as const, already: false };
  });

const statusSchema = z.object({ host: z.string().min(1).max(100) });

export const getServerStatus = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => statusSchema.parse(d))
  .handler(async ({ data }) => {
    const started = Date.now();
    try {
      const res = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(data.host)}`, {
        headers: { "User-Agent": "KuramaMC-Status/1.0" },
      });
      const ping = Date.now() - started;
      if (!res.ok) throw new Error("status_fetch_failed");
      const j = (await res.json()) as {
        online?: boolean;
        players?: { online?: number; max?: number };
        version?: string;
        motd?: { clean?: string[] };
        icon?: string;
      };
      return {
        online: !!j.online,
        players: j.players?.online ?? 0,
        max: j.players?.max ?? 0,
        version: j.version ?? "—",
        motd: j.motd?.clean?.join(" ") ?? "",
        icon: j.icon ?? null,
        ping,
      };
    } catch {
      return { online: false, players: 0, max: 0, version: "—", motd: "", icon: null, ping: 0 };
    }
  });

// ==========================================
// 2. MONGODB ENTEGRASYONU (Haber Sistemleri)
// ==========================================

const slugSchema = z.object({ slug: z.string().min(1).max(150) });

// Tüm haberleri ana sayfa için çeken fonksiyon (GET)
export const getNewsList = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      await connectToDatabase();
      const news = await News.find({}).sort({ createdAt: -1 }).lean();
      
      return news.map((item: any) => ({
        ...item,
        _id: item._id.toString(),
        createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null
      }));
    } catch (error) {
      console.error("Haberler çekilirken hata oluştu:", error);
      return [];
    }
  });

// Sadece adresteki slug'a göre tek bir haberi çeken fonksiyon (GET) - Optimizasyonlu
export const getNewsBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => slugSchema.parse(d))
  .handler(async ({ data }) => {
    try {
      await connectToDatabase();
      
      // Tek sorguda hem veriyi çekiyor, hem görüntülenmeyi artırıyor, hem de güncel veriyi döndürüyor
      const item = await News.findOneAndUpdate(
        { slug: data.slug },
        { $inc: { views: 1 } },
        { new: true }
      ).lean();
      
      if (!item) return null;

      return {
        ...item,
        _id: (item as any)._id.toString(),
        createdAt: (item as any).createdAt ? new Date((item as any).createdAt).toISOString() : null
      };
    } catch (error) {
      console.error("Haber detayı çekilirken hata oluştu:", error);
      return null;
    }
  });
