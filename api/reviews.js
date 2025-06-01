const { parseReviews } = require('../parser/parseReviews');

let cachedReviews = [];
let lastFetch = 0;

async function getReviews() {
  const now = Date.now();
  if (!cachedReviews.length || now - lastFetch > 1000 * 60 * 10) { // обновление каждые 10 минут
    try {
      cachedReviews = await parseReviews();
      lastFetch = now;
      console.log('Отзывы обновлены');
    } catch (e) {
      console.error('Ошибка при парсинге отзывов:', e);
    }
  }
  return cachedReviews;
}

module.exports = async function handler(req, res) {
  const reviews = await getReviews();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(reviews);
};
