import uvicorn
import os
import whisper
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from textblob import TextBlob

# 1. Initialize FastAPI app
app = FastAPI(title="UNIFIN Advanced NLP Engine")

# 2. Enable CORS (Allows your HTML file to talk to this Python script)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load the Whisper AI Model 
# 'tiny' is fastest for local PCs. 'base' is more accurate.
print("Loading AI Model... please wait.")
model = whisper.load_model("tiny")
print("Model Loaded Successfully.")

# 4. Define Scam Keywords and Phrases
SCAM_KEYWORDS = [
    "bank account", "password", "transfer", "urgent", "police", 
    "gift card", "zelle", "crypto", "social security", "irs",
    "unauthorized access", "suspended", "immediately", "bitcoin"
]

def calculate_risk(text: str):
    text_lower = text.lower()
    
    # Feature A: Keyword Matching
    found_words = [word for word in SCAM_KEYWORDS if word in text_lower]
    
    # Feature B: Sentiment Analysis
    # Sentiment < 0 means the caller sounds aggressive or negative
    sentiment_score = TextBlob(text).sentiment.polarity
    
    # Feature C: Risk Scoring Logic
    # We start at 0 and add points based on red flags
    score = 0
    score += len(found_words) * 20  # 20 points per scam word
    
    if sentiment_score < -0.1:
        score += 20  # Extra points for aggressive/urgent tone
        
    # Cap the score at 100%
    final_score = min(score, 100)
    
    return {
        "risk_score": final_score,
        "detected_words": found_words,
        "sentiment": "Aggressive/Urgent" if sentiment_score < 0 else "Neutral/Calm",
        "is_scam": final_score >= 40
    }

# 5. The Analysis Endpoint
@app.post("/analyze-file")
async def analyze_file(file: UploadFile = File(...)):
    # Save the uploaded audio file temporarily
    temp_filename = f"temp_{file.filename}"
    with open(temp_filename, "wb") as buffer:
        buffer.write(await file.read())

    try:
        # Step 1: Transcribe Audio to Text
        result = model.transcribe(temp_filename)
        transcript_text = result['text']

        # Step 2: Run NLP Analysis
        analysis = calculate_risk(transcript_text)
        
        # Step 3: Combine Results
        return {
            "transcript": transcript_text,
            "risk_score": analysis["risk_score"],
            "detected_words": analysis["detected_words"],
            "sentiment": analysis["sentiment"],
            "is_scam": analysis["is_scam"]
        }

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal AI Processing Error")
    
    finally:
        # Step 4: Delete the temporary file to save space
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

if __name__ == "__main__":
    # Start the server on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)