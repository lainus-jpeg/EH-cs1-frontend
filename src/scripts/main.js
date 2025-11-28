const url = import.meta.env.VITE_API_URL

const translations = {
  en: {
    langLabel: "Nederlands",
    help: "Help",
    trips: "Trips",
    signIn: "Sign In or Join",
    whyTitle: "Why should book with us?",
    whyText: "At Fonteyn Holiday Park, we offer more than just a place to stay, we create unforgettable memories. Nestled in nature and packed with fun, our park is perfect for families, couples, and adventurers alike. Enjoy comfortable accommodations, top-notch facilities, and activities for all ages, all in one beautiful location. Book directly with us for the best rates, exclusive deals, and a warm welcome every time.",
    sliderTitle: "Our Locations",
    nederlandTitle: "Nederland",
    nederlandSubtitle: "Explore our extraordinary nature and seasons around the world.",
    germanyTitle: "Germany",
    germanySubtitle: "Experience culture, history, and beautiful landscapes.",
    belgiumTitle: "Belgium",
    belgiumSubtitle: "Enjoy unique adventures and unforgettable stays.",
    explore: "Explore More",
    modalTitle: "Look Up a Reservation",
    modalDesc: "Complete this form to review, modify or cancel a reservation. All fields are required.",
    modalConf: "Confirmation Number",
    modalDate: "Check-in Date",
    modalFirst: "First Name on Reservation",
    modalLast: "Last Name on Reservation",
    modalBtn: "Find Reservation",
    helpModalTitle: "Need help?",
    helpModalDesc: `Need help with your reservation? Contact us:<br>
<strong>Netherlands:</strong> +31 20 123 4567<br>
<strong>Belgium:</strong> +32 2 123 4567<br>
<strong>Germany:</strong> +49 30 12345678`,
    logout: "Logout",
    newsletterTitle: "Stay in the Loop!",
    newsletterDesc: "Enter your email to receive our park updates, offers, deals, and exclusive discounts.",
    newsletterLabel: "Email Address",
    newsletterBtn: "Subscribe",
    newsletterSuccess: "Thank you for subscribing!",
    newsletterPlaceholder: "you@email.com"
  },
  nl: {
    langLabel: "English",
    help: "Hulp",
    trips: "Reizen",
    signIn: "Inloggen of Registreren",
    whyTitle: "Waarom bij ons boeken?",
    whyText: "Bij Fonteyn Holiday Park bieden we meer dan alleen een verblijf; we creëren onvergetelijke herinneringen. Gelegen in de natuur en vol plezier, is ons park perfect voor gezinnen, koppels en avonturiers. Geniet van comfortabele accommodaties, uitstekende faciliteiten en activiteiten voor alle leeftijden, allemaal op één prachtige locatie. Boek direct bij ons voor de beste prijzen, exclusieve deals en een warm welkom, elke keer weer.",
    sliderTitle: "Onze Locaties",
    nederlandTitle: "Nederland",
    nederlandSubtitle: "Ontdek onze bijzondere natuur en seizoenen over de hele wereld.",
    germanyTitle: "Duitsland",
    germanySubtitle: "Ervaar cultuur, geschiedenis en prachtige landschappen.",
    belgiumTitle: "België",
    belgiumSubtitle: "Geniet van unieke avonturen en onvergetelijke verblijven.",
    explore: "Ontdek Meer",
    modalTitle: "Reservering Opzoeken",
    modalDesc: "Vul dit formulier in om een reservering te bekijken, wijzigen of annuleren. Alle velden zijn verplicht.",
    modalConf: "Bevestigingsnummer",
    modalDate: "Incheckdatum",
    modalFirst: "Voornaam op reservering",
    modalLast: "Achternaam op reservering",
    modalBtn: "Reservering Zoeken",
    helpModalTitle: "Hulp nodig?",
    helpModalDesc: `Hulp nodig bij uw reservering? Neem contact op:<br>
<strong>Nederland:</strong> +31 20 123 4567<br>
<strong>België:</strong> +32 2 123 4567<br>
<strong>Duitsland:</strong> +49 30 12345678`,
    logout: "Uitloggen",
    newsletterTitle: "Blijf op de hoogte!",
    newsletterDesc: "Vul je e-mailadres in om updates, aanbiedingen, deals en exclusieve kortingen van ons park te ontvangen.",
    newsletterLabel: "E-mailadres",
    newsletterBtn: "Aanmelden",
    newsletterSuccess: "Bedankt voor je aanmelding!",
    newsletterPlaceholder: "jij@email.com"
  }
};
let currentLang = localStorage.getItem('lang') || 'en';
function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.getElementById('lang-label').textContent = translations[lang].langLabel;
  const quickLinks = document.querySelectorAll('.quick-link');
  quickLinks[0].querySelector('span:last-child').textContent = translations[lang].help;
  quickLinks[2].querySelector('span:last-child').textContent = translations[lang].trips;
  document.getElementById('login-text').textContent = translations[lang].signIn;
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.textContent = translations[lang].logout;
  document.querySelector('.why-book-with-us-content h2').textContent = translations[lang].whyTitle;
  document.querySelector('.why-book-with-us-content p').textContent = translations[lang].whyText;
  document.querySelector('.slider-title').textContent = translations[lang].sliderTitle;
  document.querySelector('#reservation-modal h2').textContent = translations[lang].modalTitle;
  document.querySelector('#reservation-modal p').textContent = translations[lang].modalDesc;
  const modalLabels = document.querySelectorAll('#reservation-modal label');
  if (modalLabels.length === 4) {
    modalLabels[0].childNodes[0].nodeValue = translations[lang].modalConf + "\n";
    modalLabels[1].childNodes[0].nodeValue = translations[lang].modalDate + "\n";
    modalLabels[2].childNodes[0].nodeValue = translations[lang].modalFirst + "\n";
    modalLabels[3].childNodes[0].nodeValue = translations[lang].modalLast + "\n";
  }
  document.querySelector('#reservation-modal .find-res-btn').textContent = translations[lang].modalBtn;
  document.getElementById('help-modal-title').textContent = translations[lang].helpModalTitle;
  document.getElementById('help-modal-desc').innerHTML = translations[lang].helpModalDesc;
}

