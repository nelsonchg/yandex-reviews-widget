# Yandex Reviews Widget

## Что внутри

- Парсер отзывов с Яндекс.Карт (Puppeteer)
- API для отдачи отзывов
- JS+CSS виджет для вставки в Tilda

## Установка и запуск

1. Установить зависимости:

```bash
npm install
```

2. Запуск парсера и API (реализовать сервер для запуска `api/reviews.js` по запросу)

> Рекомендуется использовать Render.com для бесплатного Node.js хостинга

3. В `public/widget.js` заменить `API_URL` на URL вашего API

4. Разместить `widget.js` и `widget.css` на публичном хостинге (GitHub Pages, Netlify и т.п.)

5. На сайте Tilda вставить HTML-блок с кодом:

```html
<div id="yandex-reviews-widget">Загрузка отзывов...</div>
<link rel="stylesheet" href="https://your-domain.com/widget.css">
<script src="https://your-domain.com/widget.js"></script>
```

## Бесплатный хостинг

- [Render.com](https://render.com) — бесплатный тариф с поддержкой Puppeteer
- [GitHub Pages](https://pages.github.com) или [Netlify](https://netlify.com) — для статики

## Важно

- Обновление отзывов происходит каждые 10 минут при обращении к API
- Не перегружайте Яндекс частыми запросами
- Для других организаций меняйте URL в `parseReviews.js`

---
