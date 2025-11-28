const url = import.meta.env.VITE_API_URL

function getParkIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }
  
  async function loadParkDetails(parkId) {
    const parkNameEl = document.getElementById('park-name');
    const parkDescEl = document.getElementById('park-description');
    const accommodationListEl = document.getElementById('accommodation-list');
  
    try {
      // Fetch parks to find the one matching id (if you have a dedicated endpoint, better to call that)
      const parksRes = await fetch(url + '/parks');
      const parks = await parksRes.json();
      const park = parks.find(p => p.id == parkId);
  
      if (!park) {
        parkNameEl.textContent = 'Park not found';
        accommodationListEl.innerHTML = '';
        return;
      }
  
      parkNameEl.textContent = park.name;
      parkDescEl.textContent = park.description;
  
      // Fetch accommodations for this park
      const accRes = await fetch(`${url}/parks/${parkId}/accommodations`);
      const accommodations = await accRes.json();
  
      if (!accommodations.length) {
        accommodationListEl.innerHTML = '<p>No accommodations available.</p>';
        return;
      }
  
      accommodationListEl.innerHTML = accommodations.map(acc => `
        <div class="accommodation">
          <h3><a href="accommodation?id=${acc.id}">${acc.name}</a></h3>
          <p>${acc.description}</p>
          <p><strong>Beds:</strong> ${acc.beds}</p>
          <p><strong>Price per night:</strong> $${acc.price_per_night}</p>
          <div class="images">
            ${acc.images.map(img => `<img src="${img.image_url}" alt="${img.alt_text}" />`).join('')}
          </div>
        </div>
      `).join('');
  
    } catch (err) {
      parkNameEl.textContent = 'Failed to load park details';
      accommodationListEl.innerHTML = '';
      console.error(err);
    }
  }
  
  const parkId = getParkIdFromUrl();
  if (parkId) {
    loadParkDetails(parkId);
  } else {
    document.getElementById('park-name').textContent = 'No park ID specified';
    document.getElementById('accommodation-list').innerHTML = '';
  }
  