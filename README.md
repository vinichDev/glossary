# Glossary

Одностраничное приложение с глоссарием терминов, mindmap и Web API. 

Стек:
- Next.js App Router
- TypeScript
- SCSS
- Postgres
- Prisma

## Запуск локально

```bash
npm install
npm run dev
```

## Docker Compose

Полный стек (Next.js + PostgreSQL) можно поднять так:

```bash
docker compose up --build
```

После старта приложение будет доступно на `http://localhost:3000`.

## База данных

Приложение использует PostgreSQL через Prisma. Перед запуском добавьте `DATABASE_URL` в `.env`
на основе `.env.example`, затем примените миграции и сиды:

```bash
cp .env.example .env
npm run db:migrate
npm run db:seed
```

## Развертывание на Vercel

1. Создайте новый проект в Vercel и подключите этот репозиторий.
2. В разделе Storage создайте базу **Vercel Postgres** и подключите её к проекту.
3. Убедитесь, что в переменные окружения проекта добавлен `DATABASE_URL` (Vercel создаст его автоматически при подключении Postgres).
4. Локально выполните миграции в базу Vercel:

```bash
vercel env pull .env
npm run db:migrate
npm run db:seed
```

5. Запустите деплой — после сборки Next.js будет использовать подключенную базу.

## Web API

- `GET /api/terms` — список терминов
- `GET /api/terms/{id}` — термин по идентификатору
