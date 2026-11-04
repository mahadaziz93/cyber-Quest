# CyberQuest V2 – Interactive Cybersecurity Learning Prototype

**CyberQuest V2** is a modern, gamified cybersecurity learning platform designed for university students to recognize modern phishing emails and online scams through practical, interactive scenarios.

---

## 🎯 Educational Mission & Core Design

University students are frequently targeted by threat actors using bursar refund scams, spear-phishing faculty impersonation, library fine extortions, and fraudulent credential harvesting. CyberQuest gives students a safe simulator to build reflexive security habits:

- **Clean White & Dark Navy Palette**: Professional educational technology UI with high-contrast typography, electric blue accents, and clean visual hierarchy.
- **Realistic Simulated Webmail**: Recreates a modern campus webmail inbox (`alex.morgan@stateuni.edu`) with external sender security alerts, interactive header inspectors, and preview toolbars.
- **Link Hover & Destination Inspector**: Students can hover over or tap fictional links to reveal the actual destination server vs. the displayed anchor text before making a decision.
- **Investigator Clue System**: Students can click on suspected red flags (sender domains, artificial deadlines, payment channels) to earn bonus investigator XP.
- **Actionable Student Takeaways**: Immediate feedback explains not just *why* an email is risky, but provides a step-by-step student action plan (e.g., out-of-band verification via `my.stateuni.edu`).

---

## 📚 5 Realistic University Scenarios

| # | Scenario Title | Category | Verdict | Core Learning Objective |
|---|---|---|---|---|
| **1** | **Bursar Tuition Refund Balance** | Financial Aid Scam | **Suspicious** | Spot lookalike sender domains (`campus-edu-portal-support.com`) and masked credential harvesting links disguised as refunds. |
| **2** | **University IT Duo MFA Upgrade** | Campus IT Notice | **Genuine** | Recognize official IT maintenance notices: verified `.stateuni.edu` domain, verifiable physical support office, and zero credential requests. |
| **3** | **Professor Research Grant Gift Cards** | Spear Phishing / BEC | **Suspicious** | Detect professor impersonation via free `@gmail.com` accounts, non-refundable gift card demands, and artificial urgency. |
| **4** | **Library Overdue Book Fine Notice** | Fine Extortion | **Suspicious** | Identify disproportionate threats (immediate account & Wi-Fi freeze) and third-party checkout URLs (`.xyz`). |
| **5** | **STEM & Business Career Fair RSVP** | Student Affairs | **Genuine** | Recognize authentic event confirmations, safe Single Sign-On campus partner links (`joinhandshake.com`), and supportive tone. |

---

## 🏆 Gamification & Scoring

- **+100 XP**: Correct classification decision (Genuine vs. Suspicious)
- **+10 XP**: Each clue actively investigated
- **Streak Multiplier**: Tracks consecutive correct threat evaluations
- **Certification Badges**:
  - **Master Cyber Sentinel** (5/5 Correct): Flawless Security Instinct
  - **Eagle Eye Defender** (4/5 Correct): High Threat Vigilance
  - **Security Apprentice** (3/5 Correct): Solid Fundamentals
  - **Cyber Cadet** (<3 Correct): Training Recommended

---

## 🚀 Running the Prototype

The prototype runs with Vite and React 19:

```bash
# Install dependencies (already installed)
npm install

# Start the interactive development server
npm run dev

# Build production bundle
npm run build
```

Open `http://localhost:5173/` in any modern desktop or mobile browser.
