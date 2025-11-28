const url = import.meta.env.VITE_API_URL

export async function checkAuth() {
    const res = await fetch(url + '/me', {
        credentials: 'include'
    });

    if (res.status != 200) {
        window.location.href = '/login.html';
    }
}