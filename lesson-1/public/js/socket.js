const initSocket = () => {
    const token = localStorage.getItem(TOKEN);
    if (!token) return null;
    const socket = io("http://localhost:3000", {
        auth: {
            token: `Bearer ${token}`
        }
    });
    return socket;
}

const socket = initSocket()

socket.on("userConnection", (data) => {
    console.log(data);
})

socket.on('onlineUsers', (users) => {
    console.log(users);
})

socket.on("message", (msg) => {
    const clone = renderMsg(msg);
    elMsgContainer.append(clone);
})