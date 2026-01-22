# Глоссарий (FastApi)

## Локальное развертывание с помощью docker-compose

1. Запустите сборку и контейнеры:
   ```bash
   docker compose up --build
   ```
2. Приложение будет доступно:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`

## Публичный доступ

front: https://glossary-349e.onrender.com/
back: https://glossary-fastapi-back.onrender.com

## Процесс работы сервиса  

### Миграции

При старте FastAPI вызывает Alembic `upgrade head`, что создает таблицу `terms` в SQLite и
заполняет её стартовым набором терминов

### Генерация статической документации

```bash
cd backend
python scripts/generate_static_docs.py
```

### Доступ к документации на бэке
Swagger: /docs
Opendoc: /static-docs

