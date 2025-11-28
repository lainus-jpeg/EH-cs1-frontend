const url = import.meta.env.VITE_API_URL;

async function loadParksForSlider() {
  const sliderWrapper = document.querySelector('.swiper-wrapper');
  try {
    const res = await fetch(url + '/parks');
    const parks = await res.json();
    sliderWrapper.innerHTML = parks.map(park => `
      <div class="swiper-slide expanding-slide">
        <div class="slide-overlay"></div>
        <div class="slide-content">
          <h2 class="slide-title">${park.name}</h2>
          <p class="slide-subtitle">${park.description}</p>
          <a href="park.html?id=${park.id}" class="slide-btn">Explore More</a>
          <div class="images">
            ${park.images && park.images.length ? `<img src="${park.images[0].image_url}" alt="${park.images[0].alt_text}"/>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    sliderWrapper.innerHTML = '<p>Failed to load parks.</p>';
    console.error(err);
  }
}

loadParksForSlider();