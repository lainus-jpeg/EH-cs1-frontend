const form = document.getElementById('login-form');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const password = form.password.value;

  try {
    const res = await fetch('/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, phone }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      status.textContent = `Login failed: ${error || res.statusText}`;
      return;
    }

    // Success!
    status.textContent = 'Login successful!';
    window.location.href = '/login.html';
  } catch (err) {
    console.error(err);
    status.textContent = 'Login error';
  }
});

const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
  phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
}
