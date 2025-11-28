const url = import.meta.env.VITE_API_URL

const account = sessionStorage.getItem("account");
if (!account) {
  window.location.href = "/admin.html";
}
const token = sessionStorage.getItem("token");


const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const status = document.getElementById("status");

  const name = form.name.value;
  const description = form.desc.value;
  const file = form.querySelector('input[type="file"]');
  const alt_text = form.alt.value;

  try {
    const res = await fetch(url + "/admin/parks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, description})
    });
    if (!res.ok) {
      status.textContent = "ailed to create booking";
      return;
    }
    const deets = await res.json();
    const fileFormData = new FormData();
    if (file.files.length > 0) {
      fileFormData.append('file', file.files[0]);
      fileFormData.append('alt_text', alt_text);
    }
    const fileres = await fetch(url + `/admin/parks/${deets.id}/images`, {
      method: 'POST',
      body: fileFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!fileres.ok) {
      status.textContent = "image uploading failed, park is created";
      return
    }
    status.textContent = "Success";
    window.location.href = "/admin-parks";
  }
  catch (e) {
    status.textContent = "Failed " + e;
  }
})