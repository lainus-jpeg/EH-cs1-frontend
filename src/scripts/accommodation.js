const url = import.meta.env.VITE_API_URL

function getAccommodationId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function loadDetails(id) {
    const nameEl = document.getElementById('accommodation-name');
    const descriptionEl = document.getElementById('accommodation-description');

    const accRes = await fetch(`${url}/parks/1/accommodations/${id}`);
    if (!accRes.ok) {
        nameEl.textContent = "Not found";
        descriptionEl.textContent = "Not found";
        return
    }
    const acc = await accRes.json();
    console.log(acc)
    nameEl.textContent = acc.name;
    descriptionEl.textContent = acc.description;
    document.getElementById('button').href = `booking?id=${id}`;

}

const id = getAccommodationId()
loadDetails(id)