import { Term } from "@/shared/types/term";

export const terms: Term[] = [
  {
    id: "nextjs",
    title: "Next.js",
    description:
      "Фреймворк на базе React для построения полноценных веб-приложений с маршрутизацией, рендерингом на сервере и оптимизацией производительности.",
    source: "Next.js Docs",
    sourceUrl: "https://nextjs.org/docs",
    related: ["react", "app-router", "ssr", "csr", "api"]
  },
  {
    id: "app-router",
    title: "App Router",
    description:
      "Новый маршрутизатор Next.js, основанный на файловой структуре папки app, поддерживающий серверные и клиентские компоненты и вложенные layout.",
    source: "Next.js App Router",
    sourceUrl: "https://nextjs.org/docs/app",
    related: ["nextjs", "ssr", "csr"]
  },
  {
    id: "react",
    title: "React",
    description:
      "Библиотека JavaScript для построения пользовательских интерфейсов на основе компонентов и декларативного описания состояния.",
    source: "React Docs",
    sourceUrl: "https://react.dev/learn",
    related: ["nextjs", "csr", "ssr"]
  },
  {
    id: "typescript",
    title: "TypeScript",
    description:
      "Надстройка над JavaScript с системой статической типизации, повышающей безопасность и предсказуемость кода.",
    source: "TypeScript Handbook",
    sourceUrl: "https://www.typescriptlang.org/docs/",
    related: ["react", "nextjs"]
  },
  {
    id: "scss",
    title: "SCSS",
    description:
      "Синтаксис препроцессора Sass, расширяющий CSS переменными, вложенностью и миксинами для более удобной стилизации.",
    source: "Sass Documentation",
    sourceUrl: "https://sass-lang.com/documentation/",
    related: ["css-modules"]
  },
  {
    id: "css-modules",
    title: "CSS Modules",
    description:
      "Техника инкапсуляции стилей, при которой классы автоматически локализуются и не конфликтуют между компонентами.",
    source: "Next.js CSS Modules",
    sourceUrl: "https://nextjs.org/docs/app/building-your-application/styling/css-modules",
    related: ["scss"]
  },
  {
    id: "api",
    title: "Web API",
    description:
      "Набор HTTP-эндпоинтов, предоставляющий доступ к данным или функциональности приложения для других систем.",
    source: "MDN Web API",
    sourceUrl: "https://developer.mozilla.org/en-US/docs/Glossary/API",
    related: ["rest", "docker", "nextjs"]
  },
  {
    id: "rest",
    title: "REST",
    description:
      "Архитектурный стиль взаимодействия по HTTP, основанный на ресурсах, адресуемых URL, и стандартных методах.",
    source: "MDN REST",
    sourceUrl: "https://developer.mozilla.org/en-US/docs/Glossary/REST",
    related: ["api"]
  },
  {
    id: "docker",
    title: "Docker",
    description:
      "Платформа контейнеризации, позволяющая упаковывать приложение и его зависимости в переносимый образ.",
    source: "Docker Docs",
    sourceUrl: "https://docs.docker.com/",
    related: ["api"]
  },
  {
    id: "ssr",
    title: "SSR",
    description:
      "Server-Side Rendering — генерация HTML на сервере для ускорения первого отображения страницы.",
    source: "Next.js Rendering",
    sourceUrl: "https://nextjs.org/docs/app/building-your-application/rendering",
    related: ["nextjs", "react"]
  },
  {
    id: "csr",
    title: "CSR",
    description:
      "Client-Side Rendering — рендеринг интерфейса в браузере после загрузки JavaScript.",
    source: "Next.js Rendering",
    sourceUrl: "https://nextjs.org/docs/app/building-your-application/rendering",
    related: ["react", "nextjs"]
  },
  {
    id: "fsd",
    title: "Feature-Sliced Design",
    description:
      "Методология архитектуры фронтенда, предлагающая делить код по слоям (shared, entities, features, widgets, pages) и изолировать бизнес-функциональность.",
    source: "Feature-Sliced Design",
    sourceUrl: "https://feature-sliced.design/docs",
    related: ["nextjs"]
  }
];
