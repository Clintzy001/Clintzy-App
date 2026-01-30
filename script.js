// ==========================================
// 1. LANGUAGE & GLOBAL STATE DICTIONARY
// ==========================================
const translations = {
    en: { settings_title: "PULSE SETTINGS", label_appearance: "Appearance", label_language: "System Language", incognito_title: "Incognito Pulse" },
    es: { settings_title: "AJUSTES DE PULSO", label_appearance: "Apariencia", label_language: "Idioma del Sistema", incognito_title: "Pulso Incógnito" },
    fr: { settings_title: "PARAMÈTRES PULSE", label_appearance: "Apparence", label_language: "Langue du Système", incognito_title: "Pulse Incognito" }
};

let currentChatType = 'private'; // Tracks if user is in 'private' or 'group' view

// ==========================================
// 2. DATA ARCHITECTURE (Social & Privacy)
// ==========================================
const chats = [
    { id: 1, name: 'Jessica Griffin', message: 'typing...', time: '11:25 AM', avatar: 'https://i.pravatar.cc/150?u=jessica', status: 'online', unread: 0, isTyping: true, isAccepted: true },
    { id: 2, name: 'Boss Clintzy', message: 'The mobile site is live! 🍊', time: '12:45 AM', avatar: 'https://i.pravatar.cc/150?u=clint', status: 'online', unread: 1, isTyping: false, isAccepted: true },
    { id: 3, name: 'AfriDev Team', message: 'Ada: We need to finalize...', time: '10:45 AM', avatar: 'https://i.pravatar.cc/150?u=team', status: 'away', unread: 27, isTyping: false, isAccepted: true }
];

const messageRequests = [
    { id: 101, name: 'Shadow_Rec', message: 'Wants to send a Wave', avatar: 'https://i.pravatar.cc/150?u=unknown' }
];

const blockedUsers = []; 

// ==========================================
// 3. THE PULSE ENGINE (Theme & Language)
// ==========================================
function setTheme(theme) {
    document.body.classList.remove('theme-oled', 'theme-grey', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
    
    if(theme === 'oled') document.body.style.backgroundColor = "#000000";
    if(theme === 'light') document.body.style.backgroundColor = "#ffffff";
    
    localStorage.setItem('pulse_theme', theme);
    
    document.querySelectorAll('#theme-selector button').forEach(btn => {
        btn.style.borderColor = btn.id === `btn-${theme}` ? '#F57C00' : 'transparent';
    });
}

function changeLanguage(lang) {
    localStorage.setItem('pulse_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

function savePrivacy(status) {
    localStorage.setItem('pulse_incognito', status);
}

// ==========================================
// 4. LIVE CHAT & GROUP LOGIC
// ==========================================

function createGroup(name, members) {
    const groupID = 'group_' + Date.now();
    const newGroup = {
        id: groupID,
        name: name,
        members: members,
        createdBy: "Me",
        type: "public"
    };
    
    const groups = JSON.parse(localStorage.getItem('pulse_groups') || '[]');
    groups.push(newGroup);
    localStorage.setItem('pulse_groups', JSON.stringify(groups));
    
    alert(`Pulse Group "${name}" is now live!`);
    navigateTo('group-page');
}

function sendLiveMessage() {
    const input = document.getElementById('msg-input');
    const content = input.value.trim();
    if(!content) return;

    const newMessage = {
        id: Date.now(),
        sender: "Me",
        senderAvatar: localStorage.getItem('user_avatar'),
        text: content,
        type: 'text',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGroup: currentChatType === 'group'
    };

    const chatHistory = JSON.parse(localStorage.getItem('pulse_history') || '[]');
    chatHistory.push(newMessage);
    localStorage.setItem('pulse_history', JSON.stringify(chatHistory));

    input.value = '';
    renderMessages();
}

function handleMediaSelect(input) {
    const preview = document.getElementById('media-preview');
    if(preview) preview.classList.remove('hidden');
    
    Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if(preview) {
                const div = document.createElement('div');
                div.className = "w-16 h-16 rounded-lg bg-cover bg-center border border-white/20";
                div.style.backgroundImage = `url(${e.target.result})`;
                preview.appendChild(div);
            }
            console.log("File ready for Pulse Upload:", file.name);
        };
        reader.readAsDataURL(file);
    });
}

