from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

# Database of suspicious patterns
SCAM_KEYWORDS = ["pin", "cashback", "refund", "lottery", "prize", "approve", "winner", "reward"]
PHISHING_DOMAINS = ["bit.ly", "tinyurl.com", "t.co", "kyc-update", "rbi-safety", "gpay-reward", "customer-care-helpline"]

@app.route("/check_url", methods=["POST"])
def check_url():
    """Analyzes URLs for phishing signatures."""
    data = request.get_json()
    url = data.get("url", "").lower()
    
    if not url:
        return jsonify({"level": "low", "result": "No URL provided."})

    # Check for insecure protocol or suspicious domains
    is_phishing = any(domain in url for domain in PHISHING_DOMAINS)
    is_insecure = url.startswith("http://")
    
    if is_phishing or is_insecure:
        return jsonify({
            "level": "high",
            "result": "🚨 CRITICAL: This link is suspicious. It uses an insecure connection or a known phishing domain."
        })
    
    return jsonify({
        "level": "low",
        "result": "✅ URL appears safe, but always verify the sender before clicking."
    })

@app.route("/check_upi", methods=["POST"])
def check_upi():
    """Analyzes UPI IDs and Message text for fraud triggers."""
    data = request.get_json()
    upi_id = data.get("upi_id", "").lower()
    message = data.get("message", "").lower()
    
    # Check for scam keywords in the message
    scam_triggers = [word for word in SCAM_KEYWORDS if word in message]
    
    # Check if UPI ID looks like a generic 'customer care' or 'refund' bot
    is_suspicious_id = any(x in upi_id for x in ["refund", "helpline", "care", "support"])

    if scam_triggers or is_suspicious_id:
        return jsonify({
            "level": "high",
            "result": f"🚨 FRAUD TRIGGER: Found scam keywords: {', '.join(scam_triggers)}. Real bank staff will NEVER ask you to 'Approve' or 'Refund' via UPI PIN."
        })
    
    return jsonify({
        "level": "low",
        "result": "✅ No obvious fraud triggers found in this message."
    })

@app.route("/check_qr", methods=["POST"])
def check_qr():
    """Decodes QR content to see if it's a 'PAY' intent disguised as 'RECEIVE'."""
    data = request.get_json()
    content = data.get("content", "")
    
    # Check if the QR contains a UPI payment URI
    if "upi://pay" in content:
        # Extract the Payee Name if possible
        payee_match = re.search(r'pn=([^&]+)', content)
        payee_name = payee_match.group(1).replace("%20", " ") if payee_match else "Unknown"
        
        return jsonify({
            "level": "high",
            "result": f"🚨 PAYMENT TRAP: This QR is a 'SEND MONEY' request to {payee_name}. Scanning this will deduct money from your account, not credit it."
        })
    
    return jsonify({
        "level": "low",
        "result": "✅ This QR code does not contain a direct UPI payment request."
    })

if __name__ == "__main__":
    # In production, use a production-ready server like Gunicorn
    app.run(port=5000, debug=True)