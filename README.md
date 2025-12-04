# 🚀 MICROVERSE-MVP — Team README

## 👥 Team Members

| Member       | Role and Responsibilities |
|--------------|----------------------------|
| **Oleg**      | Architect and team lead. Defines tasks, drives compliance, UX, and automation. |
| **Copilot**   | Technical navigator. Automates, builds scripts, validates logic, fixes bugs, and provides step-by-step instructions. |
| **Grok**      | Idea generator and alternative thinker. Great for brainstorming, unconventional approaches, and hypothesis testing. |
| **DeepSeek**  | Analyst and optimizer. Strong in deep analysis, algorithmic improvements, bottleneck detection, and performance tuning. |
| **ChatGPT**   | Refactoring assistant. Excellent at error removal, code cleanup, and readability improvements. Useful for debugging and rewriting complex sections. |

---

## 🔄 Workflow

1. **Oleg defines the task** → e.g., “Fix the BackButton bug.”
2. **Copilot delivers a canonical fix** → production-ready script or code.
3. **Grok suggests alternatives** → different implementation or creative approach.
4. **DeepSeek analyzes and optimizes** → performance, architecture, and improvement suggestions.
5. **ChatGPT refactors and debugs** → removes errors, rewrites complex logic, improves clarity.
6. **Team validates the result** → test, verify, and document in README.

---

## 📂 Scripts

| Script             | Purpose |
|--------------------|---------|
| `Setup-DevEnv.ps1` | Main bootstrapper. Creates missing compliance files, inserts `"use client"` directives, and adds LegalNoticeRU. Use for initial setup or environment reset. |
| `fix-all.ps1`      | Fast auto-fixer. Adds BackButton, ConsentBanner, translates `/terms`, inserts LegalNoticeRU in `privacy.tsx` and `about.tsx`, and fixes dynamic import in `play.tsx`. Use for bug fixes and UX corrections. |

---

## ✅ How to Run

- **Project bootstrap**:
  ```powershell
  .\Setup-DevEnv.ps1
