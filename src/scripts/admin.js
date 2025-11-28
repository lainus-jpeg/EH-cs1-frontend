import { PublicClientApplication } from "@azure/msal-browser";

const clientId = import.meta.env.VITE_CLIENT_ID
const tenantId = import.meta.env.VITE_TENANT_ID
const apiUrl = import.meta.env.VITE_API_URL

const msalConfig = {
  auth: {
    clientId: clientId, 
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: window.location.href,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  }
};

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

const loginRequest = {
  scopes: ["openid", "profile", "email"],
};

document.getElementById("login-btn").addEventListener("click", async () => {
  try {
    const result = await msalInstance.loginPopup(loginRequest);
    
    if (result && result.account) {
      const user = result.account;
      console.log("User logged in:", user);
      
      // Store user info
      localStorage.setItem('admin_user', JSON.stringify({
        name: user.name,
        email: user.username,
        oid: user.localAccountId,
      }));

      // Get access token for ID token verification
      try {
        console.log('📝 Requesting token with scopes:', loginRequest);
        const tokenResponse = await msalInstance.acquireTokenSilent({
          ...loginRequest,
          account: result.account
        });

        console.log('✅ Token acquired successfully');
        console.log('📤 Sending verification request to:', `${apiUrl}/auth/verify-admin`);
        console.log('👤 Email:', user.username);

        // Verify with backend
        const response = await fetch(`${apiUrl}/auth/verify-admin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenResponse.accessToken}`,
          },
          body: JSON.stringify({ email: user.username }),
        });

        console.log('📨 Backend response status:', response.status);
        const responseData = await response.json();
        console.log('📨 Backend response:', responseData);

        if (response.ok) {
          document.getElementById("status").textContent = `Welcome, ${user.name}!`;
          setTimeout(() => {
            window.location.href = '/admin-dashboard.html';
          }, 1000);
        } else {
          document.getElementById("status").textContent = 'You are not authorized as an admin';
          await msalInstance.logoutPopup();
        }
      } catch (tokenError) {
        console.error('❌ Token error:', tokenError);
        console.error('❌ Error message:', tokenError.message);
        console.error('❌ Error details:', tokenError);
        document.getElementById("status").textContent = 'Failed to verify admin status';
      }
    }
  } catch (error) {
    console.error("Login failed:", error);
    document.getElementById("status").textContent = `Login failed: ${error.message}`;
  }
});
