const puppeteer = require('puppeteer');

async function parseReviews() {
  const url = 'https://yandex.ru/maps/org/stroyselo/1206960617/reviews/';

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.goto(url, {waitUntil: 'networkidle2'});

  // Ждём появления отзывов
  await page.waitForSelector('[data-bem*="review-card"]', {timeout: 15000});

  // Скроллим, чтобы подгрузить максимум отзывов (если нужно)
  await autoScroll(page);

  // Получаем данные отзывов
  const reviews = await page.evaluate(() => {
    const reviewElems = document.querySelectorAll('[data-bem*="review-card"]');
    const data = [];
    reviewElems.forEach(el => {
      const author = el.querySelector('.business-review-view__author-name')?.textContent.trim() || '';
      const date = el.querySelector('.business-review-view__date')?.textContent.trim() || '';
      const text = el.querySelector('.business-review-view__body-text')?.textContent.trim() || '';
      const rating = el.querySelectorAll('.business-rating-badge__star--filled').length;
      const photos = [];
      el.querySelectorAll('.business-review-photos-view__photo img').forEach(img => {
        photos.push(img.src);
      });
      data.push({author, date, text, rating, photos});
    });
    return data;
  });

  await browser.close();
  return reviews;
}

async function autoScroll(page){
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if(totalHeight >= scrollHeight){
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

module.exports = { parseReviews };
