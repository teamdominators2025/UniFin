/* --- TESTING UTILS --- */
function toggleTestPanel() {
    const panel = document.getElementById('testPanel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

function copyValue(val) {
    navigator.clipboard.writeText(val).then(() => {
        const temp = document.createElement('div');
        temp.style = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background: #333; color:white; padding:10px 20px; border-radius:50px; z-index:9999;";
        temp.innerText = "Text Copied!";
        document.body.appendChild(temp);
        setTimeout(() => temp.remove(), 2000);
    });
}

/* --- VANTA TECH BACKGROUND --- */
VANTA.NET({
    el: "#vanta-canvas",
    mouseControls: true, touchControls: true, gyroControls: false,
    minHeight: 200.00, minWidth: 200.00, scale: 1.00, scaleMobile: 1.00,
    color: 0x0a4cff, backgroundColor: 0xf8fbff, points: 12.00, maxDistance: 22.00, spacing: 16.00
});

/* --- MAP DATA --- */
var map = L.map('map').setView([22.9734, 78.6569], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const states = [
    {n: "Andhra Pradesh", lat: 15.91, lng: 79.74, r: "Med", c: "orange"},
    {n: "Arunachal", lat: 28.21, lng: 94.72, r: "Low", c: "green"},
    {n: "Assam", lat: 26.20, lng: 92.93, r: "Med", c: "orange"},
    {n: "Bihar", lat: 25.09, lng: 85.31, r: "High", c: "red"},
    {n: "Chhattisgarh", lat: 21.27, lng: 81.86, r: "Med", c: "orange"},
    {n: "Goa", lat: 15.29, lng: 74.12, r: "Low", c: "green"},
    {n: "Gujarat", lat: 22.25, lng: 71.19, r: "Med", c: "orange"},
    {n: "Haryana", lat: 29.05, lng: 76.08, r: "High", c: "red"},
    {n: "Himachal", lat: 31.10, lng: 77.17, r: "Low", c: "green"},
    {n: "Jharkhand", lat: 23.61, lng: 85.27, r: "High", c: "red"},
    {n: "Karnataka", lat: 15.31, lng: 75.71, r: "High", c: "red"},
    {n: "Kerala", lat: 10.85, lng: 76.27, r: "Low", c: "green"},
    {n: "Madhya Pradesh", lat: 22.97, lng: 78.65, r: "Med", c: "orange"},
    {n: "Maharashtra", lat: 19.75, lng: 75.71, r: "High", c: "red"},
    {n: "Manipur", lat: 24.66, lng: 93.90, r: "Low", c: "green"},
    {n: "Meghalaya", lat: 25.46, lng: 91.36, r: "Low", c: "green"},
    {n: "Mizoram", lat: 23.16, lng: 92.93, r: "Low", c: "green"},
    {n: "Nagaland", lat: 26.15, lng: 94.56, r: "Low", c: "green"},
    {n: "Odisha", lat: 20.95, lng: 85.09, r: "Med", c: "orange"},
    {n: "Punjab", lat: 31.14, lng: 75.34, r: "Med", c: "orange"},
    {n: "Rajasthan", lat: 27.02, lng: 74.21, r: "High", c: "red"},
    {n: "Sikkim", lat: 27.53, lng: 88.51, r: "Low", c: "green"},
    {n: "Tamil Nadu", lat: 11.12, lng: 78.65, r: "Med", c: "orange"},
    {n: "Telangana", lat: 18.11, lng: 79.01, r: "High", c: "red"},
    {n: "Tripura", lat: 23.94, lng: 91.98, r: "Low", c: "green"},
    {n: "Uttar Pradesh", lat: 26.84, lng: 80.94, r: "High", c: "red"},
    {n: "Uttarakhand", lat: 30.06, lng: 79.01, r: "Low", c: "green"},
    {n: "West Bengal", lat: 22.98, lng: 87.85, r: "High", c: "red"}
];

states.forEach(s => {
    L.circle([s.lat, s.lng], { color: s.c, radius: 55000, fillOpacity: 0.5 }).addTo(map)
    .bindPopup(`<b>${s.n}</b><br>Cyber Risk Level: ${s.r}`);
});

let currentLang = 'en';
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${currentLang}`);
    });
}

/* --- SCAM LOGIC --- */
const SCAM_KEYWORDS = ["pin", "cashback", "refund", "lottery", "prize", "approve", "winner", "reward"];
const PHISHING_DOMAINS = ["bit.ly", "tinyurl.com", "t.co", "kyc-update", "rbi-safety", "gpay-reward", "customer-care-helpline"];

function checkURL() {
    const url = document.getElementById("urlInput").value.trim();
    const res = document.getElementById("urlResult");
    if (!url) { res.innerHTML = "❌ Please enter a URL."; res.style.color = "orange"; return; }
    const lower = url.toLowerCase();
    const isPhishing = PHISHING_DOMAINS.some(d => lower.includes(d));
    const isInsecure = lower.startsWith("http://");

    if (isPhishing || isInsecure) {
        res.innerHTML = "🚨 CRITICAL: This link is suspicious. It uses insecure HTTP or a known phishing domain.";
        res.style.color = "red";
    } else {
        res.innerHTML = "✅ URL appears safe, but always verify the sender before clicking.";
        res.style.color = "green";
    }
}

function checkUPI() {
    const upiId = document.getElementById("upiId").value.toLowerCase();
    const message = document.getElementById("upiMsg").value.toLowerCase();
    const res = document.getElementById("upiResult");
    if (!upiId && !message) { res.innerHTML = "❌ Please enter UPI ID or message."; res.style.color = "orange"; return; }
    const triggers = SCAM_KEYWORDS.filter(word => message.includes(word));
    const suspiciousId = upiId.includes("refund") || upiId.includes("support") || upiId.includes("care") || upiId.includes("helpline");

    if (triggers.length > 0 || suspiciousId) {
        res.innerHTML = "🚨 FRAUD TRIGGER: Scam indicators detected — never share UPI PIN or approve unknown requests.";
        res.style.color = "red";
    } else {
        res.innerHTML = "✅ No obvious fraud indicators found.";
        res.style.color = "green";
    }
}

function scanQR(event) {
    const file = event.target.files[0];
    const res = document.getElementById("qrResult");
    if (!file) return;
    res.innerHTML = "🔍 Scanning QR...";
    res.style.color = "black";
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width; canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (!code) { res.innerHTML = "❌ No QR code detected."; res.style.color = "orange"; return; }
            const content = code.data.toLowerCase();
            if (content.includes("upi://pay")) {
                res.innerHTML = "🚨 PAYMENT TRAP: This QR will SEND money, not receive it.";
                res.style.color = "red";
            } else {
                res.innerHTML = "✅ QR does not contain a direct UPI payment request.";
                res.style.color = "green";
            }
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}