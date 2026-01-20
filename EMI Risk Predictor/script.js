let myChart;

function calculateStress() {
    // 1. Inputs
    const income = parseFloat(document.getElementById('income').value);
    const emi = parseFloat(document.getElementById('emi').value);
    const rent = parseFloat(document.getElementById('rent').value);
    const life = parseFloat(document.getElementById('lifestyle').value);
    const fund = parseFloat(document.getElementById('emergency').value);
    const stability = parseFloat(document.getElementById('stability').value);

    // 2. Logic
    const emiRatio = (emi / income) * 100;
    const expenseRatio = ((emi + rent + life) / income) * 100;
    
    let score = (emiRatio * 1.5) * stability;
    if (fund < (emi + rent)) score += 15;
    score = Math.min(Math.round(score), 100);

    // 3. UI Updates (Gauge)
    const needle = document.getElementById('needle');
    const scoreVal = document.getElementById('score-val');
    const zoneText = document.getElementById('zone-text');
    const advice = document.getElementById('friendly-advice');

    scoreVal.innerText = score;
    const rotation = (score * 1.8) - 90; 
    needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

    if (score <= 30) {
        zoneText.innerText = "Safe Zone";
        zoneText.style.color = "#10b981";
        advice.innerText = "Your finances are stable. Future looks bright!";
    } else if (score <= 60) {
        zoneText.innerText = "Watch Zone";
        zoneText.style.color = "#f59e0b";
        advice.innerText = "You may face pressure in 2-3 months. Rebalance now.";
    } else {
        zoneText.innerText = "High Stress Risk";
        zoneText.style.color = "#ef4444";
        advice.innerText = "Immediate restructuring required to prevent default.";
    }

    updateSuggestions(score, emiRatio);
    updateChart(score);
    updateCitizenView(emiRatio, fund, emi, rent);
}

function updateSuggestions(score, ratio) {
    const list = document.getElementById('ai-suggestions-list');
    list.innerHTML = "";
    
    const items = [
        { icon: 'fa-file-invoice', text: 'EMI Restructuring Guidance' },
        { icon: 'fa-scale-balanced', text: 'Budget Rebalance Tips' },
        { icon: 'fa-hand-holding-dollar', text: 'Emergency Fund Plan' }
    ];

    if (ratio > 42) items.push({ icon: 'fa-target-account', text: 'Safer EMI-to-income target: 35%' });
    if (score > 50) items.push({ icon: 'fa-pause', text: 'Pause Non-essential spending' });

    items.forEach(item => {
        list.innerHTML += `
            <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <i class="fa-solid ${item.icon} text-blue-600"></i>
                <span class="text-sm font-semibold">${item.text}</span>
            </div>`;
    });
}

function updateChart(score) {
    const ctx = document.getElementById('predictionChart').getContext('2d');
    if (myChart) myChart.destroy();
    
    // Simulating growth based on score
    const baseLine = [score, score + 5, score + 12, score + 18, score + 25, score + 30];
    
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
            datasets: [{
                label: 'Stress Level',
                data: baseLine,
                borderColor: score > 60 ? '#ef4444' : '#3b82f6',
                fill: true,
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false, max: 120 } }
        }
    });
}

function updateCitizenView(ratio, fund, emi, rent) {
    document.getElementById('cv-ratio').innerText = Math.round(ratio) + "%";
    document.getElementById('cv-improvement').innerText = ratio > 40 ? "+25%" : "+5%";
    document.getElementById('cv-buffer').innerText = Math.round(fund / ((emi + rent)/30)) + " days";
}