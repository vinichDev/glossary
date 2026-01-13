import { TermSummary } from "@/shared/types/term";

export const termSummaries: TermSummary[] = [
  {
    id: "nextjs",
    title: "Next.js",
    related: ["react", "app-router", "ssr", "csr", "api"]
  },
  {
    id: "app-router",
    title: "App Router",
    related: ["nextjs", "ssr", "csr"]
  },
  {
    id: "react",
    title: "React",
    related: ["nextjs", "csr", "ssr"]
  },
  {
    id: "typescript",
    title: "TypeScript",
    related: ["react", "nextjs"]
  },
  {
    id: "scss",
    title: "SCSS",
    related: ["css-modules"]
  },
  {
    id: "css-modules",
    title: "CSS Modules",
    related: ["scss"]
  },
  {
    id: "api",
    title: "Web API",
    related: ["rest", "docker", "nextjs"]
  },
  {
    id: "rest",
    title: "REST",
    related: ["api"]
  },
  {
    id: "docker",
    title: "Docker",
    related: ["api"]
  },
  {
    id: "ssr",
    title: "SSR",
    related: ["nextjs", "react"]
  },
  {
    id: "csr",
    title: "CSR",
    related: ["react", "nextjs"]
  },
  {
    id: "fsd",
    title: "Feature-Sliced Design",
    related: ["nextjs"]
  }
];
