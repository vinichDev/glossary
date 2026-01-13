# Glossary

Одностраничное приложение с глоссарием терминов, mindmap и Web API. Проект построен на Next.js App Router, TypeScript и SCSS, структура соответствует Feature-Sliced Design.

## Запуск локально

```bash
npm install
npm run dev
```

## Web API

- `GET /api/terms` — список терминов
- `GET /api/terms/{id}` — термин по идентификатору

## Docker

```bash
docker build -t glossary .
docker run -p 3000:3000 glossary
```
