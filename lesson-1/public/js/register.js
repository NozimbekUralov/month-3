const elForm = document.querySelector('.js-form');

const register = async (data) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: data,
    })
    return res.json();
}

elForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    const { status } = await register(formData);
    if (status != 201) return alert('Something went wrong. Please try again.');
    window.location.href = '/login';
})
