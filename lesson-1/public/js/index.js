let CURRENT_USER = null;
(async () => {
    CURRENT_USER = await checkAuth();
})()

const elMsgReceiverTemp = document.querySelector(".js-msg-receiver-template").content;
const elMsgSenderTemp = document.querySelector(".js-msg-sender-template").content;
const elChatUserTemp = document.querySelector(".js-chat-user-temp").content;

const elMsgContainer = document.querySelector(".js-msg-container");
const elConversation = document.querySelector('.js-conversation');
const elAvatar = document.querySelector(".js-avatar");
const elChatUserContainer = document.querySelector(".js-chat-list-container");
const elSendBtn = document.querySelector(".js-send-btn");
const elMsg = document.querySelector(".js-msg");

const renderMsg = (msg) => {
    const temp = msg.fromId == CURRENT_USER.id ? elMsgSenderTemp : elMsgReceiverTemp;
    const clone = temp.cloneNode(true);
    clone.querySelector(".message-text").textContent = msg.text;
    return clone;
}

const renderMsgs = (msgs) => {
    elMsgContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    msgs.forEach(msg => {
        const clone = renderMsg(msg);
        fragment.append(clone);
    });
    elMsgContainer.append(fragment);
}

const renderChatUser = (user) => {
    const clone = elChatUserTemp.cloneNode(true);
    clone.querySelector('.js-chat-user').dataset.id = user.id;
    clone.querySelector('.js-chat-user img').src = `${API_URL}/${user.avatar}`
    clone.querySelector('.js-chat-user .name-meta').textContent = user.username;
    return clone;
}

const renderChatUsers = (users) => {
    const fragment = document.createDocumentFragment();
    users.forEach(user => {
        const clone = renderChatUser(user);
        fragment.append(clone);
    });
    elChatUserContainer.append(fragment);
}

const renderAvatar = () => {
    elAvatar.src = `${API_URL}/${CURRENT_USER.avatar}`;
}

(async () => {
    const { status, data } = await getAllUsers();
    if (status == 401) return window.location.href = '/login';
    if (!data) return;
    renderAvatar();
    renderChatUsers(data.users);
})()

elSendBtn.addEventListener("click", async (evt) => {
    const message = elMsg.value;
    const receiver = Number(elMsg.dataset.id);
    if (!message.trim() || !receiver) return;
    const msg = {
        text: message,
        fromId: CURRENT_USER.id,
        toId: receiver
    }
    const { status } = await sendMessage({ message: msg });
    if (status == 401) return window.location.href = '/login';
    if (status != 201) return alert('Something went wrong!');
    elMsgContainer.append(renderMsg(msg));
    elMsg.value = "";
    elMsg.focus();
});

elChatUserContainer.addEventListener('click', async (evt) => {
    const target = evt.target;
    if (target.classList.contains('js-chat-list-container')) return;
    const el = target.closest('.js-chat-user');
    const id = el.dataset.id;
    elConversation.querySelector(".heading-name-meta").textContent = el.querySelector(".name-meta").textContent;
    elConversation.querySelector(".js-img").src = el.querySelector("img").src;
    elConversation.querySelector(".js-msg").dataset.id = id;
    elConversation.hidden = false;
    const { status, data } = await getMessages(id);
    if (status == 401) return window.location.href = '/login';
    if (!data) return;
    renderMsgs(data.messages);
});