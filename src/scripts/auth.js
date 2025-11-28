function updateAuthButtons() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const signInBtn = document.getElementById('sign-in-btn');
  const logoutBtn = document.getElementById('logout-btn');
  if (isLoggedIn) {
    if (signInBtn) signInBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
  } else {
    if (signInBtn) signInBtn.style.display = 'inline-block';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateAuthButtons();
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('loggedIn');
      updateAuthButtons();
      window.location.reload();
    });
  }
});