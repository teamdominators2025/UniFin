const questions = [
    {
        question: "How long do you plan to keep your money invested?",
        options: [
            { text: "Less than 2 years", score: 1 },
            { text: "2 to 7 years", score: 2 },
            { text: "7+ years", score: 3 }
        ]
    },
    {
        question: "If your portfolio dropped 20% in one month, what would you do?",
        options: [
            { text: "Sell everything immediately", score: 1 },
            { text: "Do nothing and wait", score: 2 },
            { text: "Buy more while prices are low", score: 3 }
        ]
    },
    {
        question: "What is your primary financial goal?",
        options: [
            { text: "Protecting what I have (Security)", score: 1 },
            { text: "Balanced growth and safety", score: 2 },
            { text: "Maximum wealth accumulation", score: 3 }
        ]
    },
    {
        question: "How would you describe your knowledge of investing?",
        options: [
            { text: "Beginner: I'm still learning", score: 1 },
            { text: "Intermediate: I understand basics", score: 2 },
            { text: "Advanced: I'm very comfortable", score: 3 }
        ]
    },
    {
        question: "Which of these best describes your income source?",
        options: [
            { text: "Unstable or nearing retirement", score: 1 },
            { text: "Steady and reliable", score: 2 },
            { text: "High and growing", score: 3 }
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressFill = document.getElementById("progress");
const resultSection = document.getElementById("result-section");
const questionSection = document.getElementById("question-section");
const profileName = document.getElementById("profile-name");
const profileDesc = document.getElementById("profile-desc");
const adviceList = document.getElementById("advice-list");

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    optionsContainer.innerHTML = "";
    
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.onclick = () => selectOption(option.score);
        optionsContainer.appendChild(button);
    });
}

function selectOption(score) {
    totalScore += score;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    progressFill.style.width = "100%";
    adviceList.innerHTML = "";

    let tips = [];

    if (totalScore <= 7) {
        profileName.innerText = "Conservative";
        profileDesc.innerText = "You prioritize safety and capital preservation over high returns.";
        tips = [
            "Stick to Government Bonds and High-Yield Savings to protect your money.",
            "Maintain an emergency fund of at least 6 months of living expenses.",
            "Diversify into 'Value' stocks that pay consistent dividends."
        ];
    } else if (totalScore <= 11) {
        profileName.innerText = "Moderate";
        profileDesc.innerText = "You seek a balance between growth and protecting your initial investment.";
        tips = [
            "Maintain a 60% Stock and 40% Bond split for a smoother ride.",
            "Rebalance your portfolio every 6 months to stay on track.",
            "Invest in Index Funds to cover the whole market at a low cost."
        ];
    } else {
        profileName.innerText = "Aggressive";
        profileDesc.innerText = "You are focused on maximizing long-term wealth and can handle market swings.";
        tips = [
            "Maximize contributions to tax-advantaged accounts like IRAs or 401ks.",
            "Focus on high-growth sectors like Tech, AI, and Emerging Markets.",
            "Use Dollar Cost Averaging to buy more shares when prices drop."
        ];
    }

    tips.forEach(tip => {
        const li = document.createElement("li");
        li.innerText = tip;
        adviceList.appendChild(li);
    });
}

// Initialize the first question
showQuestion();