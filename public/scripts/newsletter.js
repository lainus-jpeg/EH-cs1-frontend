document.addEventListener('DOMContentLoaded', function () {
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const newsletterEmail = document.getElementById('newsletter-email');

  // Backend URL - Use relative path so it routes through ALB
  const BACKEND_URL = '/v1/newsletter-signup';

  if (newsletterForm && newsletterEmail && newsletterSuccess) {
    newsletterForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = newsletterEmail.value.trim();

      console.log('📧 Newsletter subscription attempt:', email);

      if (!validateEmail(email)) {
        console.warn('⚠️ Invalid email format:', email);
        alert('Please enter a valid email address.');
        return;
      }

      console.log('🔄 Sending email to backend...');

      try {
        const response = await fetch(BACKEND_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        console.log('📡 Response received:', response.status, response.statusText);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Email saved successfully:', email);
          console.log('📊 Response:', data);
          newsletterForm.style.display = 'none';
          newsletterSuccess.style.display = 'block';
        } else {
          const errorData = await response.json();
          console.error('❌ Error response (HTTP', response.status + '):', errorData);
          alert('Failed to subscribe: ' + (errorData.error || 'Please try again later.'));
        }
      } catch (error) {
        console.error('❌ Network error submitting email:', error);
        console.error('Error details:', error.message, error.stack);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
