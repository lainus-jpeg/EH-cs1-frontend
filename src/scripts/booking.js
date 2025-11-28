import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { checkAuth } from "./utils/checkauth";

const url = import.meta.env.VITE_API_URL

function getAccommodationIdfromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadAccommodationDetails(accId) {
  const accNameEl = document.getElementById("acc-name");
  const accDescEl = document.getElementById("acc-desc");
  const submitButton = document.getElementById("submit-button");
  submitButton.disabled = true;

  try {
    const accRes = await fetch(
      `${url}/parks/1/accommodations/${accId}`
    );
    if (!accRes.ok) {
      accNameEl.textContent = "accommodation not found";
      return;
    }
    const acc = await accRes.json();
    accNameEl.textContent = "Create a booking for " + acc.name;
    accDescEl.textContent = acc.description;
    submitButton.disabled = false;
  } catch (e) {
    accNameEl.textContent = "failed to fetch accommodation details";
    console.log(e);
  }
}

async function fetchUnavailableDates(id, year, month) {
  const response = await fetch(
    `${url}/availability/${id}?year=${year}&month=${month}`
  );
  if (!response.ok) throw new Error("failed to fetch available days");
  const data = await response.json();
  let out = [];
  for (const date of data) {
    if (!date.available) {
      out.push(date.date);
    }
  }
  return out;
}
const form = document.getElementById('book-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const daterange = form.datepicker.value;
    const dates = daterange.split(" to ");

    const startDate = dates[0];
    const endDate = dates[1];
    const accommodationId = accId;

    const status = document.getElementById('status');

    try {
        const res = await fetch(url + '/bookings', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({accommodationId, startDate, endDate}),
        });
        if (!res.ok) {
            const {error} = await res.json();
            status.textContent = `failed to create booking!!! ${error}`;
            return;
        }
        const details = await res.json();
        status.textContent = "successs!!";
        window.location.href = `/booked?id=${details.id}`;
    } catch(e) {
        console.log(e);
        status.textContent = "Failed :("
    }

        // Send webhook notification
        fetch('https://fonteyn.free.beeceptor.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'booking',
            message: 'A new booking was made!',
            timestamp: new Date().toISOString()
          })
        });
});

let fpInstance;

async function updateDisabledDates(id, year, month) {
  try {
    const disabledDates = await fetchUnavailableDates(id, year, month);
    fpInstance.set("disable", disabledDates);
  } catch (e) {
    console.log("error", e);
  }
}

checkAuth();
const accId = getAccommodationIdfromUrl();
if (accId) {
  loadAccommodationDetails(accId);
  fpInstance = flatpickr("#datepicker", {
    mode: "range",
    disable: [],
    onReady: function (selectedDates, dateStr, instance) {
      const currentYear = instance.currentYear;
      const currentMonth = instance.currentMonth + 1;
      updateDisabledDates(accId, currentYear, currentMonth);
    },
    onMonthChange: function (selectedDates, dateStr, instance) {
      const currentYear = instance.currentYear;
      const currentMonth = instance.currentMonth + 1;
      updateDisabledDates(accId, currentYear, currentMonth);
    },
  });
} else {
  document.getElementById("acc-name").textContent =
    "no accommodation ID specified";
}
