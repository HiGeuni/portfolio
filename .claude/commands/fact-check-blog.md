# Fact-Check Blog Content

Cross-reference all blog content in `src/lib/data/blog-content.ts` against the source of truth files in `/Users/higeuni/00_Personal_Information/`.

## Source Files
- `01_Profile/wanted-resume.md` — canonical resume
- `02_Career/` — detailed career history per company
- `03_Projects/` — project documentation with exact metrics
- `04_Stories/` — STAR-format stories for context
- `06_Resume/resume_master.md` — master resume

## Validation Checklist

### Company Names
- [ ] "Daqda" (NOT "Doquda", "다큐다" in Korean)
- [ ] "Awarelab" (correct spelling, no variations)

### Dates & Periods
- [ ] Awarelab: 2025.04 — 2026.03 (11 months)
- [ ] Daqda: 2024.06 — 2025.03 (10 months)
- [ ] Kumo Factory: Software Maestro 14th (2023)
- [ ] The Prestige: Daqda period (2024)

### Exact Metrics (must match source)
- [ ] Bundle: 253KB → 136KB (46% reduction)
- [ ] Lighthouse: 52 → 87
- [ ] LCP: 9-10s → 3.8s (main page, NOT payment page)
- [ ] CLS: 0.126 → 0
- [ ] Deploy time: 10min → 2min (80% reduction)
- [ ] Pages migrated: 8 pages in 6 weeks
- [ ] Feature deletions: 0
- [ ] Zustand slices: 5 (Common, Service, Area, Line, Option)
- [ ] Memory reduction: 30%
- [ ] API call reduction: 50%
- [ ] SSE latency: <100ms
- [ ] Framerate: 60fps
- [ ] TipTap extensions: 12

### Known Past Mistakes (check these are NOT present)
- [ ] React `key={i}` syntax (should be Svelte keyed each)
- [ ] Old company name "Doquda" anywhere
- [ ] LCP attributed to payment page (should be main page)
- [ ] Incorrect B.S. graduation year
- [ ] Incorrect ACM-ICPC year
- [ ] "available 2026" or "Present" for past employment

### Role Titles
- [ ] Awarelab: "Frontend Engineer" (NOT "Lead Software Engineer")
- [ ] Consistent role titles between blog content and portfolio data

### Tech Stack Names
- [ ] react-zoom-pan-pinch (correct casing)
- [ ] @next/bundle-analyzer (correct package name)
- [ ] Zustand (capital Z)
- [ ] TipTap (correct casing)
- [ ] ProseMirror (correct casing)
- [ ] GSAP (all caps)
- [ ] Recoil (capital R)
- [ ] Vercel (capital V)
- [ ] Stripe (capital S)
- [ ] Directus (capital D)

## Process
1. Read `src/lib/data/blog-content.ts`
2. For each blog post, cross-reference claims against the source files
3. Report any mismatches with: file, line, expected value, found value
4. Report PASS if all checks pass

## Output Format
```
POST: [slug]
  [PASS] or [FAIL: description of mismatch]
  ...

SUMMARY: X/Y checks passed
```
