const url = import.meta.env.VITE_API_URL

const account = sessionStorage.getItem("account");
if (!account) {
  window.location.href = "/admin.html";
}
const token = sessionStorage.getItem("token");


const form = document.getElementById("form");

function getParkIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const status = document.getElementById("status");

  const name = form.name.value;
  const description = form.desc.value;
  const file = form.querySelector('input[type="file"]');
  const alt_text = form.alt.value;
  const beds = parseInt(form.beds.value);
  const pricePerNight = parseInt(form.price.value);
  const parkId = getParkIdFromUrl();
  const active = true;

  try {
    const res = await fetch(url + `/admin/accommodations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, description, beds, pricePerNight, active, parkId})
    });
    if (!res.ok) {
      status.textContent = "failed to create accommodation";
      return;
    }
    const deets = await res.json();
    const fileFormData = new FormData();
    if (file.files.length > 0) {
      fileFormData.append('file', file.files[0]);
      fileFormData.append('alt_text', alt_text);
    }
    const fileres = await fetch(url + `/admin/accommodations/${deets.id}/images`, {
      method: 'POST',
      body: fileFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!fileres.ok) {
      status.textContent = "image uploading failed, accommodation is created";
      return
    }
    status.textContent = "Success";
    window.location.href = "/admin-accommodations";
  }
  catch (e) {
    status.textContent = "Failed " + e;
  }
})