const url = import.meta.env.VITE_API_URL

async function checkLogin() {
    const res = await fetch(url + '/me', {
        credentials: 'include',
   })
   .then(response => {
    if (response.ok) {
        return true
    } else {
        return false
    }
   });
}

button = document.getElementById('button');
if (!await checkLogin()) {
    button.textContent = 'Log out';
    button.addEventListener('onClick', async (e) => {
        window.location.href = '/';
    })
} else {
    button.addEventListener('onClick', async (e) => {
        window.location.href = '/login';
    })
}