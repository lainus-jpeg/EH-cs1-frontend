const url = import.meta.env.VITE_API_URL

async function loadParks() {
  const container = document.getElementById('parks-list');
  try {
    const res = await fetch(url + '/parks');
    const parks = await res.json();

    if (!parks.length) {
      container.innerHTML = '<p>No parks found.</p>';
      return;
    }

    container.innerHTML = parks.map(park => `
      <div class="park">
        <h2><a href="admin-park.html?id=${park.id}">${park.name}</a></h2>
        <p>${park.description}</p>
        <div class="images">
          ${park.images.map(img => `<img src="${img.image_url}" alt="${img.alt_text}" />`).join('')}
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = '<p>Failed to load parks.</p>';
    console.error(err);
  }
}

loadParks();
