# ChatAi

## Project Overview

**ChatAi** is a modern, responsive AI chat application powered by the Google Gemini API. It is built using the following technologies:
- React (with TypeScript)
- Vite (for blazing-fast development and builds)
- Tailwind CSS (for modern, customizable styles)
- Google Gemini API (for AI chat functionality)
- Modern CSS for custom styling

This project provides a friendly chat interface with support for streaming AI responses, theming, and a responsive layout. The codebase is cleanly structured and leverages React best practices.

---

## About the Developer

<img src="![image3](image3)" alt="Sumit Patil Profile Screenshot" style="max-width: 600px; border-radius: 10px; margin-bottom: 1rem;" />

**Sumit Patil**  
Web Developer | AI Enthusiast  

- [X](https://x.com/)
- [LinkedIn](https://www.linkedin.com/in/sumit-patil-582877240/)
- [GitHub](https://github.com/SUMIT9370)
- [LeetCode](https://leetcode.com/)

This chat application was built as a modern, responsive AI chat interface using the following technologies:
- React
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini API
- Modern CSS

For more details or to connect, use the links above!

### Screenshots

| Chat Home | Fun Fact Example | About Page | Empty Chat |
|-----------|------------------|------------|------------|
| ![image1](image1) | ![image2](image2) | ![image3](image3) | ![image4](image4) |

---

## Features

- **Fast, reactive UI** powered by Vite and React.
- **Beautiful design** using Tailwind CSS and custom fonts.
- **Google Gemini AI integration:** Simply add your Gemini API key to get started.
- **Sidebar navigation and About page** for project and developer info.
- **Modern CSS scrollbars and responsive layout**.
- **Easy customization** for fonts and background.

## Installation & Usage

### 1. Clone the repository

```bash
git clone https://github.com/SUMIT9370/ChatAi.git
cd ChatAi
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up your Google Gemini API key

- **For development:**  
  Create a `.env` file in the root directory and add your Gemini API key:
  ```
  GEMINI_API_KEY=YOUR_ACTUAL_API_KEY
  ```
  Or, for a quick test, you can set the key directly in `index.html` as:
  ```html
  <script>window.process = { env: { API_KEY: "YOUR_ACTUAL_API_KEY" } }</script>
  ```
- **For build environments (Vite):**  
  The project uses Vite’s environment variable mechanism. Make sure your `.env` is present before building or running.

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
```

- Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production

```bash
npm run build
# or
yarn build
```

Then, preview with:
```bash
npm run preview
# or
yarn preview
```

---

## Extending the Project

- **Change fonts/background:** Edit `App.tsx` for font selection and background image.
- **Edit About page:** Update `components/AboutPage.tsx` for developer info or technologies.
- **Add new AI models:** Update model name in `App.tsx` where `GoogleGenAI` is initialized.

---

## Troubleshooting

- **API Key not working:** Ensure your API key is valid and has access to the Gemini model. Check the browser console for error messages.
- **Build errors:** Make sure dependencies are installed and the correct Node version is being used.

---

For more details, see the [GitHub repo](https://github.com/SUMIT9370/ChatAi).
