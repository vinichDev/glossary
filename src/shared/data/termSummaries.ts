import { TermSummary } from "@/shared/types/term";

export const termSummaries: TermSummary[] = [
  {
    id: "rendering",
    title: "Рендеринг",
    related: ["csr", "ssr", "pre-rendering", "hydration", "streaming"]
  },
  {
    id: "csr",
    title: "CSR (Client-Side Rendering)",
    related: ["ssr", "hydration", "rendering"]
  },
  {
    id: "ssr",
    title: "SSR (Server-Side Rendering)",
    related: ["csr", "hydration", "pre-rendering", "rendering"]
  },
  {
    id: "pre-rendering",
    title: "Предрендеринг (Pre-rendering)",
    related: ["ssg", "ssr", "nextjs"]
  },
  {
    id: "ssg",
    title: "SSG (Static Site Generation)",
    related: ["pre-rendering", "isr", "cdn"]
  },
  {
    id: "isr",
    title: "ISR (Incremental Static Regeneration)",
    related: ["ssg", "revalidation", "caching"]
  },
  {
    id: "hydration",
    title: "Гидратация (Hydration)",
    related: ["ssr", "csr", "react", "tti"]
  },
  {
    id: "streaming",
    title: "Потоковый рендеринг (Streaming)",
    related: ["suspense", "app-router", "fcp"]
  },
  {
    id: "suspense",
    title: "React Suspense",
    related: ["streaming"]
  },
  {
    id: "rsc",
    title: "RSC (React Server Components)",
    related: ["server-components", "client-components", "app-router"]
  },
  {
    id: "server-components",
    title: "Server Components",
    related: ["rsc", "client-components"]
  },
  {
    id: "client-components",
    title: "Client Components",
    related: ["use-client", "hydration", "rsc"]
  },
  {
    id: "use-client",
    title: "Директива 'use client'",
    related: ["client-components", "app-router"]
  },
  {
    id: "nextjs",
    title: "Next.js",
    related: ["app-router", "pages-router", "ssr", "ssg", "isr"]
  },
  {
    id: "pages-router",
    title: "Pages Router",
    related: ["app-router", "getstaticprops", "getserversideprops", "api-routes"]
  },
  {
    id: "app-router",
    title: "App Router",
    related: ["rsc", "route-handlers", "server-actions", "parallel-routes"]
  },
  {
    id: "parallel-routes",
    title: "Parallel Routes",
    related: ["app-router", "intercepting-routes"]
  },
  {
    id: "intercepting-routes",
    title: "Intercepting Routes",
    related: ["app-router", "parallel-routes"]
  },
  {
    id: "getstaticprops",
    title: "getStaticProps",
    related: ["pages-router", "ssg"]
  },
  {
    id: "getserversideprops",
    title: "getServerSideProps",
    related: ["pages-router", "ssr"]
  },
  {
    id: "api-routes",
    title: "API Routes",
    related: ["pages-router", "route-handlers"]
  },
  {
    id: "route-handlers",
    title: "Route Handlers",
    related: ["app-router"]
  },
  {
    id: "server-actions",
    title: "Server Actions",
    related: ["use-server", "revalidation", "caching"]
  },
  {
    id: "use-server",
    title: "Директива 'use server'",
    related: ["server-actions", "rsc"]
  },
  {
    id: "caching",
    title: "Кэширование (Next.js)",
    related: ["memoization", "revalidation", "isr"]
  },
  {
    id: "revalidation",
    title: "Ревалидация (Revalidation)",
    related: ["caching", "isr", "server-actions"]
  },
  {
    id: "metadata-api",
    title: "Metadata API (generateMetadata)",
    related: ["seo", "app-router"]
  },
  {
    id: "ttfb",
    title: "TTFB (Time To First Byte)",
    related: ["fcp", "performance"]
  },
  {
    id: "fcp",
    title: "FCP (First Contentful Paint)",
    related: ["ttfb", "tti", "performance"]
  },
  {
    id: "tti",
    title: "TTI (Time To Interactive)",
    related: ["hydration", "performance"]
  },
  {
    id: "lighthouse",
    title: "Lighthouse",
    related: ["performance", "seo", "ttfb", "fcp", "tti"]
  },
  {
    id: "cdn",
    title: "CDN (Content Delivery Network)",
    related: ["ssg", "edge-network"]
  },
  {
    id: "next-image",
    title: "next/image (Image Component)",
    related: ["nextjs", "performance"]
  },
  {
    id: "vercel-edge-network",
    title: "Vercel Edge Network",
    related: ["edge-runtime", "cdn", "vercel-functions"]
  },
  {
    id: "edge-runtime",
    title: "Edge Runtime",
    related: ["vercel-edge-network", "vercel-functions"]
  },
  {
    id: "vercel-functions",
    title: "Vercel Functions (Serverless/Functions)",
    related: ["serverless-functions", "edge-runtime"]
  },
  {
    id: "virtualization",
    title: "Виртуализация списков (Windowing)",
    related: ["performance", "rendering"]
  },
  {
    id: "remix",
    title: "Remix",
    related: ["ssr", "rendering"]
  },
  {
    id: "performance",
    title: "Веб-производительность (user-centric metrics)",
    related: ["ttfb", "fcp", "tti", "lighthouse"]
  }
];
