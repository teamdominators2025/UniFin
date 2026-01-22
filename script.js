const form = document.getElementById('expenseForm');
const budgetInput = document.getElementById('monthlyBudget');
const budgetBar = document.getElementById('budgetBar');
const remainingEl = document.getElementById('remainingBalance');
const list = document.getElementById('transactionList');
const scoreRing = document.getElementById('scoreRing');
const scorePercent = document.getElementById('scorePercent');
const scoreLabel = document.getElementById('scoreLabel');
const heatmapGrid = document.getElementById('heatmapGrid');

const circumference = 50 * 2 * Math.PI;
let expenses = [];

// Initialize Heatmap
function initHeatmap() {
    heatmapGrid.innerHTML = '';
    for (let i = 1; i <= 31; i++) {
        const day = document.createElement('div');
        day.classList.add('heat-day');
        day.id = `day-${i}`;
        day.innerText = i;
        heatmapGrid.appendChild(day);
    }
}

function setGauge(percent) {
    const p = isNaN(percent) ? 0 : percent;
    const offset = circumference - (p / 100 * circumference);
    scoreRing.style.strokeDashoffset = offset;
    scorePercent.innerText = `${Math.round(p)}%`;

    if (p >= 70) {
        scoreRing.style.stroke = "#28a745";
        scoreLabel.innerText = "Good";
        scoreLabel.style.color = "#28a745";
    } else if (p >= 40) {
        scoreRing.style.stroke = "#ffc107";
        scoreLabel.innerText = "Moderate";
        scoreLabel.style.color = "#ffc107";
    } else {
        scoreRing.style.stroke = "#d9534f";
        scoreLabel.innerText = "Bad";
        scoreLabel.style.color = "#d9534f";
    }
}

function updateUI() {
    const budgetLimit = parseFloat(budgetInput.value) || 0;
    const totalSpent = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
    const totalNeeds = expenses.filter(e => e.isNeed).reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
    
    // Stability Calculation
    const stabilityRatio = totalSpent === 0 ? 0 : (totalNeeds / totalSpent) * 100;
    setGauge(stabilityRatio);

    // Budget Progress
    const remaining = budgetLimit - totalSpent;
    remainingEl.innerText = `₹${remaining.toLocaleString('en-IN')}`;
    remainingEl.style.color = remaining < 0 ? '#d9534f' : '#333';

    const budgetPercent = budgetLimit === 0 ? 0 : Math.min((totalSpent / budgetLimit) * 100, 100);
    budgetBar.style.width = `${budgetPercent}%`;
    budgetBar.style.backgroundColor = budgetPercent > 90 ? '#d9534f' : '#28a745';

    // Transaction List
    list.innerHTML = expenses.map(exp => `
        <li>
            <span>${exp.category} ${exp.isNeed ? '🛡️' : '🎈'}</span>
            <strong>₹${parseFloat(exp.amount).toLocaleString('en-IN')}</strong>
        </li>
    `).reverse().join('');

    updateHeatmap();
}

function updateHeatmap() {
    // Reset colors
    document.querySelectorAll('.heat-day').forEach(d => d.className = 'heat-day');
    
    const dailyData = {};
    expenses.forEach(exp => {
        if (!dailyData[exp.date]) dailyData[exp.date] = { needs: 0, total: 0 };
        dailyData[exp.date].needs += exp.isNeed ? exp.amount : 0;
        dailyData[exp.date].total += exp.amount;
    });

    for (const day in dailyData) {
        const dayBox = document.getElementById(`day-${day}`);
        if (dayBox) {
            const ratio = (dailyData[day].needs / dailyData[day].total) * 100;
            dayBox.classList.add(ratio >= 50 ? 'heat-green' : 'heat-red');
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = parseFloat(document.getElementById('amount').value);
    if (isNaN(val)) return;

    expenses.push({
        amount: val,
        category: document.getElementById('category').value,
        isNeed: document.getElementById('isNeed').checked,
        date: new Date().getDate()
    });
    updateUI();
    form.reset();
});

budgetInput.addEventListener('input', updateUI);
initHeatmap();
setGauge(0);