const chatData = [
    { name: 'Jessica Griffin', msg: 'The orange glow is fire! 🔥', time: '11:25 AM', online: true, unread: 1 },
    { name: 'David Adeyemi', msg: 'Check the new project file.', time: '10:10 AM', online: false, unread: 0 },
    { name: 'Clintzy Team', msg: 'Welcome to the premium era.', time: 'Yesterday', online: true, unread: 0 }
];

function renderChats() {
    const main = document.getElementById('main-content');
    main.innerHTML = chatData.map(chat => `
        <div class="chat-row" style="display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #121212;">
            <div class="avatar" style="position: relative;">
                <div style="width: 55px; height: 55px; background: #222; border-radius: 50%; border: 2px solid ${chat.online ? '#F57C00' : '#333'}"></div>
                ${chat.online ? '<div style="position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; background: #22c55e; border-radius: 50%; border: 2px solid black;"></div>' : ''}
            </div>
            <div style="margin-left: 15px; flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                    <h4 style="margin: 0; font-size: 16px;">${chat.name}</h4>
                    <span style="font-size: 10px; color: #71717a;">${chat.time}</span>
                </div>
                <p style="margin: 5px 0 0; color: #a1a1aa; font-size: 13px;">${chat.msg}</p>
            </div>
            ${chat.unread ? `<div style="background: #F57C00; height: 20px; width: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">${chat.unread}</div>` : ''}
        </div>
    `).join('');
}

// Initial Render
renderChats();
