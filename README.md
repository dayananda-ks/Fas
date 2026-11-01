# Fashion Classifier

A full-stack fashion item classification app that uses a CNN trained on Fashion-MNIST, a FastAPI backend for prediction, and a React + Vite frontend for uploading and viewing results.

## Features
- Image upload from the browser
- Fashion item prediction using a trained TensorFlow model
- REST API with Swagger docs
- Real-time frontend UI built with React and TypeScript

## Tech Stack
- Backend: Python, FastAPI, TensorFlow, Pillow, NumPy
- Frontend: React, TypeScript, Vite
- Model: Fashion-MNIST CNN saved as `backend/model/fashion_cnn.keras`

## Prerequisites
Before running the project, make sure you have:
- Python 3.10 or 3.11
- Node.js 18+ and npm
- Git

On Linux/macOS, install Python venv support if needed:
```bash
sudo apt update
sudo apt install python3-venv python3-dev
```

## 1) Clone the project
```bash
git clone https://github.com/dayananda-ks/Fas.git
cd Fas
```

## 2) Set up the backend
Open a terminal in the project root:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```

If you are on Windows PowerShell:
```powershell
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Train the model once:
```bash
python train.py
```

This creates:
```bash
backend/model/fashion_cnn.keras
```

Start the API server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Check the API docs in your browser:
```text
http://localhost:8000/docs
```

## 3) Set up the frontend
Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

Open the frontend:
```text
http://localhost:5173
```

## 4) Run both together
Use two terminals:
- Terminal 1: backend
- Terminal 2: frontend

The app is ready when:
- Backend is running on `http://localhost:8000`
- Frontend is running on `http://localhost:5173`

## API Endpoints
### Health check
```bash
curl http://localhost:8000/health
```
Response:
```json
{"status": "ok", "model_loaded": true}
```

### Predict image
```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@/path/to/image.jpg"
```

Accepted image types:
- JPG / JPEG
- PNG

Max file size: 5MB

Example response:
```json
{
  "label": "Sneaker",
  "confidence": 92.4,
  "status": "High confidence",
  "probabilities": [
    {"label": "T-shirt/top", "value": 1.2},
    {"label": "Sneaker", "value": 92.4}
  ]
}
```

## Project Structure
```text
fashion-classifier/
├── backend/
│   ├── main.py
│   ├── train.py
│   ├── requirements.txt
│   └── model/
│       └── fashion_cnn.keras
├── frontend/
│   ├── package.json
│   ├── src/
│   ├── index.html
│   └── vite.config.ts
├── README.md
└── .gitignore
```

## Troubleshooting
### Model not found
If the backend says the model is missing:
```bash
cd backend
python train.py
```

### TensorFlow installation issues
Use a supported Python version such as 3.10 or 3.11, then reinstall dependencies:
```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Port already in use
If `8000` or `5173` is busy, change the port:
```bash
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

For Vite:
```bash
npm run dev -- --host 0.0.0.0 --port 4173
```

### CORS issues
The app allows requests from `http://localhost:5173` and `http://127.0.0.1:5173`. If you change the frontend port, update the allowed origins in `backend/main.py`.

## Notes
- The model is trained on Fashion-MNIST, so it works best with clean, centered clothing images.
- For better results, use plain backgrounds and make the object fill most of the frame.
- The expected test accuracy is around 90%+ depending on training conditions.

## Quick Start Command Summary
If you are setting up a new machine, these are the commands to copy and paste:

```bash
git clone https://github.com/dayananda-ks/Fas.git
cd Fas

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python train.py
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

In a second terminal:
```bash
cd Fas/frontend
npm install
npm run dev -- --host 0.0.0.0
```

Then visit:
```text
http://localhost:5173
```
