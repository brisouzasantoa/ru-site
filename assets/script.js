// Gera nome aleatório para notificação
function getRandomUsername() {
    const prefixes = ["Crypto", "Bitcoin", "Doge", "Trader", "Investor", "Miner"];
    const suffixes = ["King", "Master", "Pro", "Expert", "Guru", "Whale"];
    return "@" + prefixes[Math.floor(Math.random() * prefixes.length)] +
           suffixes[Math.floor(Math.random() * suffixes.length)] +
           Math.floor(Math.random() * 100);
}

// Notificações laterais dinâmicas
const notifications = [
    { icon: "💸", badge: "WITHDRAWAL", platform: "FaucetPay", currency: "DOGE", amount: (Math.random() * 5 + 0.5).toFixed(3) },
    { icon: "🎁", badge: "PRIZE", platform: "FreeBitco.in", currency: "BTC", amount: (Math.random() * 0.005 + 0.001).toFixed(8).replace(/\.?0+$/, "") }
];

let currentNotif = 0;

function rotateNotifications() {
    const notif = notifications[currentNotif];
    const username = getRandomUsername();
    showNotification({
        icon: notif.icon,
        badge: notif.badge,
        message: `<strong>${username}</strong> withdrew <span style='color:#FFD700'>${notif.amount} ${notif.currency}</span> via ${notif.platform}!`,
        duration: 7000
    });
    currentNotif = (currentNotif + 1) % notifications.length;
    setTimeout(rotateNotifications, 10000);
}

function showWelcomeNotification() {
    showNotification({
        icon: "👋",
        badge: "WELCOME",
        message: "Enjoy our <strong>recommended platforms</strong> to earn crypto!",
        duration: 5000
    });
}

function showNotification({ icon, badge, message, duration }) {
    const container = document.getElementById("notificationContainerTop") || document.getElementById("notificationContainerBottom");
    const notification = document.createElement("div");
    notification.className = "notification active";
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content"><span class="notification-badge">${badge}</span> ${message}</div>
    `;
    container.appendChild(notification);

    // Remove após tempo
    setTimeout(() => {
        notification.classList.add('exiting');
        setTimeout(() => notification.remove(), 400);
    }, duration);
}

// Cookie Consent
const cookieBanner = document.getElementById("cookieConsent");
if (!localStorage.getItem("cookiesAccepted")) {
    cookieBanner.style.display = "flex";
}

function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.style.display = "none";
}
