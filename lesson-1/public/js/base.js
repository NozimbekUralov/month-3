const USER = 'user';
const TOKEN = 'token';

const API_URL = 'http://localhost:3000/api';

const authHeader = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
    }
}

const getLocalStorageItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const setLocalStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
}

const checkAuth = async () => {
    const res = await fetch(`${API_URL}/user/me`, authHeader)
    const { status, data } = await res.json();
    if (status != 200) {
        localStorage.clear();
        window.location.href = '/login';
        return;
    }
    if (!data) return;
    setLocalStorage(USER, data.user);
    return data.user;
}

const getAllUsers = async () => {
    const res = await fetch(`${API_URL}/user/all`, authHeader)
    return await res.json();
}

const getMessages = async (userId) => {
    const res = await fetch(`${API_URL}/message/${userId}`, authHeader)
    return await res.json();
}

const sendMessage = async (data) => {
    const res = await fetch(`${API_URL}/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
        },
        body: JSON.stringify(data)
    })
    return await res.json();
}