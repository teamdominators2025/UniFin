from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
# Enable CORS so your frontend (on a different port/file) can talk to this backend
CORS(app)

# Database of suspicious patterns
SCAM_KEYWORDS = ["pin", "cashback", "refund", "lottery", "prize", "approve", "winner", "reward", "kyc", "bonus"]
PHISHING_DOMAINS = ["bit.ly", "tinyurl.com", "t.co", "kyc-update", "rbi-safety", "gpay-reward", "customer-care-helpline"]

@app.route("/check_url", methods=["POST"])
def check_url():
    """Analyzes URLs for phishing signatures."""
    data = request.get_json()
    if not data:
        return jsonify({"level": "low", "result": "No data received."}), 400
        
    url = data.get("url", "").lower()
    
    if not url:
        return jsonify({"level": "low", "result": "No URL provided."})

    # Check for insecure protocol or suspicious domains
    is_phishing = any(domain in url for domain in PHISHING_DOMAINS)
    is_insecure = url.startswith("http://")
    
    if is_phishing or is_insecure:
        return jsonify({
            "level": "high",
            "result": "🚨 CRITICAL: This link is suspicious. It uses an insecure connection (http) or a known phishing domain."
        })
    
    return jsonify({
        "level": "low",
        "result": "✅ URL appears safe, but always verify the sender before clicking."
    })

@app.route("/check_upi", methods=["POST"])
def check_upi():
    """Analyzes UPI IDs and Message text for fraud triggers (Merged Version)."""
    data = request.get_json()
    if not data:
        return jsonify({"level": "low", "result": "No data received."}), 400

    # Getting both the ID and the Message from the frontend
    upi_id = data.get("upi_id", "").lower()
    message = data.get("message", "").lower()
    
    # Combined list of suspicious words to watch for in the UPI ID handle
    suspicious_patterns = ["refund", "helpline", "care", "support", "rbi", "bank", "customer", "winner", "reward"]
    
    # 1. Check for scam keywords in the message body
    scam_triggers = [word for word in SCAM_KEYWORDS if word in message]
    
    # 2. Check if the UPI ID itself contains fraud indicators
    id_triggers = [word for word in suspicious_patterns if word in upi_id]

    if scam_triggers or id_triggers:
        # Create a combined list of all triggers found to show the user
        found = list(set(scam_triggers + id_triggers))
        trigger_text = ", ".join(found)
        
        return jsonify({
            "level": "high",
            "result": f"🚨 FRAUD TRIGGER: Detected suspicious words: {trigger_text}. Real bank staff or the RBI will NEVER use personal UPI handles for support or refunds."
        })
    
    return jsonify({
        "level": "low",
        "result": "✅ No obvious fraud triggers found. Always remain cautious with unknown senders."
    })

@app.route("/check_qr", methods=["POST"])
def check_qr():
    """Decodes QR content to see if it's a 'PAY' intent disguised as 'RECEIVE'."""
    data = request.get_json()
    if not data:
        return jsonify({"level": "low", "result": "No data received."}), 400

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
    # Runs the server on port 5000
    app.run(port=5000, debug=True)