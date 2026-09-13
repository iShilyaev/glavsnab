# ГлавСнаб-ИИ

Квиз для пересчёта строительного счёта по транзитному тарифу: пользователь вводит сумму, загружает счёт, видит результат и бронирует цену в мессенджере MAX.

Сайт: [https://ishilyaev.github.io/glavsnab/](https://ishilyaev.github.io/glavsnab/)

## Стек

- React 18
- Vite 6
- Tailwind CSS
- Yarn

## Быстрый старт

```bash
cp .env.example .env
yarn install
yarn dev
```

Приложение откроется на [http://localhost:5173/](http://localhost:5173/).

```bash
yarn build    # production-сборка
yarn preview  # просмотр сборки локально
```

## Переменные окружения

В клиент попадают только переменные с префиксом `VITE_`.

| Переменная | Назначение |
| --- | --- |
| `VITE_BASE_PATH` | Базовый путь Vite. Локально `/`, на GitHub Pages `/glavsnab/` |
| `VITE_WEBHOOK_URL` | Общий webhook. Если CRM не задана, лид уходит сюда |
| `VITE_CRM_WEBHOOK_URL` | Webhook amoCRM. Пока пустая заготовка |
| `VITE_MAX_BOT_URL` | Ссылка на чат-бот MAX. Пока `https://max.ru` |

Файлы:

- `.env.example` — шаблон, лежит в репозитории
- `.env` — локальные значения, в git не попадает
- `.env.production` — локальная прод-сборка, в git не попадает

После изменения `.env` перезапустите `yarn dev`.

Прод на GitHub Pages задаётся в **Settings → Secrets and variables → Actions**:

| Secret | Назначение |
| --- | --- |
| `VITE_WEBHOOK_URL` | Общий webhook |
| `VITE_CRM_WEBHOOK_URL` | Webhook amoCRM |
| `VITE_MAX_BOT_URL` | Ссылка на чат-бот MAX |

`VITE_BASE_PATH=/glavsnab/` зашит в [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Сценарий

1. **Старт** — описание платформы
2. **Документ** — сумма заказа и файл счёта
3. **Проверка** — технические параметры
4. **Результат** — скидка 10% или спец-условия без НДС
5. **Бронь** — имя и телефон, затем два независимых действия:
   - в фоне уходит webhook в CRM (имя, телефон, сумма, ссылка на файл)
   - сразу открывается чат-бот MAX

## Заготовки интеграций

Пока нет боевых адресов amoCRM и бота MAX.

1. Впишите webhook amoCRM в `VITE_CRM_WEBHOOK_URL`
2. Впишите ссылку на верифицированного бота в `VITE_MAX_BOT_URL`

Остальные параметры (скидка, минимальная сумма, контакты, ИНН) заданы в `src/config.js`.

## GitHub Pages

Публикация идёт автоматически из `main` через [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. В репозитории: **Settings → Pages → Source: GitHub Actions**
2. Добавьте секреты из таблицы выше
3. После успешного workflow сайт доступен по адресу  
   `https://ishilyaev.github.io/glavsnab/`
