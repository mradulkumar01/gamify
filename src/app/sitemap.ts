import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { APP_CONFIG } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APP_CONFIG.url;

  const [games, characters, news, blogs] = await Promise.all([
    prisma.game.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.gameCharacter.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.newsArticle.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.blogArticle.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/games`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/platforms`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/characters`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/upcoming`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/guidelines`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const gameRoutes: MetadataRoute.Sitemap = games.map((g) => ({
    url: `${baseUrl}/games/${g.slug}`,
    lastModified: g.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const characterRoutes: MetadataRoute.Sitemap = characters.map((c) => ({
    url: `${baseUrl}/characters/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: n.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...gameRoutes, ...characterRoutes, ...newsRoutes, ...blogRoutes];
}
