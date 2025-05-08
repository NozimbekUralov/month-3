const elForm = document.querySelector('.js-form');

const login = async (data) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res.json();
}

elForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);
    const { status, data: { token } } = await login(data);
    if (status != 200) return alert('Something went wrong. Please try again.');
    localStorage.setItem(TOKEN, token);
    window.location.href = '/';
})