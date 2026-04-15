const form = document.getElementById("login-form");
const status = document.getElementById("status");

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 5;

function getLockoutInfo() {
  const info = localStorage.getItem('loginLockout');
  return info ? JSON.parse(info) : { attempts: 0, until: 0 };
}

function setLockoutInfo(attempts, until) {
  localStorage.setItem('loginLockout', JSON.stringify({ attempts, until }));
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const now = Date.now();
  const lockout = getLockoutInfo();

  if (lockout.until && now < lockout.until) {
    const seconds = Math.ceil((lockout.until - now) / 1000);
    status.textContent = `Too many failed attempts. Try again in ${seconds} seconds.`;
    return;
  }

  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch("/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      
      let attempts = lockout.attempts + 1;
      let until = 0;
      if (attempts >= MAX_ATTEMPTS) {
        until = now + LOCKOUT_MINUTES * 60 * 1000;
        status.textContent = `Too many failed attempts. Locked for ${LOCKOUT_MINUTES} minutes.`;
      } else {
        status.textContent = `Login failed: ${error || res.statusText} (${attempts}/${MAX_ATTEMPTS})`;
      }
      setLockoutInfo(attempts, until);
      return;
    }

    localStorage.setItem('loggedIn', 'true');
    localStorage.removeItem('loginLockout'); // Reset on success
    status.textContent = "Login successful!";
    window.location.href = "/index.html";
  } catch (err) {
    console.error(err);
    status.textContent = "Login error";
  }
});
