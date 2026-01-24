let myChart;

function calculateStress() {
    // 1. Inputs
    const income = parseFloat(document.getElementById('income').value);
    const emi = parseFloat(document.getElementById('emi').value);
    const rent = parseFloat(document.getElementById('rent').value);
    const life = parseFloat(document.getElementById('lifestyle').value); // Now captured
    const fund = parseFloat(document.getElementById('emergency').value);
    const stability = parseFloat(document.getElementById('stability').value);

    // 2. Logic Updates
    const emiRatio = (emi / income) * 100;
    const totalExpenses = emi + rent + life; // Combined financial burden
    const expenseRatio = (totalExpenses / income) * 100;
    
    // Updated Score Formula: 
    // Now factors in both EMI and Lifestyle/Rent (expenseRatio)
    let score = (expenseRatio * 0.8 + emiRatio * 0.5) * stability;
    
    // Penalty if expenses exceed income or if emergency fund is low
    if (totalExpenses > income) score += 20;
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

    updateSuggestions(score, emiRatio, expenseRatio);
    updateChart(score, expenseRatio); // Chart now reacts to lifestyle-driven expense ratio
    updateCitizenView(emiRatio, fund, emi, rent);
}

function updateSuggestions(score, emiRatio, expenseRatio) {
    const list = document.getElementById('ai-suggestions-list');
    list.innerHTML = "";
    
    const items = [
        { icon: 'fa-file-invoice', text: 'EMI Restructuring Guidance' },
        { icon: 'fa-scale-balanced', text: 'Budget Rebalance Tips' }
    ];

    if (expenseRatio > 70) items.push({ icon: 'fa-scissors', text: 'Reduce Lifestyle Spending' });
    if (emiRatio > 42) items.push({ icon: 'fa-target-account', text: 'Target 35% EMI-to-income' });
    if (score > 50) items.push({ icon: 'fa-pause', text: 'Pause Non-essential spending' });

    items.forEach(item => {
        list.innerHTML += `
            <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <i class="fa-solid ${item.icon} text-blue-600"></i>
                <span class="text-sm font-semibold">${item.text}</span>
            </div>`;
    });
}

function updateChart(score, expenseRatio) {
    const ctx = document.getElementById('predictionChart').getContext('2d');
    if (myChart) myChart.destroy();
    
    // Higher lifestyle expenses (expenseRatio) cause a steeper climb in the graph
    const riskFactor = (expenseRatio / 20); 
    
    const baseLine = [
        score, 
        Math.min(score + (riskFactor * 1.5), 110), 
        Math.min(score + (riskFactor * 3), 115), 
        Math.min(score + (riskFactor * 5), 120), 
        Math.min(score + (riskFactor * 7), 125), 
        Math.min(score + (riskFactor * 10), 130)
    ];
    
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
            scales: { x: { display: false }, y: { display: false, min: 0, max: 140 } }
        }
    });
}

function updateCitizenView(ratio, fund, emi, rent) {
    document.getElementById('cv-ratio').innerText = Math.round(ratio) + "%";
    document.getElementById('cv-improvement').innerText = ratio > 40 ? "+25%" : "+5%";
    document.getElementById('cv-buffer').innerText = Math.round(fund / ((emi + rent)/30)) + " days";
}