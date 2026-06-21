# ResumeForge AI

> Build ATS-Friendly Resumes and Analyze Them Instantly with AI-powered insights.

**Created by Siddhesh Chavan** | [csiddhesh768@gmail.com](mailto:csiddhesh768@gmail.com) | [Portfolio](https://siddhesh-chavan-portfolio-flame.vercel.app/)

Built for [Digital Heroes](https://digitalheroesco.com)

---

## 🚀 Features

### Resume Builder
- **Split-screen editor** — form on the left, live preview on the right
- **Real-time preview** — changes update instantly as you type
- **LaTeX code view** — toggle to see generated LaTeX with syntax highlighting
- **Theme editor** — customize colors, fonts, spacing, and bullet styles
- **5 preset themes** — Professional Blue, Modern Purple, Minimal Black, Emerald Green, Corporate Navy
- **Export options** — Download PDF, Download LaTeX (.tex), Copy LaTeX to clipboard
- **ATS-friendly** — clean, professional layout that passes automated screening

### Resume Analyzer
- **Upload PDF or DOCX** — drag-and-drop or click to upload
- **5 scoring categories** — Overall, ATS, Content, Formatting, Technical
- **AI-powered analysis** — using Google Gemini Free API
- **Detailed feedback** — Strengths, Weaknesses, ATS Recommendations, Project/Skill Feedback
- **Missing section detection** — identifies gaps in your resume

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 6 |
| Styling | Bootstrap 5 + Custom CSS |
| Routing | React Router v7 |
| Animations | Framer Motion |
| PDF Export | html2pdf.js |
| Code Highlighting | react-syntax-highlighter |
| Backend | Flask + Flask-CORS |
| Resume Parsing | pdfplumber, PyPDF2, python-docx |
| AI | Google Gemini (gemini-2.0-flash) |
| Frontend Hosting | Vercel (Free) |
| Backend Hosting | Render (Free) |

**Total Cost: ₹0**

---

## 📦 Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Add your Gemini API key to .env

python app.py
```

### Environment Variables

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5000
```

**Backend** (`backend/.env`):
```
GEMINI_API_KEY=your-key-from-aistudio.google.com
FLASK_ENV=development
```

---

## 🌐 Deployment

### Frontend → Vercel

1. Push to GitHub: `https://github.com/Sidchav5/ResumeGenerator`
2. Import project on [vercel.com](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`
5. Deploy

### Backend → Render

1. Create new **Web Service** on [render.com](https://render.com)
2. Connect GitHub repo
3. Set **Root Directory** to `backend`
4. **Build Command**: `pip install -r requirements.txt`
5. **Start Command**: `gunicorn app:create_app()`
6. Add environment variable: `GEMINI_API_KEY`
7. Select **Free** plan
8. Deploy

---

## 📄 License

MIT License — free for personal and commercial use.

---

**Built for [Digital Heroes](https://digitalheroesco.com)** 🦸
