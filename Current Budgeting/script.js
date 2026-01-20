document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    fetchGDPData(); // Live API call
    fetchStateData(); // Mock Live fetch
    calculateTaxSplit(); // Initial Tax Calc
});

// --- 1. Live GDP Fetch (World Bank API) ---
async function fetchGDPData() {
    const url = 'https://api.worldbank.org/v2/country/IN/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=10';
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // The API returns an array: [metadata, data]
        const indicatorData = data[1];
        
        // Sort by date ascending for the chart
        const sortedData = indicatorData.sort((a, b) => a.date - b.date);
        
        const years = sortedData.map(item => item.date);
        const values = sortedData.map(item => item.value.toFixed(2));
        
        // Update DOM text
        const latestVal = values[values.length - 1];
        document.getElementById('current-gdp').textContent = `${latestVal}%`;

        // Update Chart
        updateChart('gdpChart', years, values, 'GDP Growth (%)');
        
    } catch (error) {
        console.error("Error fetching GDP:", error);
        document.getElementById('current-gdp').textContent = "7.2% (Est)";
        // Fallback data if API fails
        updateChart('gdpChart', ['2019', '2020', '2021', '2022', '2023'], [3.9, -5.8, 9.1, 7.2, 7.6], 'GDP Growth (%)');
    }
}

// --- 2. State Budget Data (Simulated Live Fetch) ---
function fetchStateData() {
    const tableBody = document.querySelector('#state-budget-table tbody');
    tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px;">Refreshing data...</td></tr>';

    // Simulate network delay for "Live" feel
    setTimeout(() => {
        // Mock Data based on 2024-25 Budget Estimates
        const states = [
            { name: "Uttar Pradesh", budget: "7,36,437", sector: "Infrastructure", growth: "+6.8%" },
            { name: "Maharashtra", budget: "6,00,522", sector: "Urban Dev", growth: "+5.2%" },
            { name: "Tamil Nadu", budget: "3,65,321", sector: "Education", growth: "+4.9%" },
            { name: "Karnataka", budget: "3,71,383", sector: "Social Welfare", growth: "+4.1%" },
            { name: "Gujarat", budget: "3,32,465", sector: "Energy", growth: "+8.3%" },
            { name: "West Bengal", budget: "3,39,162", sector: "Rural Dev", growth: "+3.7%" },
            { name: "Bihar", budget: "2,78,725", sector: "Education", growth: "+10.1%" },
        ];

        let html = '';
        states.forEach(state => {
            html += `
                <tr>
                    <td><strong>${state.name}</strong></td>
                    <td>₹ ${state.budget} Cr</td>
                    <td>${state.sector}</td>
                    <td style="color:${parseFloat(state.growth) > 0 ? 'green' : 'red'}">${state.growth}</td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    }, 800);
}

// --- 3. Chart Configurations ---
let charts = {};

function initCharts() {
    // 1. GDP Chart (Empty initially, populated by fetchGDPData)
    createChart('gdpChart', 'line', [], [], 'GDP Growth', '#2563eb');

    // 2. Inflation vs Repo (Mixed Chart)
    const ctx2 = document.getElementById('inflationRepoChart').getContext('2d');
    charts['inflationRepoChart'] = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025 (Est)'],
            datasets: [
                {
                    label: 'Inflation (CPI)',
                    data: [6.2, 5.5, 6.7, 5.4, 4.9, 4.5],
                    borderColor: '#ef4444',
                    tension: 0.4
                },
                {
                    label: 'Repo Rate',
                    data: [4.0, 4.0, 5.9, 6.5, 6.5, 6.25],
                    borderColor: '#10b981',
                    borderDash: [5, 5],
                    tension: 0.1
                }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 3. Unemployment Trend
    createChart('unemploymentChart', 'bar', 
        ['2020', '2021', '2022', '2023', '2024'], 
        [10.2, 7.9, 7.3, 8.1, 7.6], 
        'Unemployment Rate (%)', '#f59e0b');

    // 4. Tax Revenue (Direct vs Indirect)
    const ctx4 = document.getElementById('taxChart').getContext('2d');
    charts['taxChart'] = new Chart(ctx4, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Direct Tax (Corp + Income)',
                    data: [10.5, 9.4, 14.1, 16.6, 19.5], // In Trillion INR (Approx)
                    borderColor: '#2563eb',
                    fill: true,
                    backgroundColor: 'rgba(37, 99, 235, 0.1)'
                },
                {
                    label: 'Indirect Tax (GST + Others)',
                    data: [10.0, 10.7, 12.9, 14.8, 16.2],
                    borderColor: '#9333ea',
                }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// Helper to create simple charts
function createChart(id, type, labels, data, label, color) {
    const ctx = document.getElementById(id).getContext('2d');
    charts[id] = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                backgroundColor: type === 'bar' ? color : 'transparent',
                tension: 0.3
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function updateChart(id, labels, data, label) {
    if (charts[id]) {
        charts[id].data.labels = labels;
        charts[id].data.datasets[0].data = data;
        charts[id].data.datasets[0].label = label;
        charts[id].update();
    }
}

// --- 4. Tax Calculator (Where does your tax go?) ---
let taxPieChart = null;

function calculateTaxSplit() {
    const income = parseFloat(document.getElementById('incomeInput').value) || 0;
    
    // Simple Approximation of New Regime Tax (FY 2024-25)
    // Slabs: 0-3L:0, 3-7L:5%, 7-10L:10%, 10-12L:15%, 12-15L:20%, >15L:30%
    let tax = 0;
    
    if (income > 300000) {
        if (income <= 700000) {
            // Rebate under 87A usually makes it 0, but for calculation sake:
            tax = (income - 300000) * 0.05; 
        } else {
            // Detailed bracket calc simplified for demo
            if(income > 1500000) {
                tax += (income - 1500000) * 0.30;
                tax += 150000; // Tax for 15L slab
            } else if (income > 1200000) {
                tax += (income - 1200000) * 0.20;
                tax += 90000;
            } else if (income > 1000000) {
                tax += (income - 1000000) * 0.15;
                tax += 60000;
            } else { // 7L - 10L
                tax += (income - 700000) * 0.10;
                tax += 20000; // Approx prev slab
            }
        }
    }
    
    // Rebate limit check (New Regime rebate up to 7L income = 0 tax)
    if(income <= 700000) tax = 0;

    // Update Text
    document.getElementById('totalTax').textContent = `₹ ${Math.floor(tax).toLocaleString()}`;

    renderTaxPieChart(tax);
}

function renderTaxPieChart(taxAmount) {
    // Union Budget 2024-25 "Rupee Goes To" breakdown (Approx %)
    const distribution = {
        "Interest Payments": 0.19,
        "States' Share": 0.21,
        "Central Schemes": 0.16,
        "Defence": 0.08,
        "Subsidies": 0.06,
        "Pensions": 0.04,
        "Other Exp": 0.26
    };

    const labels = Object.keys(distribution);
    const data = Object.values(distribution).map(pct => (taxAmount * pct).toFixed(0));

    const ctx = document.getElementById('taxDistributionChart').getContext('2d');

    if (taxPieChart) {
        taxPieChart.destroy();
    }

    taxPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#ef4444', // Interest
                    '#3b82f6', // States
                    '#10b981', // Schemes
                    '#f59e0b', // Defence
                    '#8b5cf6', // Subsidies
                    '#6b7280', // Pensions
                    '#9ca3af'  // Other
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right' },
                title: { display: true, text: 'Allocation of your Tax (₹)' }
            }
        }
    });
}