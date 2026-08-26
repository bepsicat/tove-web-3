import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio/"],
    },
    sitemap: "https://www.tove.dk/sitemap.xml",
    host: "https://www.tove.dk",
  };
}
