import os
import easyocr
import uvicorn
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

app = FastAPI()
load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["image_process_db"]
collection = db["processed_texts"]

reader = easyocr.Reader(['en'])

@app.post("/process")
async def upload_image(file: UploadFile = File(...)):
    # Save uploaded file temporarily
    temp_path = f"/tmp/{file.filename}"
    with open(temp_path, "wb") as f:
        f.write(await file.read())

    # Run OCR
    result = reader.readtext(temp_path, detail=0)

    # Store in MongoDB
    document = {
        "image_name": file.filename,
        "extracted_text": result,
        "timestamp": datetime.utcnow()
    }
    collection.insert_one(document)

    # Remove temporary file
    os.remove(temp_path)

    # Return result
    return JSONResponse({"filename": file.filename, "text": result})

# python
if __name__ == "__main__":
    
    port = int(os.getenv("PORT", "5002"))
    uvicorn.run("image_processer:app", host="0.0.0.0", port=port, reload=True)