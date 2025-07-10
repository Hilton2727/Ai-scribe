# Scribe.Ai

A ChatGPT-style AI chat app with Markdown support, OpenRouter API backend, and modern UI.

---

## Features
- Chat with AI using OpenRouter (supports GPT-compatible models)
- Markdown rendering for AI responses
- Modern, mobile-friendly UI
- Dark mode throughout
- Vercel serverless backend for secure API key handling

---

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

---

## Getting Started

### 1. Clone the repository
```sh
# Replace with your repo URL if needed
git clone <repo-url>
cd chat-genius-ios-clone-main
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up environment variables
Create a `.env` file in the project root:
```
VITE_API_BASE_URL=https://<your-vercel-project>.vercel.app
```

### 4. Start the frontend (development)
```sh
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Backend (Vercel Serverless Function)

1. Deploy the `/api/chat/chat-api.js` file to Vercel (auto-detected in `/api`).
2. In your Vercel dashboard, set the environment variable:
   - `OPENROUTER_API_KEY=sk-or-...` (your OpenRouter API key)
3. Redeploy your Vercel project after setting the variable.

---

## Production Build
To build for production:
```sh
npm run build
```
The output will be in the `dist/` folder. Deploy this to your static host (e.g., InfinityFree) if not using Vercel for frontend.

---

## Notes
- The AI backend only supports text input/output (no audio or file uploads).
- For Markdown rendering, the app uses `react-markdown`.
- To use a different backend, update `src/services/api.service.ts` and your `.env`.

---

## License
MIT
