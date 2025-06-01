(function(){
  const API_URL = 'https://your-domain.com/api/reviews'; // <- заменить на свой URL API

  function createStars(rating){
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  function createReviewCard(review){
    const card = document.createElement('div');
    card.className = 'review-card';

    card.innerHTML = `
      <div class="review-header">
        <span class="review-author">${review.author}</span>
        <span class="review-rating">${createStars(review.rating)}</span>
      </div>
      <div class="review-date">${review.date}</div>
      <div class="review-text">${review.text}</div>
      <div class="review-photos">${review.photos.map(p => `<img src="${p}" alt="Фото отзыва"/>`).join('')}</div>
    `;
    return card;
  }

  function fetchReviews(){
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        const container = document.getElementById('yandex-reviews-widget');
        if(!container) return;
        container.innerHTML = '';
        if(!data.length){
          container.textContent = 'Нет отзывов.';
          return;
        }
        data.forEach(review => {
          const card = createReviewCard(review);
          container.appendChild(card);
        });
      })
      .catch(() => {
        const container = document.getElementById('yandex-reviews-widget');
        if(container) container.textContent = 'Ошибка загрузки отзывов.';
      });
  }

  // Начинаем загрузку и обновление
  fetchReviews();
  setInterval(fetchReviews, 1000 * 60 * 10); // обновлять каждые 10 минут
})();
