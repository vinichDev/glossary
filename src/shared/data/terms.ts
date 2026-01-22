import { Term } from "@/shared/types/term";

export const terms: Term[] = [
  {
    keyword: "rendering",
    title: "Рендеринг",
    description:
      "Процесс формирования отображаемого пользователю интерфейса (HTML/DOM) из данных и шаблонов/компонентов, на клиенте или на сервере.",
    source: "Rendering on the Web — web.dev",
    sourceUrl: "https://web.dev/articles/rendering-on-the-web",
    related: ["csr", "ssr", "pre-rendering", "hydration", "streaming"]
  },
  {
    keyword: "csr",
    title: "CSR (Client-Side Rendering)",
    description:
      "Подход, при котором HTML-контент генерируется в браузере с помощью JavaScript.",
    source: "Client-side rendering (CSR) — MDN Glossary",
    sourceUrl: "https://developer.mozilla.org/en-US/docs/Glossary/CSR",
    related: ["ssr", "hydration", "rendering"]
  },
  {
    keyword: "ssr",
    title: "SSR (Server-Side Rendering)",
    description:
      "Подход, при котором HTML-контент генерируется на сервере и отправляется клиенту.",
    source: "Server-side rendering (SSR) — MDN Glossary",
    sourceUrl: "https://developer.mozilla.org/en-US/docs/Glossary/SSR",
    related: ["csr", "hydration", "pre-rendering", "rendering"]
  },
  {
    keyword: "pre-rendering",
    title: "Предрендеринг (Pre-rendering)",
    description:
      "Генерация HTML заранее (на этапе сборки или на запросе), чтобы отдавать готовую разметку быстрее.",
    source: "Rendering (Pre-rendering) — Next.js Docs",
    sourceUrl: "https://nextjs.org/docs/13/pages/building-your-application/rendering",
    related: ["ssg", "ssr", "nextjs"]
  },
  {
    keyword: "ssg",
    title: "SSG (Static Site Generation)",
    description:
      "Статическая генерация: HTML страницы создаётся во время сборки и переиспользуется на каждом запросе.",
    source: "Static Site Generation (SSG) — Next.js Docs",
    sourceUrl:
      "https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation",
    related: ["pre-rendering", "isr", "cdn"]
  },
  {
    keyword: "isr",
    title: "ISR (Incremental Static Regeneration)",
    description:
      "Подход, позволяющий обновлять статические страницы во время выполнения без полной пересборки сайта.",
    source: "How to implement Incremental Static Regeneration (ISR) — Next.js Docs",
    sourceUrl:
      "https://nextjs.org/docs/pages/guides/incremental-static-regeneration",
    related: ["ssg", "revalidation", "caching"]
  },
  {
    keyword: "hydration",
    title: "Гидратация (Hydration)",
    description:
      "Подключение React к уже существующему HTML (сгенерированному на сервере), чтобы «оживить» интерфейс и сделать его интерактивным.",
    source: "hydrateRoot — React Docs",
    sourceUrl: "https://react.dev/reference/react-dom/client/hydrateRoot",
    related: ["ssr", "csr", "react", "tti"]
  },
  {
    keyword: "streaming",
    title: "Потоковый рендеринг (Streaming)",
    description:
      "Отдача UI частями по мере готовности, чтобы пользователь видел контент раньше полной готовности страницы.",
    source: "loading.js (Streaming route segments) — Next.js Docs",
    sourceUrl: "https://nextjs.org/docs/app/api-reference/file-conventions/loading",
    related: ["suspense", "app-router", "fcp"]
  },
  {
    keyword: "suspense",
    title: "React Suspense",
    description:
      "Механизм React для показа fallback-интерфейса, пока часть дерева UI «ожидает» данные/код и не может быть отрендерена.",
    source: "<Suspense> — React Docs",
    sourceUrl: "https://react.dev/reference/react/Suspense",
    related: ["streaming"]
  },
  {
    keyword: "rsc",
    title: "RSC (React Server Components)",
    description:
      "Тип компонентов React, которые рендерятся в серверной среде (вне клиентского приложения) и помогают уменьшать клиентский JavaScript.",
    source: "Server Components — React Docs",
    sourceUrl: "https://react.dev/reference/rsc/server-components",
    related: ["server-components", "client-components", "app-router"]
  },
  {
    keyword: "server-components",
    title: "Server Components",
    description:
      "Компоненты, выполняющиеся в серверной среде (RSC): удобны для доступа к данным/бэкенду и снижения объёма JS на клиенте.",
    source: "Server Components — React Docs",
    sourceUrl: "https://react.dev/reference/rsc/server-components",
    related: ["rsc", "client-components"]
  },
  {
    keyword: "client-components",
    title: "Client Components",
    description:
      "Компоненты, выполняющиеся в браузере: поддерживают интерактивность, события, состояние и доступ к browser APIs.",
    source: "Server and Client Components — Next.js Docs",
    sourceUrl:
      "https://nextjs.org/docs/app/getting-started/server-and-client-components",
    related: ["use-client", "hydration", "rsc"]
  },
  {
    keyword: "use-client",
    title: "Директива 'use client'",
    description:
      "Объявляет точку входа для компонентов, которые должны рендериться на клиенте и требуют возможностей браузера (state, events, browser APIs).",
    source: "use client — Next.js Docs",
    sourceUrl: "https://nextjs.org/docs/app/api-reference/directives/use-client",
    related: ["client-components", "app-router"]
  },
  {
    keyword: "nextjs",
    title: "Next.js",
    description:
      "React-фреймворк с поддержкой разных стратегий рендеринга, маршрутизации и серверных возможностей.",
    source: "Next.js Docs (App Router) — Next.js",
    sourceUrl: "https://nextjs.org/docs/app",
    related: ["app-router", "pages-router", "ssr", "ssg", "isr"]
  },
  {
    keyword: "pages-router",
    title: "Pages Router",
    description:
      "Маршрутизация на основе каталога pages: файл в pages автоматически становится маршрутом.",
    source: "Pages and Layouts — Next.js Docs",
    sourceUrl:
      "https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts",
    related: ["app-router", "getstaticprops", "getserversideprops", "api-routes"]
  },
  {
    keyword: "app-router",
    title: "App Router",
    description:
      "Маршрутизация на основе каталога app, построенная вокруг Server/Client Components, layouts и возможностей streaming/Suspense.",
    source: "App Router — Next.js Docs",
    sourceUrl: "https://nextjs.org/docs/app",
    related: ["rsc", "route-handlers", "server-actions", "parallel-routes"]
  },
  {
    keyword: "parallel-routes",
    title: "Parallel Routes",
    description:
      "Позволяют одновременно или условно рендерить одну или несколько страниц в рамках одного layout.",
    source: "Parallel Routes — Next.js Docs",
    sourceUrl:
      "https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes",
    related: ["app-router", "intercepting-routes"]
  },
  {
    keyword: "intercepting-routes",
    title: "Intercepting Routes",
    description:
      "Позволяют загрузить маршрут из другой части приложения внутри текущего layout-контекста (часто для модалок/оверлеев).",
    source: "Intercepting Routes — Next.js Docs",
    sourceUrl:
      "https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes",
    related: ["app-router", "parallel-routes"]
  },
  {
    keyword: "getstaticprops",
    title: "getStaticProps",
    description:
      "Функция Next.js (Pages Router) для получения данных на этапе сборки (static generation).",
    source: "getStaticProps — Next.js Docs",
    sourceUrl:
      "https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props",
    related: ["pages-router", "ssg"]
  },
  {
    keyword: "getserversideprops",
    title: "getServerSideProps",
    description:
      "Функция Next.js (Pages Router) для получения данных и рендера страницы во время запроса (request time).",
    source: "getServerSideProps — Next.js Docs",
    sourceUrl:
      "https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props",
    related: ["pages-router", "ssr"]
  },
  {
    keyword: "api-routes",
    title: "API Routes",
    description:
      "Механизм Pages Router для создания API-эндпоинтов внутри Next.js приложения.",
    source: "API Routes — Next.js Docs",
    sourceUrl:
      "https://nextjs.org/docs/pages/building-your-application/routing/api-routes",
    related: ["pages-router", "route-handlers"]
  },
  {
    keyword: "route-handlers",
    title: "Route Handlers",
    description:
      "Механизм App Router для создания обработчиков запросов для маршрута с использованием Web Request/Response APIs.",
    source: "Route Handlers — Next.js Docs",
    sourceUrl: "https://nextjs.org/docs/app/getting-started/route-handlers",
    related: ["app-router"]
  },
  {
    keyword: "server-actions",
    title: "Server Actions",
    description:
      "Асинхронные функции, выполняющиеся на сервере; могут вызываться из Server/Client Components для форм и мутаций данных.",
    source: "Server Actions and Mutations — Next.js Docs",
    sourceUrl:
      "https://nextjs.org/docs/13/app/building-your-application/data-fetching/server-actions-and-mutations",
    related: ["use-server", "revalidation", "caching"]
  },
  {
    keyword: "use-server",
    title: "Директива 'use server'",
    description:
      "Помечает функцию или файл как выполняющиеся на сервере (Server Function).",
    source: "use server — Next.js Docs",
    sourceUrl: "https://nextjs.org/docs/app/api-reference/directives/use-server",
    related: ["server-actions", "rsc"]
  },
  {
    keyword: "caching",
    title: "Кэширование (Next.js)",
    description:
      "Набор механизмов, сохраняющих результаты вычислений/запросов и рендера, чтобы ускорять повторные запросы и снижать стоимость выполнения.",
    source: "Caching in Next.js — Next.js Docs",
    sourceUrl: "https://nextjs.org/docs/app/guides/caching",
    related: ["memoization", "revalidation", "isr"]
  },
  {
    keyword: "revalidation",
    title: "Ревалидация (Revalidation)",
    description:
      "Обновление (инвалидация/пересоздание) кэшированных данных/результатов без полной пересборки приложения.",
    source: "Caching and Revalidating — Next.js Docs",
    sourceUrl:
      "https://nextjs.org/docs/app/getting-started/caching-and-revalidating",
    related: ["caching", "isr", "server-actions"]
  },
  {
    keyword: "metadata-api",
    title: "Metadata API (generateMetadata)",
    description:
      "API Next.js для задания метаданных (в т.ч. для SEO и шаринга): через static metadata или функцию generateMetadata.",
    source: "generateMetadata — Next.js Docs",
    sourceUrl: "https://nextjs.org/docs/app/api-reference/functions/generate-metadata",
    related: ["seo", "app-router"]
  },
  {
    keyword: "ttfb",
    title: "TTFB (Time To First Byte)",
    description:
      "Метрика: время, которое требуется, чтобы сеть вернула первый байт ответа на запрос ресурса.",
    source: "User-centric performance metrics (TTFB) — web.dev",
    sourceUrl: "https://web.dev/articles/user-centric-performance-metrics",
    related: ["fcp", "performance"]
  },
  {
    keyword: "fcp",
    title: "FCP (First Contentful Paint)",
    description:
      "Метрика: момент, когда браузер впервые отрисовал какой-либо контент из DOM (текст/изображение и т.п.).",
    source: "First Contentful Paint (FCP) — web.dev",
    sourceUrl: "https://web.dev/articles/fcp",
    related: ["ttfb", "tti", "performance"]
  },
  {
    keyword: "tti",
    title: "TTI (Time To Interactive)",
    description:
      "Лабораторная метрика, оценивающая, когда страница становится по-настоящему интерактивной (выглядит интерактивной и реально реагирует).",
    source: "Time to Interactive (TTI) — web.dev",
    sourceUrl: "https://web.dev/articles/tti",
    related: ["hydration", "performance"]
  },
  {
    keyword: "lighthouse",
    title: "Lighthouse",
    description:
      "Автоматизированный инструмент аудита качества страниц: performance, accessibility, SEO и т.д.",
    source: "Lighthouse — Chrome for Developers",
    sourceUrl: "https://developer.chrome.com/docs/lighthouse",
    related: ["performance", "seo", "ttfb", "fcp", "tti"]
  },
  {
    keyword: "cdn",
    title: "CDN (Content Delivery Network)",
    description:
      "Географически распределённая сеть серверов, кэширующая контент ближе к пользователям для ускорения доставки.",
    source: "What is a CDN? — Cloudflare Learning Center",
    sourceUrl: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/",
    related: ["ssg", "edge-network"]
  },
  {
    keyword: "next-image",
    title: "next/image (Image Component)",
    description:
      "Компонент Next.js, расширяющий <img> и предоставляющий автоматическую оптимизацию изображений.",
    source: "Image Component — Next.js Docs",
    sourceUrl: "https://nextjs.org/docs/app/api-reference/components/image",
    related: ["nextjs", "performance"]
  },
  {
    keyword: "vercel-edge-network",
    title: "Vercel Edge Network",
    description:
      "Глобальная edge-инфраструктура Vercel, через которую обрабатываются запросы и распределяются ресурсы ближе к пользователям.",
    source: "Life of a Vercel request: Navigating the Edge Network — Vercel Blog",
    sourceUrl:
      "https://vercel.com/blog/life-of-a-vercel-request-navigating-the-edge-network",
    related: ["edge-runtime", "cdn", "vercel-functions"]
  },
  {
    keyword: "edge-runtime",
    title: "Edge Runtime",
    description:
      "Среда выполнения на базе V8 для запуска кода в изолированных окружениях ближе к пользователям (edge).",
    source: "Edge Runtime — Vercel Docs",
    sourceUrl: "https://vercel.com/docs/functions/runtimes/edge",
    related: ["vercel-edge-network", "vercel-functions"]
  },
  {
    keyword: "vercel-functions",
    title: "Vercel Functions (Serverless/Functions)",
    description:
      "Функции, которые Vercel запускает по запросу на основе кода приложения; не требуют управления серверами и масштабируются автоматически.",
    source: "Vercel Functions — Vercel Docs",
    sourceUrl: "https://vercel.com/docs/functions",
    related: ["serverless-functions", "edge-runtime"]
  },
  {
    keyword: "virtualization",
    title: "Виртуализация списков (Windowing)",
    description:
      "Оптимизация рендера больших списков: в DOM рендерятся только элементы, видимые пользователю, а «окно» сдвигается при скролле.",
    source: "Virtualize long lists with react-window — web.dev",
    sourceUrl: "https://web.dev/articles/virtualize-long-lists-react-window",
    related: ["performance", "rendering"]
  },
  {
    keyword: "remix",
    title: "Remix",
    description:
      "Full-stack веб-фреймворк, ориентированный на веб-стандарты и устойчивый UX (маршруты, загрузчики, actions и т.п.).",
    source: "Remix Docs — remix.run",
    sourceUrl: "https://remix.run/docs",
    related: ["ssr", "rendering"]
  },
  {
    keyword: "performance",
    title: "Веб-производительность (user-centric metrics)",
    description:
      "Подход к измерению скорости и отзывчивости сайта метриками, ориентированными на пользователя (например, TTFB/FCP/TTI).",
    source: "User-centric performance metrics — web.dev",
    sourceUrl: "https://web.dev/articles/user-centric-performance-metrics",
    related: ["ttfb", "fcp", "tti", "lighthouse"]
  }
];
