const url = import.meta.env.VITE_API_URL

const account = sessionStorage.getItem("account");
if (!account) {
  window.location.href = "/admin.html";
}

async function loadBookings() {
  try {
    const bookingListEl = document.getElementById("booking-list");

    const token = sessionStorage.getItem("token");

    const response = await fetch(`${url}/admin/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const bookings = await response.json();
    if (!bookings.length) {
      bookingListEl.innerHTML = "<p>No bookings available</p>";
      return;
    }
    console.log(bookings);
    bookingListEl.innerHTML = bookings
      .map(
        (boo) => `
            <div class="booking">
                <h3>Accommodation ${boo.accommodation_name}</h3>
                <p>Guest information:</p><br>
                Guest Name: ${boo.guest_name}<br>
                Email ${boo.guest_email}<br>
                Phone: ${boo.guest_phone}</p>
                ${boo.cancelled ? "<p><strong>CANCELLED</strong></p>" : ""}
                <p>${boo.start_date} - ${boo.end_date}</p>
                <a href='admin-booking?id=${boo.id}'>Manage booking</a>
                </div>
            `
      )
      .join("");
  } catch (error) {
    bookingListEl.innerHTML = "failed to get bookings";
    console.log(error);
  }
}

loadBookings();
