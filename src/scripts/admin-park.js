const url = import.meta.env.VITE_API_URL

async function loadAllParksAndAccommodations() {
  const parkContainerEl = document.getElementById('parks-container');

  try {
    // Fetch all parks
    const parksRes = await fetch(url + '/parks');
    const parks = await parksRes.json();

    if (!parks.length) {
      parkContainerEl.innerHTML = '<p>No parks found.</p>';
      return;
    }

    // Iterate through each park
    for (const park of parks) {
      // Create park section
      const parkSection = document.createElement('section');
      parkSection.classList.add('park-section');

      const parkNameEl = document.createElement('h2');
      parkNameEl.textContent = park.name;

      const parkDescEl = document.createElement('p');
      parkDescEl.textContent = park.description;

      const accommodationListEl = document.createElement('div');
      accommodationListEl.classList.add('accommodation-list');
      accommodationListEl.innerHTML = '<p>Loading accommodations...</p>';

      parkSection.appendChild(parkNameEl);
      parkSection.appendChild(parkDescEl);
      parkSection.appendChild(accommodationListEl);
      parkContainerEl.appendChild(parkSection);

      // Fetch accommodations for the current park
      try {
        const accRes = await fetch(`${url}/parks/${park.id}/accommodations`);
        const accommodations = await accRes.json();

        if (!accommodations.length) {
          accommodationListEl.innerHTML = '<p>No accommodations available. ' + `<a href="admin-addacc?id=${park.id}">Add a new accommodation for this park</a></p>`;
        } else {
            accommodationListEl.innerHTML = accommodations.map(acc => `
            <div class="accommodation">
              <h3>${acc.name}</h3>
              <p>${acc.description}</p>
              <p><strong>Beds:</strong> ${acc.beds}</p>
              <p><strong>Price per night:</strong> $${acc.price_per_night}</p>
              <div class="images">
                ${acc.images.map(img => `<img src="${img.image_url}" alt="${img.alt_text}" />`).join('')}
              </div>
            </div>
            `).join('') + `<a href="admin-addacc?id=${park.id}">Add a new accommodation for this park</a>`;
        }
      } catch (accErr) {
        accommodationListEl.innerHTML = '<p>Failed to load accommodations.</p>';
        console.error(`Error fetching accommodations for park ${park.id}`, accErr);
      }
    }

  } catch (err) {
    parkContainerEl.innerHTML = '<p>Failed to load park details.</p>';
    console.error('Error fetching parks:', err);
  }
}

// Call the function
loadAllParksAndAccommodations();
