# Erin Maria Bobin — Academic Web Portfolio

> **Assessment Submission:** Web Portfolio Assessment (Due 30th)  
> **Student:** Erin Maria Bobin  
> **Branch & Specialisation:** B.Tech — Computer Science and Engineering (AI & Data Engineering)  
> **Institution:** Vellore Institute of Technology (VIT), Vellore  
> **Registration Number:** `26BDE0039`  
> **GitHub:** [https://github.com/erinbreaks](https://github.com/erinbreaks)  
> **Design Inspiration:** Inspired by [Matt Chapman's GitHub Portfolio](https://mattschapman.github.io/) (Academic Minimalist Jekyll Style) with elevated modern responsiveness, dynamic filtering, and print-ready VTOP formatting.

---

## 🎯 Alignment with Course Assessment Format

This web portfolio strictly adheres to the mandated 5-section evaluation structure:

| Section | Title | Content Highlights |
| :--- | :--- | :--- |
| **Section A** | **Introduction to Portfolio** | Academic profile at VIT Vellore, registration number `26BDE0039`, learning philosophy, AWS Student Builder engagement, and 6 core domains of interest. |
| **Section B** | **Introduction to Important Projects** | Comprehensive breakdown of **all 7 projects**: *SamjanSetu* (Top 24/120 Hackathon), *EntryX*, *Iris Classification*, *MediCycle*, *Cyberbrew*, *VIT Student Marketplace*, and *Smart Medicine Safety Box (MDP)*. Equipped with interactive category filters, tech shields, architecture points, and links. |
| **Section C** | **Important Classes Attended / Courses** | *Data Alchemy 4.0* (Agentic AI & Multi-Agent systems), *Celestia 2.0* (Prompt Engineering & 24h Hackathon), Hackathon project-based engineering, and self-directed learning roadmap. |
| **Section D** | **Publications & Writing Assessments** | Showcase of writing & communication prowess: Student Editorial Board milestone interviewing **IAS Officer T. V. Anupama**, **Model United Nations (Best Delegate — Kerala chapter)**, and statement on academic publications. |
| **Section E** | **Short Resume** | Printable Curriculum Vitae featuring ICSE (98.6% — top 0.1% CS), ISC (97.25%), Skills Matrix, Positions of Responsibility, Olympiad ranks (IEO Int Rank 3, ASISC Regional Rank 1), and CISCE National Sports honors. |

*(Note: In accordance with course guidelines, the teaching experience section has been omitted).*

---

## 🚀 Innovative & Standout Features

1. **Academic Minimalist Design (Matt Chapman Style):**
   - Clean split-layout with a sticky left sidebar containing avatar monogram, registration metadata, quick actions, and GitHub links.
   - Main content column featuring shields.io tech badges, crisp typographic hierarchy, and clean section dividers.
2. **Interactive Project Filtering:**
   - Filter projects on-the-fly by `All Projects (7)`, `AI & Machine Learning`, `Web Development`, `Social Impact & Health`, and `Python & IoT`.
3. **Dedicated Print-to-PDF Engine for VTOP:**
   - Single-click **"Print / Export PDF for VTOP"** button.
   - Built-in `@media print` CSS cleanly strips web navigation bars, theme toggles, and screen-only elements, delivering an immaculate, formal document formatted for PDF export and direct VTOP upload.
4. **ScrollSpy Navigation:**
   - The sidebar highlights the current section as the evaluator scrolls through the portfolio.
5. **Light / Dark Mode:**
   - Clean academic light mode (default) and GitHub dark mode with local storage state preservation.
6. **Zero Dependencies & Blazing Speed:**
   - Pure semantic HTML5, modern CSS3 variables, and vanilla JavaScript. No heavy external frameworks required, ensuring instant load time.

---

## 💻 How to View Locally

1. Navigate to this directory:
   ```powershell
   cd C:\Users\erinb\.gemini\antigravity\scratch\erin-web-portfolio
   ```
2. Double-click `index.html` or open it with your browser:
   ```powershell
   Start-Process "chrome.exe" "index.html"
   # or
   Start-Process "index.html"
   ```

---

## 🖨️ How to Export as PDF for VTOP Submission

1. Open `index.html` in your web browser (Chrome, Edge, Firefox, or Safari).
2. Click the **"Print / Export PDF for VTOP"** button in the top banner or sidebar (or press `Ctrl + P` / `Cmd + P`).
3. In the print dialog:
   - **Destination:** Select **Save as PDF**.
   - **Pages:** All.
   - **Layout:** Portrait.
   - **Options:** Uncheck "Headers and footers" for a clean academic paper look.
4. Click **Save** and name your file `Erin_Maria_Bobin_26BDE0039_Web_Portfolio.pdf`.
5. Upload the resulting PDF directly to VTOP or paste the link into a Word document as instructed!

---

## 🌐 How to Deploy for Free to GitHub Pages (Live URL)

To get a public link like `https://erinbreaks.github.io/web-portfolio` or `https://erinbreaks.github.io`:

1. **Option 1: In a new repository `web-portfolio`:**
   ```bash
   cd C:\Users\erinb\.gemini\antigravity\scratch\erin-web-portfolio
   git init
   git add .
   git commit -m "Initial commit: Academic Web Portfolio for Erin Maria Bobin"
   git branch -M main
   # Create a repo named 'web-portfolio' on your GitHub (https://github.com/new)
   git remote add origin https://github.com/erinbreaks/web-portfolio.git
   git push -u origin main
   ```
   - Go to your repository settings on GitHub: **Settings → Pages**.
   - Under **Source**, choose `Deploy from a branch` → select `main` / `root` → click **Save**.
   - Your live website will be live in 60 seconds at:  
     `https://erinbreaks.github.io/web-portfolio/`

2. **Option 2: Direct User Site (`erinbreaks.github.io`):**
   - If you create the repo named `erinbreaks.github.io`, your site will be hosted directly at `https://erinbreaks.github.io/`!

---

## 📁 Project Structure

```text
erin-web-portfolio/
├── index.html       # Primary semantic HTML5 portfolio document
├── style.css        # Academic minimal styling + responsive + print styles
├── script.js        # Dynamic filtering, ScrollSpy, theme toggle, print triggers
└── README.md        # Documentation, submission instructions, and deployment guide
```
