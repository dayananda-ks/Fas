"""FastAPI server that serves the trained Fashion-MNIST CNN."""
import io
from contextlib import asynccontextmanager

import numpy as np
import tensorflow as tf
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageOps

CLASSES = ["T-shirt/top", "Trouser", "Pullover", "Dress", "Coat",
           "Sandal", "Shirt", "Sneaker", "Bag", "Ankle boot"]
MAX_SIZE = 5 * 1024 * 1024
state = {"model": None}


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the model once at startup
    try:
        state["model"] = tf.keras.models.load_model("model/fashion_cnn.keras")
        print("Model loaded.")
    except Exception as e:
        print("Could not load model. Run train.py first:", e)
    yield


app = FastAPI(title="Fashion Classifier API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def preprocess_image(data: bytes) -> np.ndarray:
    """Bytes -> (1,28,28,1) float array, matching Fashion-MNIST style."""
    img = Image.open(io.BytesIO(data))
    img = ImageOps.exif_transpose(img)
    if img.mode in ("RGBA", "LA", "P"):  # put transparent images on white
        img = img.convert("RGBA")
        bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
        img = Image.alpha_composite(bg, img)
    img = img.convert("L").resize((28, 28), Image.LANCZOS)
    arr = np.asarray(img, dtype="float32") / 255.0
    # Fashion-MNIST: light item on dark background. Invert white-background photos.
    border = np.concatenate([arr[0], arr[-1], arr[:, 0], arr[:, -1]])
    if border.mean() > 0.5:
        arr = 1.0 - arr
    return arr.reshape(1, 28, 28, 1)


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": state["model"] is not None}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if state["model"] is None:
        raise HTTPException(503, "Model not loaded. Run train.py first.")
    if file.content_type not in ("image/jpeg", "image/png"):
        raise HTTPException(400, "Only JPG, JPEG and PNG images are allowed.")
    data = await file.read()
    if len(data) > MAX_SIZE:
        raise HTTPException(400, "File too large. Maximum size is 5MB.")
    try:
        x = preprocess_image(data)
    except Exception:
        raise HTTPException(400, "Could not read the image. File may be corrupted.")
    try:
        probs = state["model"].predict(x, verbose=0)[0]
    except Exception:
        raise HTTPException(500, "Prediction failed on the server.")
    idx = int(np.argmax(probs))
    conf = float(probs[idx]) * 100
    status = "High confidence" if conf >= 80 else "Moderate confidence" if conf >= 50 else "Low confidence"
    return {
        "label": CLASSES[idx],
        "confidence": round(conf, 2),
        "status": status,
        "probabilities": [{"label": c, "value": round(float(p) * 100, 2)} for c, p in zip(CLASSES, probs)],
    }
