const url = import.meta.env.VITE_API_URL

function getId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function getAccName(id) {
    const res = await fetch(`${url}/parks/1/accommodations/${id}`);
    const deets = await res.json();
    return deets.name;
}

async function loadBookingDetails(id) {
    const idEl = document.getElementById("id");
    const accNameEl = document.getElementById("acc-name");
    const dateEl = document.getElementById("dates");

    idEl.textContent = id;

    const bookingRes = await fetch(`${url}/bookings/${id}`, {
        credentials: "include",
    });
    if (!bookingRes.ok) {
        accNameEl.textContent = "Not found";
        return
    } 
    const bookingDetails = await bookingRes.json();
    console.log(bookingDetails)
    accNameEl.textContent =await getAccName(bookingDetails.accommodation_id);
    dateEl.textContent = `${bookingDetails.start_date} - ${bookingDetails.end_date}`;

}

loadBookingDetails(getId())