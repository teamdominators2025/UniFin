// script.js

console.log("UniFin Platform Loaded");

/**
 * Handles clicks on the Awareness section cards.
 * @param {string} type - The type of card clicked (schemes, learning, budgeting)
 */
function handleCardClick(type) {
    switch(type) {
        case 'schemes':
            // Logic to redirect to Schemes page would go here
            alert("Redirecting to: Financial Inclusion Schemes...");
            // Example: window.location.href = "/schemes.html";
            break;
        case 'learning':
            // Logic to redirect to Gamified Learning
            alert("Opening: Gamified Financial Learning System...");
            break;
        case 'budgeting':
            // Logic to redirect to Budgeting Tools
            alert("Loading: Current Budgeting Tools...");
            break;
        default:
            console.log("Unknown selection");
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => observer.observe(el));


    // 2. Navigation Handling
    const hamburger = document.querySelector('.hamburger');
    
    hamburger.addEventListener('click', () => {
        alert("Mobile menu toggled");
    });

    // 3. Card Interaction Logic
    window.handleCardClick = function(type) {
        setTimeout(() => {
            switch(type) {
                // Awareness Section
                case 'schemes':
                    alert("Redirecting to: Financial Inclusion Schemes...");
                    break;
                case 'learning':
                    alert("Opening: Gamified Financial Learning System...");
                    break;
                case 'budgeting':
                    alert("Loading: Current Budgeting Tools...");
                    break;
                
                // Security Section
                case 'upi-shield':
                    alert("Activating: UPI Scam Shield Protocol...");
                    break;
                case 'call-threats':
                    alert("Analyzing: Call Logs via NLP...");
                    break;

                // Financial Stability Section
                case 'expense-tracker':
                    alert("Opening: Daily Expense Tracker...");
                    break;
                case 'emi-risk':
                    alert("Calculating: EMI Risk Prediction...");
                    break;
                case 'portfolio':
                    alert("Connecting: Portfolio Advisory Services...");
                    break;
                case 'health-score':
                    alert("Generating: Financial Health Score...");
                    break;

                default:
                    console.log("Unknown selection");
            }
        }, 100);
    };

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Reveal on Scroll Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden-element').forEach((el) => observer.observe(el));

    // 2. Click Handler for Feature Boxes
    window.handleCardClick = function(type) {
        const featureMap = {
            'schemes': 'Financial Inclusion Schemes Hub',
            'learning': 'Gamified Financial Learning Portal',
            'budgeting': 'Personalized Budgeting Dashboard',
            'upi-shield': 'UPI Transaction Security Shield',
            'call-threats': 'NLP Voice Scam Detection',
            'expense-tracker': 'Automated Expense Tracker',
            'emi-risk': 'EMI Default Risk Calculator',
            'portfolio': 'Smart Portfolio Advisory',
            'health-score': 'Your Financial Health Report'
        };
        
        console.log(`Accessing ${featureMap[type]}...`);
        alert(`Redirecting to: ${featureMap[type]}`);
    };

    // 3. Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
// script.js
console.log("UniFin Platform Loaded");

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Reveal on Scroll Animation (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            }
        });
    }, { threshold: 0.1 });

    // Select all hidden elements to observe
    document.querySelectorAll('.hidden-element').forEach((el) => observer.observe(el));

    // 2. Click Handler for Feature Boxes
    window.handleCardClick = function(type) {
        const featureMap = {
            'schemes': 'Financial Inclusion Schemes Hub',
            'learning': 'Gamified Financial Learning Portal',
            'budgeting': 'Personalized Budgeting Dashboard',
            'upi-shield': 'UPI Transaction Security Shield',
            'call-threats': 'NLP Voice Scam Detection',
            'expense-tracker': 'Automated Expense Tracker',
            'emi-risk': 'EMI Default Risk Calculator',
            'portfolio': 'Smart Portfolio Advisory',
            'health-score': 'Your Financial Health Report'
        };
        
        if(featureMap[type]) {
            console.log(`Accessing ${featureMap[type]}...`);
            alert(`Redirecting to: ${featureMap[type]}`);
        } else {
            console.log("Unknown Selection");
        }
    };

    // 3. Navigation Handling (Mobile Menu)
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            // Simple toggle for mobile view logic if you add CSS for .show-nav
            if(navList.style.display === 'flex') {
                navList.style.display = 'none';
            } else {
                navList.style.display = 'flex';
                navList.style.flexDirection = 'column';
                navList.style.position = 'absolute';
                navList.style.top = '70px';
                navList.style.left = '0';
                navList.style.width = '100%';
                navList.style.background = 'var(--primary-dark)';
                navList.style.padding = '20px';
            }
        });
    }

    // 4. Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80, // Adjust for sticky header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});