// --- DATA ARCHITECTURE ---

// Accepted Connections
const chats = [
    { id: 1, name: 'Jessica Griffin', message: 'typing...', time: '11:25 AM', avatar: 'https://i.pravatar.cc/150?u=jessica', status: 'online', unread: 0, isTyping: true, isAccepted: true },
    { id: 2, name: 'Boss Clintzy', message: 'The mobile site is live! 🍊', time: '12:45 AM', avatar: 'https://i.pravatar.cc/150?u=clint', status: 'online', unread: 1, isTyping: false, isAccepted: true },
    { id: 3, name: 'AfriDev Team', message: 'Ada: We need to finalize...', time: '10:45 AM', avatar: 'https://i.pravatar.cc/150?u=team', status: 'away', unread: 27, isTyping: false, isAccepted: true }
];

// IG-Style Message Requests
const messageRequests = [
    { id: 101, name: 'Shadow_Rec', message: 'Wants to send a Wave', avatar: 'https://i.pravatar.cc/150?u=unknown' }
];

// Security Blacklist
const blockedUsers = []; 

// --- 1. PRIVACY & MODERATION ENGINE ---

/**
 * Restricts a user from interacting with the profile.
 * Removes them from all active views.
 */
function blockUser(userId, name) {
    const confirmation = confirm(`Restrict ${name}? They will no longer be able to send you Waves or find your Pulse.`);
    
    if (confirmation) {
        blockedUsers.push(userId);
        
        // 1. Purge from Accepted Chats
        const chatIndex = chats.findIndex(c => c.id === userId);
        if (chatIndex > -1) chats.splice(chatIndex, 1);
        
        // 2. Purge from Message Requests
        const reqIndex = messageRequests.findIndex(r => r.id === userId);
        if (reqIndex > -1) messageRequests.splice(reqIndex, 1);
        
        // Refresh UI
        renderChats();
        updateRequestPanel();
        
        alert(`${name} has been added to the Blocked Vault.`);
        console.log(`Security: User ${userId} blacklisted.`);
    }
}

/**
 * Updates the Request Panel visibility based on available requests
 */
function updateRequestPanel() {
    const panel = document.getElementById('requests-panel');
    const countEl = document.getElementById('req-count');
    
    if (countEl) countEl.innerText = messageRequests.length;
    
    if (messageRequests.length === 0 && panel) {
        panel.classList.add('hidden');
    }
}

// --- 2. CORE UTILITIES (CAMERA & CALLS) ---

async function openCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Pulse Viewfinder: Active");
        // Logic to attach stream to a UI element would go here
        stream.getTracks().forEach(track => track.stop()); 
    } catch (err) {
        alert("Pulse Engine Error: Camera access is required for Waves.");
    }
}

function startCall(type, name) {
    const icon = type === 'video' ? '📹' : '📞';
    alert(`${icon} Initializing E2E Encrypted ${type} call with ${name}...`);
}

// --- 3. RENDER ENGINE ---

/**
 * Renders the chat list with filters for search and blocked status
 */
function renderChats(filter = "") {
    const chatListContainer = document.getElementById('active-chats') || document.getElementById('chat-list');
    if (!chatListContainer) return;

    // Filter Logic: Must be Accepted AND NOT Blocked
    const filtered = chats.filter(chat => 
        chat.isAccepted && 
        !blockedUsers.includes(chat.id) &&
        chat.name.toLowerCase().includes(filter.toLowerCase())
    );

    chatListContainer.innerHTML = filtered.map(chat => `
        <div class="chat-row flex items-center p-4 active:bg-zinc-900 transition-all cursor-pointer border-b border-white/5" onclick="openConversation(${chat.id})">
            <div class="relative flex-shrink-0">
                <div class="w-14 h-14 rounded-2xl p-0.5 ${chat.status === 'online' ? 'bg-[#F57C00]' : 'bg-zinc-700'}">
                    <img src="${chat.avatar}" class="w-full h-full rounded-2xl bg-black border-2 border-black object-cover">
                </div>
                ${chat.status === 'online' ? '<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>' : ''}
            </div>
            <div class="ml-4 flex-1">
                <div class="flex justify-between items-center mb-1">
                    <h3 class="font-bold text-white text-sm">${chat.name}</h3>
                    <span class="text-zinc-500 text-[10px] font-black uppercase">${chat.time}</span>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-xs truncate ${chat.isTyping ? 'text-[#F57C00] font-bold' : 'text-zinc-500'}">
                        ${chat.isTyping ? 'Typing...' : chat.message}
                    </p>
                    ${chat.unread > 0 ? `<div class="bg-[#F57C00] h-4 px-1.5 rounded-md flex items-center justify-center text-[10px] font-black text-black">${chat.unread}</div>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// --- 4. CONNECTION MANAGEMENT ---

function acceptRequest(requestId) {
    const index = messageRequests.findIndex(r => r.id === requestId);
    if (index > -1 && !blockedUsers.includes(requestId)) {
        const req = messageRequests.splice(index, 1)[0];
        chats.push({
            ...req,
            time: 'Just Now',
            status: 'online',
            unread: 0,
            isTyping: false,
            isAccepted: true
        });
        
        renderChats();
        updateRequestPanel();
        alert(`Wave Connection with ${req.name} established.`);
    }
}

// --- 5. COMMUNICATION ---

function sendMessage() {
    const input = document.getElementById('msg-input');
    const container = document.getElementById('message-container');
    if (!input || !input.value.trim()) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = "flex justify-end fade-in-section mb-3";
    msgDiv.innerHTML = `
        <div class="bg-[#F57C00] text-black p-3 px-4 rounded-2xl rounded-br-none max-w-[80%] text-sm font-bold shadow-lg shadow-[#F57C00]/20">
            ${input.value}
        </div>
    `;

    container.appendChild(msgDiv);
    input.value = "";
    container.scrollTop = container.scrollHeight;
}

function openConversation(id) {
    const chat = chats.find(c => c.id === id);
    const chatWindow = document.getElementById('chat-window');
    
    if (chatWindow) {
        chatWindow.classList.remove('hidden', 'translate-x-full');
        // Logic to populate chat window with specific messages would go here
    } else {
        console.log(`Pulse: Switching to conversation with ${chat.name}`);
    }
}

// --- 6. SYSTEM INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderChats();
    updateRequestPanel();
    
    // Search Sync
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => renderChats(e.target.value));
    }

    // Lucide Icon Injection
    if (window.lucide) {
        lucide.createIcons();
    }
});