function renderMessages() {
    const container = document.getElementById('message-container');
    if (!container) return;

    const history = JSON.parse(localStorage.getItem('pulse_history') || '[]');
    
    container.innerHTML = history.map(msg => `
        <div class="flex ${msg.sender === 'Me' ? 'justify-end' : 'justify-start'} mb-4">
            <div class="flex flex-col ${msg.sender === 'Me' ? 'items-end' : 'items-start'}">
                ${msg.isGroup && msg.sender !== 'Me' ? `<span class="text-[9px] font-black text-[#F57C00] mb-1 ml-2">${msg.sender}</span>` : ''}
                <div class="${msg.sender === 'Me' ? 'bg-[#F57C00] text-black font-bold' : 'bg-zinc-800 text-white'} p-3 px-4 rounded-2xl ${msg.sender === 'Me' ? 'rounded-br-none' : 'rounded-bl-none'} text-sm shadow-xl">
                    ${msg.text}
                </div>
                <span class="text-[8px] text-zinc-600 mt-1 uppercase font-black">${msg.timestamp}</span>
            </div>
        </div>
    `).join('');
    
    container.scrollTop = container.scrollHeight;
}

// ==========================================
// 5. GLOBAL NAVIGATION & UI RENDERING
// ==========================================

function renderChats(filter = "") {
    const container = document.getElementById('active-chats') || document.getElementById('chat-list');
    if (!container) return;

    const filtered = chats.filter(chat => 
        chat.isAccepted && 
        !blockedUsers.includes(chat.id) &&
        chat.name.toLowerCase().includes(filter.toLowerCase())
    );

    container.innerHTML = filtered.map(chat => `
        <div class="chat-row flex items-center p-4 active:bg-zinc-900 transition-all cursor-pointer border-b border-white/5" onclick="openConversation(${chat.id})">
            <div class="relative w-14 h-14 rounded-2xl p-0.5 ${chat.status === 'online' ? 'bg-[#F57C00]' : 'bg-zinc-700'}">
                <img src="${chat.avatar}" class="w-full h-full rounded-2xl bg-black border-2 border-black object-cover">
            </div>
            <div class="ml-4 flex-1">
                <div class="flex justify-between items-center mb-1">
                    <h3 class="font-bold text-white text-sm">${chat.name}</h3>
                    <span class="text-zinc-500 text-[10px] uppercase">${chat.time}</span>
                </div>
                <p class="text-xs ${chat.isTyping ? 'text-[#F57C00] font-bold' : 'text-zinc-500'}">
                    ${chat.isTyping ? 'Typing...' : chat.message}
                </p>
            </div>
        </div>
    `).join('');
}

function updateRequestPanel() {
    const countEl = document.getElementById('req-count');
    if (countEl) countEl.innerText = messageRequests.length;
}

function navigateTo(pageId) {
    const sections = ['home-section', 'chat-page', 'group-page', 'vault-page', 'settings-page', 'profile-page'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if(el) el.classList.add('hidden');
    });

    const target = document.getElementById(pageId);
    if(target) target.classList.remove('hidden');
    if(window.lucide) lucide.createIcons();
}

// ==========================================
// 6. SYSTEM INITIALIZATION
// ==========================================

window.addEventListener('storage', (e) => {
    if (e.key === 'pulse_history') renderMessages();
});

window.addEventListener('DOMContentLoaded', () => {
    setTheme(localStorage.getItem('pulse_theme') || 'oled');
    changeLanguage(localStorage.getItem('pulse_lang') || 'en');
    
    const savedPrivacy = localStorage.getItem('pulse_incognito') === 'true';
    if(document.getElementById('incognito-toggle')) {
        document.getElementById('incognito-toggle').checked = savedPrivacy;
    }

    renderChats();
    updateRequestPanel();
    renderMessages(); // Initial render of any existing chat history

    if (window.lucide) lucide.createIcons();
});
