# Glossary

Одностраничное приложение с глоссарием терминов, mindmap и Web API. Проект построен на Next.js App Router, TypeScript и SCSS, используя FSD, gRPC + Protobuf на бэке.

## Разработка без Docker

### Backend (gRPC)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip setuptools wheel
# если установка зависимостей подвисает на сборке grpcio/grpcio-tools,
# используйте бинарные колёса (и убедитесь, что версии доступны):
PIP_ONLY_BINARY=:all: pip install -r requirements.txt
# если получаете ошибку "No matching distribution", уберите переменную
# и установите обычным способом:
# pip install -r requirements.txt
export DATABASE_URL=sqlite:///./data/glossary.db
export GRPC_PORT=8000
python -m app.grpc_server
```

После выполнения миграций сервер остается запущенным и ожидает запросы. Остановить его можно через `Ctrl+C`.

### Frontend (Next.js)

```bash
npm install
export GLOSSARY_GRPC_URL=localhost:8000
npm run dev
```

По умолчанию приложение будет доступно на `http://localhost:3000`.
