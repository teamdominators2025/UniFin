// --- Quiz Data extracted from uploaded files ---

const quizzes = {
    banking: [
        {q:"Which is the safest way to scan a UPI QR code?", o:["From unknown posters","Only from trusted merchants","From forwarded images","Any QR is safe"], a:1},
        {q:"What should you do if someone asks for your UPI PIN?", o:["Share if urgent","Never share it","Share with bank staff","Share on call"], a:1},
        {q:"Fake KYC scams usually ask you to:", o:["Visit bank branch","Update via official app","Click unknown links","Ignore messages"], a:2},
        {q:"Savings Account is best for:", o:["Daily personal savings","High business transactions","Unlimited withdrawals","Companies only"], a:0},
        {q:"Current Account is mainly for:", o:["Students","Salary earners","Businesses","Fixed deposits"], a:2},
        {q:"Why do banks charge minimum balance penalty?", o:["To increase profit","To encourage discipline","As RBI rule","Random charge"], a:1},
        {q:"If minimum balance is not maintained:", o:["Account closes","Penalty may apply","Interest doubles","ATM stops"], a:1},
        {q:"Interest in savings account is calculated on:", o:["Monthly balance","Daily balance","Yearly balance","Random balance"], a:1},
        {q:"When is savings interest credited?", o:["Daily","Monthly","Quarterly","Yearly"], a:2},
        {q:"Best way to avoid UPI fraud is:", o:["Share OTP","Ignore bank alerts","Verify before paying","Use public WiFi"], a:2}
    ],
    emergency: [
        {q:"What is an emergency fund?", o:["Money for vacations","Funds for unexpected expenses","Investment for high returns","Tax saving tool"], a:1},
        {q:"Which situation best needs an emergency fund?", o:["Buying a phone","Medical emergency","Stock market dip","Festival shopping"], a:1},
        {q:"How much should an emergency fund ideally cover?", o:["1 month expenses","3–6 months expenses","10 years expenses","Only rent"], a:1},
        {q:"Why is 3–6 months recommended?", o:["For luxury spending","To handle income loss","For higher interest","For tax benefits"], a:1},
        {q:"Where should emergency funds be kept?", o:["Equity mutual funds","Savings or liquid funds","Crypto assets","Real estate"], a:1},
        {q:"Why NOT keep emergency fund in stocks?", o:["Low returns","High risk & volatility","No tax","Too liquid"], a:1},
        {q:"Why Fixed Deposits are NOT ideal emergency funds?", o:["No interest","Lock-in & penalties","Not safe","Too risky"], a:1},
        {q:"Which is best feature of emergency fund?", o:["High returns","Liquidity & safety","Long lock-in","Market growth"], a:1},
        {q:"Liquid mutual funds are suitable because:", o:["They are risky","Easy withdrawal","High lock-in","Tax free"], a:1},
        {q:"Emergency fund should be used for:", o:["Shopping sales","Vacations","Job loss or emergencies","Investments"], a:2}
    ]
};

// --- App State ---
let currentQuizType = '';
let currentQuestionIndex = 0;
let score = 0;
let currentQuizData = [];

// --- DOM Elements ---
const modal = document.getElementById('quizModal');
const quizTitle = document.getElementById('quizTitle');
const quizBody = document.getElementById('quizBody');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');

// --- Functions ---

function openQuiz(type) {
    currentQuizType = type;
    currentQuizData = quizzes[type];
    currentQuestionIndex = 0;
    score = 0;
    
    // Set Title
    quizTitle.innerText = type === 'banking' ? '💰 Banking & UPI Mastery' : '🚨 Emergency Fund Expert';
    
    // Reset UI
    nextBtn.style.display = 'none';
    nextBtn.innerText = "Next Question ➡";
    modal.classList.add('active');
    
    loadQuestion();
}

function closeQuiz() {
    modal.classList.remove('active');
}

function loadQuestion() {
    const q = currentQuizData[currentQuestionIndex];
    
    // Update Progress
    const progressPercent = ((currentQuestionIndex) / currentQuizData.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Render Question
    let html = `<h3 style="margin-bottom:1.5rem; font-size:1.2rem;">${currentQuestionIndex + 1}. ${q.q}</h3>`;
    
    q.o.forEach((option, index) => {
        html += `<button class="quiz-option" onclick="checkAnswer(this, ${index})">${option}</button>`;
    });

    quizBody.innerHTML = html;
    nextBtn.style.display = 'none';
}

function checkAnswer(btn, selectedIndex) {
    const correctIndex = currentQuizData[currentQuestionIndex].a;
    const options = document.querySelectorAll('.quiz-option');

    // Disable all buttons
    options.forEach(opt => opt.disabled = true);

    if (selectedIndex === correctIndex) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        options[correctIndex].classList.add('correct'); // Show correct answer
    }

    // Handle "Next" or "Finish" button
    if (currentQuestionIndex < currentQuizData.length - 1) {
        nextBtn.style.display = 'block';
        nextBtn.onclick = nextQuestion;
    } else {
        nextBtn.style.display = 'block';
        nextBtn.innerText = "See Results 🎉";
        nextBtn.onclick = showResults;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    progressFill.style.width = '100%';
    const percentage = (score / currentQuizData.length) * 100;
    
    let message = "";
    if (percentage === 100) message = "Perfect Score! You are a Finance Master! 🏆";
    else if (percentage >= 70) message = "Great job! You know your stuff. 👏";
    else message = "Good effort! Watch the video again to master this. 📚";

    quizBody.innerHTML = `
        <div class="score-card">
            <div class="score-circle">${score} / ${currentQuizData.length}</div>
            <h3 style="margin-bottom:1rem;">${message}</h3>
            <p>You have completed the module.</p>
        </div>
    `;
    
    nextBtn.innerText = "Close Quiz";
    nextBtn.onclick = closeQuiz;
}

// Close modal on outside click
window.onclick = function(event) {
    if (event.target == modal) {
        closeQuiz();
    }
}