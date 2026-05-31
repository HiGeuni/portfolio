# Portfolio Project Guidelines

## Harness Rules — Mistake Prevention

### Data Accuracy Rules
1. **Company name**: "Daqda" (NOT "Doquda", "다큐다" in Korean)
2. **Experience periods**:
   - Awarelab: 2025.04 — 2026.03 (11 months)
   - Daqda: 2024.06 — 2025.03 (10 months)
3. **Metrics must match source**: Always cross-reference with `/Users/higeuni/00_Personal_Information/03_Projects/` for exact numbers
   - Bundle: 253KB → 136KB (46%)
   - Lighthouse: 52 → 87
   - LCP: 9-10s → 3.8s
   - CLS: 0.126 → 0
   - Deploy: 10min → 2min (80%)
4. **Svelte 5 syntax**: Use `$state`, `$derived`, `$props`, `$effect` — NOT Svelte 4 stores or reactive declarations
5. **Color palette (Iridescent)**: bg=#0C0D10, text=#ECEEF2, dim=#7C828E, line=#23252C, mint=#7FE9E1
   - NEVER use old colors: #0A1024, #EEF2FB, #7A8BAA, #1B2747, #9BD9C5
6. **Keyed each blocks**: Svelte uses `{#each arr as item (key)}`, NOT `key={i}` (React/Vue syntax)
7. **Font stack**: Space Grotesk (sans), Instrument Serif (serif), JetBrains Mono (mono)

### Known Past Mistakes (learn from these)
- Used React `key={i}` syntax in Svelte ticker — fixed to `(i)` keyed each block
- SVG zoom: calculated world point AFTER scale change instead of BEFORE — order matters
- SVG `toWorld`: used `* scale` instead of `getBoundingClientRect()` ratio for `width="100%"` SVGs
- Used old company name "Doquda" instead of "Daqda"
- Hardcoded old color #EEF2FB in multiple files when palette changed to #ECEEF2
- B.S. graduation year showed "2021" instead of "2024" — always verify dates against resume_master.md
- ACM-ICPC year showed "2018" instead of "2023" — 5-year error that destroys credibility
- Awarelab period said "Present" after employment ended 2026.03 — never claim current employment at a past job
- Role title inconsistency: portfolio.ts had "Lead Software Engineer" while translations had "Frontend Engineer" — unified to "Frontend Engineer"
- "available 2026" was stale/ambiguous after leaving job — changed to "open to work"
- Awarelab LCP 문제는 "결제 페이지"가 아니라 "메인 페이지"에서 발생 — problemQ를 "왜 메인에서 LCP가 9초가 나올까?"로 수정

### Content Accuracy Checklist
When modifying portfolio content, verify against source of truth at `/Users/higeuni/00_Personal_Information/`:
- `01_Profile/wanted-resume.md` — canonical resume
- `02_Career/` — detailed career history per company
- `03_Projects/` — project documentation with exact metrics
- `04_Stories/` — STAR-format stories for context
- `06_Resume/resume_master.md` — master resume

### Design System
- Global CSS vars defined in `src/routes/layout.css`
- `.grad-text` class for gradient text (global)
- `<Glass>` component for glassmorphism cards
- `<Aurora>` for background blobs
- `<Nav>` for header with mobile hamburger
- Breakpoints: 760px (tablet), 480px (mobile)
