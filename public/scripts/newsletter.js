document.addEventListener('DOMContentLoaded', function () {
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const newsletterEmail = document.getElementById('newsletter-email');

  // Azure backend URL
  const BACKEND_URL = 'https://fonteynbackend.wittypebble-be3e1c7a.spaincentral.azurecontainerapps.io/v1/newsletter-signup';

  if (newsletterForm && newsletterEmail && newsletterSuccess) {
    newsletterForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = newsletterEmail.value.trim();

      if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      try {
        const response = await fetch(BACKEND_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        if (response.ok) {
          console.log('✅ Email saved successfully:', email);
          newsletterForm.style.display = 'none';
          newsletterSuccess.style.display = 'block';
        } else {
          const errorData = await response.json();
          console.error('❌ Error response:', errorData);
          alert('Failed to subscribe: ' + (errorData.error || 'Please try again later.'));
        }
      } catch (error) {
        console.error('Error submitting email:', error);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
