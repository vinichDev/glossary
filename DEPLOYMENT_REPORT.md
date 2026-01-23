# Глоссарий (gRPC)

## Локальное развертывание с помощью docker-compose

1. Запустите сборку и контейнеры:
   ```bash
   docker compose up --build
   ```
2. Сервис доступен по gRPC на `localhost:8000`.

## Процесс развертывания и работы сервиса

### Миграции

При старте gRPC-сервера выполняется `alembic upgrade head`, что создает таблицу `terms`
в SQLite и подготавливает структуру данных для глоссария.

### Проверка работы через grpcurl

> Примеры ниже предполагают установленный `grpcurl` и включенную рефлексию сервиса.

1. Проверить доступные сервисы:
   ```bash
   grpcurl -plaintext localhost:8000 list
   ```
2. Получить список терминов:
   ```bash
   grpcurl -plaintext localhost:8000 glossary.v1.GlossaryService/ListTerms
   ```
3. Создать термин:
   ```bash
   grpcurl -plaintext -d '{"term": {"keyword": "grpc", "title": "gRPC", "description": "RPC over HTTP/2", "source": "Google", "source_url": "https://grpc.io", "related": ["protobuf"]}}' \
     localhost:8000 glossary.v1.GlossaryService/CreateTerm
   ```
4. Получить термин по ключу:
   ```bash
   grpcurl -plaintext -d '{"keyword": "grpc"}' \
     localhost:8000 glossary.v1.GlossaryService/GetTerm
   ```
5. Обновить термин:
   ```bash
   grpcurl -plaintext -d '{"keyword": "grpc", "term": {"description": "High-performance RPC", "clear_related": true}}' \
     localhost:8000 glossary.v1.GlossaryService/UpdateTerm
   ```
6. Удалить термин:
   ```bash
   grpcurl -plaintext -d '{"keyword": "grpc"}' \
     localhost:8000 glossary.v1.GlossaryService/DeleteTerm
   ```

## Публичный доступ


## Сравнение REST vs RPC (gRPC) vs GraphQL в микросервисах (бенчмарки) — кратко

Ниже — подборка работ с замерами (latency/throughput/CPU/трафик) и их самые важные выводы.

### 1) Niswar et al., 2024 — REST vs GraphQL vs gRPC (микросервисы)
**Источник:** https://journals.pan.pl/Content/131803?format_id=1  
**Что мерили:** response time, CPU utilization в сценариях обмена данными между микросервисами.  
**Ключевые результаты:**
- В одном из сценариев **gRPC быстрее**: ~437 ms (gRPC) vs ~510 ms (REST) vs ~589 ms (GraphQL).
- При росте нагрузки **GraphQL сильнее грузит CPU** (в отдельных сценариях доходило до ~90%).
**Вывод:** для межсервисных вызовов по задержкам чаще выигрывал **gRPC**; **GraphQL** требует оптимизации резолверов/батчинга.

---

### 2) Bolanowski et al., 2022 — REST vs gRPC (микросервисные экосистемы)
**Источник (PDF):** https://www.ibspan.waw.pl/~paprzyck/mp/cvr/research/IoT_papers/SOMET2022_REST.pdf  
**Что мерили:** response time в разных классах коммуникационных задач, учитывали влияние шифрования (TLS).  
**Ключевые результаты:**
- gRPC более выгоден для **постоянного обмена/передачи больших объёмов** между сервисами.
- При включении **шифрования** gRPC получал **небольшое преимущество** в “стандартных” сценариях.
**Вывод:** выбор REST vs gRPC разумно делать по **профилю трафика** и условиям (например, TLS).

---

### 3) Kamiński et al., 2022 (arXiv) — REST vs gRPC vs GraphQL (Python)
**Источник (PDF):** https://arxiv.org/pdf/2212.07475  
**Что мерили:** время CRUD-операций и выборок, а также размеры сообщений/трафик (Wireshark).  
**Ключевые результаты (пример из таблиц, Windows):**
- Insert 1: REST ~2278 µs, gRPC ~1512 µs, GraphQL ~4834 µs  
- Fetch 1: REST ~2289 µs, gRPC ~1456 µs, GraphQL ~6271 µs  
- Fetch 100: REST ~19728 µs, gRPC ~11611 µs, GraphQL ~22176 µs  
**Вывод:** в этих реализациях **gRPC быстрее**, **GraphQL заметно медленнее**; “самый экономный по байтам” протокол зависит от стека/реализации.

---

### 4) Jin et al., 2025 — GraphQL vs REST (serverless persistence, AWS)
**Источник (PDF):** https://faculty.washington.edu/wlloyd/papers/graphql-camera-ready.pdf  
**Что мерили:** RTT, throughput, масштабирование по concurrency (1…100).  
**Ключевые результаты:**
- **Apollo GraphQL** часто давал **на 25–67% ниже средний RTT** (особенно для сложных выборок).
- Но при высокой concurrency REST был стабильнее: REST держался ~60–100 ms до 100 потоков, Apollo деградировал до ~320–360 ms.
**Вывод:** GraphQL может выигрывать на **сложных запросах и умеренной конкуренции**, но при **высокой конкуренции** REST предсказуемее без дополнительных мер масштабирования.

---

### 5) Lawi et al., 2021 (MDPI) — GraphQL vs REST
**Источник:** https://www.mdpi.com/2073-431X/10/11/138  
**Что мерили:** response time, throughput, CPU/memory.  
**Ключевые результаты (по авторам):**
- REST быстрее до ~50.5% и выше по throughput до ~37.16%.
- GraphQL показывал меньшую утилизацию CPU/memory в их конфигурации.
**Вывод:** REST — когда важны скорость/пропускная способность; GraphQL — когда ценна гибкая выборка (и можно контролировать стоимость резолверов).

---

### 6) Elghazal et al., 2025 (SciTePress) — REST vs GraphQL (микросервисы)
**Источник (PDF):** https://www.scitepress.org/Papers/2025/137299/137299.pdf  
**Что мерили:** avg request duration, RPS, объёмы данных, error rate.  
**Ключевые результаты (из сводной таблицы):**
- Avg duration: REST ~247 ms vs GraphQL ~915 ms  
- Throughput: REST ~471 req/s vs GraphQL ~312 req/s  
- GraphQL снижал “лишний” объём получаемых данных (total data received существенно меньше), но запросы у GraphQL крупнее.
**Вывод:** GraphQL помогает уменьшить over-fetching, но без оптимизаций может проигрывать по задержке/throughput.

---

## Итог
- **gRPC (RPC)**: чаще лучший по **latency** для сервис-сервис и пакетных выборок (при стабильных контрактах).
- **REST**: часто более **предсказуем** и устойчив при **высокой конкуренции**; простая эксплуатация.
- **GraphQL**: полезен против **over-fetching** и для сложных представлений данных, но результаты по latency/CPU сильно зависят от реализации (батчинг, кэш, сложность запросов).

