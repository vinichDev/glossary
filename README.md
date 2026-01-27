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

## Деплой на Vercel (Next.js + Prisma + Postgres)

### 1) Подключите Postgres
В Vercel: **Project → Storage → Connect Database** → выберите Postgres-провайдера (например Neon).  
Vercel сам добавит переменные окружения.

### 3) Миграции при деплое
С помощью `vercel-build`:

```json
{
  "scripts": {
    "vercel-build": "npx prisma generate && npx prisma migrate deploy && next build"
  }
}
```

### 4) Seed (начальные данные)
На Vercel нет SSH/терминала, поэтому seed можно запустить локально (или через CI):

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local
cp .env.local .env
npx prisma db seed
```

5. Запустите деплой — после сборки Next.js будет использовать подключенную базу.

## API

- `GET /api/terms` — список терминов
- `GET /api/terms/{id}` — термин по идентификатору
