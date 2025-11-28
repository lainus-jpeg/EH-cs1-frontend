// src/scripts/admin-entra-login.js
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from './msal-config.js';

let pca;

async function initializeMsal() {
  pca = new PublicClientApplication(msalConfig);
  await pca.initialize();
}

async function handleEntraLogin() {
  try {
    await initializeMsal();

    const loginResponse = await pca.loginPopup(loginRequest);
    
    if (loginResponse && loginResponse.account) {
      // User successfully logged in
      const user = loginResponse.account;
      
      // Store user info
      localStorage.setItem('admin_user', JSON.stringify({
        name: user.name,
        email: user.username,
        oid: user.localAccountId,
        loginTime: new Date().toISOString(),
      }));

      // Verify with backend (optional but recommended)
      const token = loginResponse.accessToken;
      const verified = await verifyWithBackend(token, user.email);

      if (verified) {
        console.log('Admin logged in:', user.name);
        // Redirect to admin dashboard or reload
        window.location.href = '/admin-dashboard.html';
      } else {
        alert('You are not authorized as an admin');
        await pca.logoutPopup();
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed: ' + error.message);
  }
}

async function verifyWithBackend(token, email) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    return res.ok;
  } catch (err) {
    console.error('Verification error:', err);
    return false;
  }
}

async function handleLogout() {
  try {
    await initializeMsal();
    await pca.logoutPopup();
    localStorage.removeItem('admin_user');
    window.location.href = '/admin.html';
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// Check if already logged in
async function checkAdminSession() {
  const adminUser = localStorage.getItem('admin_user');
  return adminUser ? JSON.parse(adminUser) : null;
}

export { handleEntraLogin, handleLogout, checkAdminSession };
