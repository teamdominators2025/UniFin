/* ===============================
   API CONFIG
   =============================== */
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const API_BASE = isLocalhost
  ? "http://localhost:5000"
  : "https://unifin-7.onrender.com";

console.log("API_BASE:", API_BASE);
console.log("UniFin Platform Loaded");

/* =========================================
   1. MULTILINGUAL TRANSLATION DATA
   ========================================= */
const translations = {
  /* your translations object here */
};

/* =========================================
   2. LANGUAGE SWITCHING LOGIC
   ========================================= */
function changeLanguage() {
  const langSelect = document.getElementById("langSelect");
  if (!langSelect) return;

  const selectedLang = langSelect.value;
  document.body.setAttribute("dir", selectedLang === "ur" ? "rtl" : "ltr");

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[selectedLang]?.[key]) {
      el.innerText = translations[selectedLang][key];
    }
  });

  localStorage.setItem("preferredLang", selectedLang);
}

/* =========================================
   3. INITIALIZATION
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Restore language
  const savedLang = localStorage.getItem("preferredLang") || "en";
  const langSelect = document.getElementById("langSelect");
  if (langSelect) {
    langSelect.value = savedLang;
    changeLanguage();
  }

  initThreeJS();
  initParallax();

  // Reveal animation
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("show-element");
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".hidden-element").forEach(el => observer.observe(el));

  // Mobile menu
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");

  if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
      navList.classList.toggle("active");
    });
  }

  // Smooth scrolling
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth"
          });
        }
      }
    });
  });
});

/* =========================================
   4. VISUAL EFFECTS
   ========================================= */
function initParallax() {
  const shapes = [
    { el: document.querySelector(".shape-1"), speed: 0.2 },
    { el: document.querySelector(".shape-2"), speed: -0.15 },
    { el: document.querySelector(".shape-3"), speed: 0.1 }
  ];

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    shapes.forEach(s => {
      if (s.el) s.el.style.transform = `translateY(${y * s.speed}px)`;
    });
  });
}

function initThreeJS() {
  const container = document.getElementById("three-js-background");
  if (!container || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < 600; i++) {
    positions.push(
      (Math.random() - 0.5) * 150,
      (Math.random() - 0.5) * 150,
      (Math.random() - 0.5) * 100
    );
  }

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x6366f1,
    size: 1.5,
    transparent: true,
    opacity: 0.6
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  animate();
}

/* =========================================
   5. 🔐 PHISHING LINK ANALYZER
   ========================================= */
async function analyzeLink() {
  const linkInputEl = document.getElementById("linkInput");
  const resultBox = document.getElementById("result");

  if (!linkInputEl || !resultBox) return;

  const url = linkInputEl.value.trim();
  if (!url) {
    resultBox.innerText = "⚠️ Please enter a URL";
    return;
  }

  resultBox.innerText = "🛡️ Analyzing link...";

  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 15000); // 15s timeout

    const response = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    resultBox.innerText = data.message || "✅ Analysis completed";

  } catch (error) {
    console.error("Fetch error:", error);

    if (error.name === "AbortError") {
      resultBox.innerText = "❌ Backend timeout (Render may be asleep)";
    } else {
      resultBox.innerText = "❌ Error connecting to backend. Backend not reachable.";
    }
  }
}




    