document.addEventListener('DOMContentLoaded', function() {
  updateLanguage(currentLang);
  document.getElementById('lang-toggle').addEventListener('click', function() {
    const newLang = currentLang === 'en' ? 'nl' : 'en';
    updateLanguage(newLang);
  });
  document.querySelectorAll('.quick-link').forEach(link => {
    if (link.textContent.trim().toLowerCase().includes('trips') || link.textContent.trim().toLowerCase().includes('reizen')) {
      link.addEventListener('click', function() {
        document.getElementById('reservation-modal').style.display = 'flex';
      });
    }
    if (link.textContent.trim().toLowerCase().includes('help') || link.textContent.trim().toLowerCase().includes('hulp')) {
      link.addEventListener('click', function() {
        document.getElementById('help-modal').style.display = 'flex';
      });
    }
  });
  document.getElementById('close-modal').onclick = function() {
    document.getElementById('reservation-modal').style.display = 'none';
  };
  document.getElementById('reservation-modal').onclick = function(e) {
    if (e.target === this) this.style.display = 'none';
  };
  document.getElementById('close-help-modal').onclick = function() {
    document.getElementById('help-modal').style.display = 'none';
  };
  document.getElementById('help-modal').onclick = function(e) {
    if (e.target === this) this.style.display = 'none';
  };
  const cookieBar = document.getElementById('cookie-bar');
  const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
  const cookieDeclineBtn = document.getElementById('cookie-decline-btn');
  const cookieBarText = document.getElementById('cookie-bar-text');
  const cookieTexts = {
    en: "This website uses cookies to ensure you get the best experience.",
    nl: "Deze website gebruikt cookies om ervoor te zorgen dat u de beste ervaring krijgt."
  };
  const acceptTexts = {
    en: "Accept",
    nl: "Accepteren"
  };
  const declineTexts = {
    en: "Decline",
    nl: "Weigeren"
  };
  if (!localStorage.getItem('cookieAccepted') && !localStorage.getItem('cookieDeclined')) {
    cookieBar.style.display = 'flex';
  }
  cookieAcceptBtn.onclick = function() {
    localStorage.setItem('cookieAccepted', 'yes');
    cookieBar.style.display = 'none';
  };
  cookieDeclineBtn.onclick = function() {
    localStorage.setItem('cookieDeclined', 'yes');
    cookieBar.style.display = 'none';
  };
  function updateCookieBar(lang) {
    cookieBarText.textContent = cookieTexts[lang] || cookieTexts.en;
    cookieAcceptBtn.textContent = acceptTexts[lang] || acceptTexts.en;
    cookieDeclineBtn.textContent = declineTexts[lang] || declineTexts.en;
  }
  updateCookieBar(currentLang);
  const origUpdateLanguage = updateLanguage;
  updateLanguage = function(lang) {
    origUpdateLanguage(lang);
    updateCookieBar(lang);
  };

  // Swiper initialization
  const swiper = new Swiper('.swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 60,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      900: {
        coverflowEffect: {
          stretch: 100,
          depth: 250,
        }
      },
      1200: {
        coverflowEffect: {
          stretch: 150,
          depth: 300,
        }
      }
    }
  });

  // Newsletter modal logic
  const newsletterBtn = document.getElementById('newsletter-btn');
  const newsletterModal = document.getElementById('newsletter-modal');
  const closeNewsletterModal = document.getElementById('close-newsletter-modal');
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterTitle = newsletterModal ? newsletterModal.querySelector('h2') : null;
  const newsletterDesc = newsletterModal ? newsletterModal.querySelector('p') : null;
  const newsletterLabel = newsletterModal ? newsletterModal.querySelector('label[for="newsletter-email"]') : null;
  const newsletterSubmit = newsletterModal ? newsletterModal.querySelector('button[type="submit"]') : null;

  function updateNewsletterModal(lang) {
    if (!newsletterModal) return;
    if (newsletterTitle) newsletterTitle.textContent = translations[lang].newsletterTitle || "Stay in the Loop!";
    if (newsletterDesc) newsletterDesc.textContent = translations[lang].newsletterDesc || "Enter your email to receive our park updates, offers, deals, and exclusive discounts.";
    if (newsletterLabel) newsletterLabel.textContent = translations[lang].newsletterLabel || "Email Address";
    if (newsletterSubmit) newsletterSubmit.textContent = translations[lang].newsletterBtn || "Subscribe";
    if (newsletterSuccess) newsletterSuccess.textContent = translations[lang].newsletterSuccess || "Thank you for subscribing!";
    if (newsletterEmail) newsletterEmail.placeholder = translations[lang].newsletterPlaceholder || "you@email.com";
  }

  if (newsletterBtn && newsletterModal && closeNewsletterModal && newsletterForm && newsletterSuccess && newsletterEmail) {
    newsletterBtn.addEventListener('click', function() {
      newsletterModal.style.display = 'flex';
      newsletterSuccess.style.display = 'none';
      newsletterForm.style.display = 'block';
      newsletterEmail.value = '';
      updateNewsletterModal(currentLang);
    });

    closeNewsletterModal.addEventListener('click', function() {
      newsletterModal.style.display = 'none';
    });

    newsletterModal.addEventListener('click', function(e) {
      if (e.target === newsletterModal) {
        newsletterModal.style.display = 'none';
      }
    });

    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      newsletterForm.style.display = 'none';
      newsletterSuccess.style.display = 'block';
    });
  }

  // Auth buttons
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const signInBtn = document.getElementById('sign-in-btn');
  const logoutBtn = document.getElementById('logout-btn');
  if (isLoggedIn) {
    if (signInBtn) signInBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
  }
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedIn');
      window.location.reload();
    });
  }
});



async function loadParksForSlider() {
  const sliderWrapper = document.querySelector('.swiper-wrapper');
  try {
    const res = await fetch(url + '/parks');
    const parks = await res.json();
    sliderWrapper.innerHTML = parks.map(park => `
      <div class="swiper-slide expanding-slide">
        <div class="slide-overlay"></div>
        <div class="slide-content">
          <h2 class="slide-title">${park.name}</h2>
          <p class="slide-subtitle">${park.description}</p>
          <a href="park.html?id=${park.id}" class="slide-btn">Explore More</a>
          <div class="images">
            ${park.images && park.images.length ? `<img src="${park.images[0].image_url}" alt="${park.images[0].alt_text}"/>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    sliderWrapper.innerHTML = '<p>Failed to load parks.</p>';
    console.error(err);
  }
}
loadParksForSlider();
