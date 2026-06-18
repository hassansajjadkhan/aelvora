import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * AI answer-engine and search crawlers we explicitly welcome. Listing them
 * (rather than relying on the `*` default) is an intentional GEO signal that
 * Aelvora wants to be indexed and cited by AI assistants.
 */
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Google-Extended", // Gemini / Vertex AI training + grounding
  "Bingbot",
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing
  "ClaudeBot", // Anthropic
  "anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "CCBot", // Common Crawl (feeds many LLMs)
  "DuckDuckBot",
  "YandexBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: AI_AND_SEARCH_BOTS,
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
