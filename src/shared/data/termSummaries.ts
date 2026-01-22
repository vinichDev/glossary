import { TermSummary } from "@/shared/types/term";

export const termSummaries: TermSummary[] = [
  {
    keyword: "rendering",
    title: "Рендеринг",
    related: ["csr", "ssr", "pre-rendering", "hydration", "streaming"]
  },
  {
    keyword: "csr",
    title: "CSR (Client-Side Rendering)",
    related: ["ssr", "hydration", "rendering"]
  },
  {
    keyword: "ssr",
    title: "SSR (Server-Side Rendering)",
    related: ["csr", "hydration", "pre-rendering", "rendering"]
  },
  {
    keyword: "pre-rendering",
    title: "Предрендеринг (Pre-rendering)",
    related: ["ssg", "ssr", "nextjs"]
  },
  {
    keyword: "ssg",
    title: "SSG (Static Site Generation)",
    related: ["pre-rendering", "isr", "cdn"]
  },
  {
    keyword: "isr",
    title: "ISR (Incremental Static Regeneration)",
    related: ["ssg", "revalidation", "caching"]
  },
  {
    keyword: "hydration",
    title: "Гидратация (Hydration)",
    related: ["ssr", "csr", "react", "tti"]
  },
  {
    keyword: "streaming",
    title: "Потоковый рендеринг (Streaming)",
    related: ["suspense", "app-router", "fcp"]
  },
  {
    keyword: "suspense",
    title: "React Suspense",
    related: ["streaming"]
  },
  {
    keyword: "rsc",
    title: "RSC (React Server Components)",
    related: ["server-components", "client-components", "app-router"]
  },
  {
    keyword: "server-components",
    title: "Server Components",
    related: ["rsc", "client-components"]
  },
  {
    keyword: "client-components",
    title: "Client Components",
    related: ["use-client", "hydration", "rsc"]
  },
  {
    keyword: "use-client",
    title: "Директива 'use client'",
    related: ["client-components", "app-router"]
  },
  {
    keyword: "nextjs",
    title: "Next.js",
    related: ["app-router", "pages-router", "ssr", "ssg", "isr"]
  },
  {
    keyword: "pages-router",
    title: "Pages Router",
    related: ["app-router", "getstaticprops", "getserversideprops", "api-routes"]
  },
  {
    keyword: "app-router",
    title: "App Router",
    related: ["rsc", "route-handlers", "server-actions", "parallel-routes"]
  },
  {
    keyword: "parallel-routes",
    title: "Parallel Routes",
    related: ["app-router", "intercepting-routes"]
  },
  {
    keyword: "intercepting-routes",
    title: "Intercepting Routes",
    related: ["app-router", "parallel-routes"]
  },
  {
    keyword: "getstaticprops",
    title: "getStaticProps",
    related: ["pages-router", "ssg"]
  },
  {
    keyword: "getserversideprops",
    title: "getServerSideProps",
    related: ["pages-router", "ssr"]
  },
  {
    keyword: "api-routes",
    title: "API Routes",
    related: ["pages-router", "route-handlers"]
  },
  {
    keyword: "route-handlers",
    title: "Route Handlers",
    related: ["app-router"]
  },
  {
    keyword: "server-actions",
    title: "Server Actions",
    related: ["use-server", "revalidation", "caching"]
  },
  {
    keyword: "use-server",
    title: "Директива 'use server'",
    related: ["server-actions", "rsc"]
  },
  {
    keyword: "caching",
    title: "Кэширование (Next.js)",
    related: ["memoization", "revalidation", "isr"]
  },
  {
    keyword: "revalidation",
    title: "Ревалидация (Revalidation)",
    related: ["caching", "isr", "server-actions"]
  },
  {
    keyword: "metadata-api",
    title: "Metadata API (generateMetadata)",
    related: ["seo", "app-router"]
  },
  {
    keyword: "ttfb",
    title: "TTFB (Time To First Byte)",
    related: ["fcp", "performance"]
  },
  {
    keyword: "fcp",
    title: "FCP (First Contentful Paint)",
    related: ["ttfb", "tti", "performance"]
  },
  {
    keyword: "tti",
    title: "TTI (Time To Interactive)",
    related: ["hydration", "performance"]
  },
  {
    keyword: "lighthouse",
    title: "Lighthouse",
    related: ["performance", "seo", "ttfb", "fcp", "tti"]
  },
  {
    keyword: "cdn",
    title: "CDN (Content Delivery Network)",
    related: ["ssg", "edge-network"]
  },
  {
    keyword: "next-image",
    title: "next/image (Image Component)",
    related: ["nextjs", "performance"]
  },
  {
    keyword: "vercel-edge-network",
    title: "Vercel Edge Network",
    related: ["edge-runtime", "cdn", "vercel-functions"]
  },
  {
    keyword: "edge-runtime",
    title: "Edge Runtime",
    related: ["vercel-edge-network", "vercel-functions"]
  },
  {
    keyword: "vercel-functions",
    title: "Vercel Functions (Serverless/Functions)",
    related: ["serverless-functions", "edge-runtime"]
  },
  {
    keyword: "virtualization",
    title: "Виртуализация списков (Windowing)",
    related: ["performance", "rendering"]
  },
  {
    keyword: "remix",
    title: "Remix",
    related: ["ssr", "rendering"]
  },
  {
    keyword: "performance",
    title: "Веб-производительность (user-centric metrics)",
    related: ["ttfb", "fcp", "tti", "lighthouse"]
  }
];
