from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse, Response
import uvicorn
import logging
import json
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger("vipps-webhook")

app = FastAPI(title="Vipps Webhook API")

@app.post("/api/vipps/webhook")
async def payment_created_webhook(request: Request):
    """
    Endpoint that receives webhooks from Vipps when a payment is created.
    Logs the entire request body to the console and publishes it via SSE.
    """
    # Get the raw request body
    body = await request.json()
    
    # Log the timestamp and the full request body
    timestamp = datetime.now().isoformat()
    logger.info(f"Received webhook at {timestamp}")
    logger.info(f"Request body: {json.dumps(body, indent=2)}")
    
    print("\n" + "="*50)
    print(f"VIPPS PAYMENT WEBHOOK RECEIVED AT {timestamp}")
    print("="*50)
    print(json.dumps(body, indent=2))
    print("="*50 + "\n")
    
    # Publish the event to all connected SSE clients
    event_data = {
        "timestamp": timestamp,
        "type": "payment_created",
        "data": body
    }
    
    # Return a success response
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"status": "success", "message": "Webhook received successfully"}
    )

@app.get("/api/vipps/status")
async def root():
    """Root endpoint to verify the API is running."""
    return {"status": "online", "message": "Vipps webhook receiver is running"}

if __name__ == "__main__":
    print("Starting Vipps webhook receiver...")
    print("Listening for webhooks at: /api/vipps/payment-created")
    uvicorn.run(app, host="0.0.0.0", port=8000)
