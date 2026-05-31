# Portfolio HR Review Skill

HR/채용 담당자 및 시니어 엔지니어 관점에서 포트폴리오 사이트를 다각도로 평가하고 개선점을 제시합니다.

## Review Process

### Phase 1: Data Accuracy Check
개인 정보 소스(`/Users/higeuni/00_Personal_Information/`)와 포트폴리오 데이터 파일을 비교하여 사실 관계 오류를 찾습니다.

1. Read source of truth files:
   - `/Users/higeuni/00_Personal_Information/01_Profile/wanted-resume.md`
   - `/Users/higeuni/00_Personal_Information/02_Career/career_awarelab.md`
   - `/Users/higeuni/00_Personal_Information/02_Career/career_daqda.md`
   - `/Users/higeuni/00_Personal_Information/03_Projects/` (all project files)
   - `/Users/higeuni/00_Personal_Information/06_Resume/resume_master.md`

2. Read portfolio data files:
   - `src/lib/data/portfolio.ts`
   - `src/lib/data/cases.ts`
   - `src/lib/data/blog.ts`

3. Cross-reference and report:
   - Company names, dates, roles
   - Metric numbers (before/after)
   - Tech stacks per project
   - Education details
   - Any claims not backed by source data

### Phase 2: HR Perspective Review

Evaluate from 5 HR dimensions:

#### 2-1. First Impression (첫인상) — 10s Test
- Is the hero section compelling enough to keep reading?
- Does the tagline communicate value clearly?
- Is the positioning differentiated from "generic React developer"?

#### 2-2. Problem-Solving Narrative (문제 해결 서사)
- Does each project tell a clear Problem → Decision → Result story?
- Are the "why" explanations convincing?
- Do the decisions show engineering judgment, not just execution?

#### 2-3. Quantified Impact (정량적 임팩트)
- Are all metrics specific and verifiable?
- Do before/after comparisons exist for key claims?
- Is business impact connected to technical work?

#### 2-4. Technical Depth (기술적 깊이)
- Do code examples demonstrate real understanding?
- Are architectural decisions well-reasoned?
- Is there evidence of going beyond framework defaults?

#### 2-5. Growth Signal (성장 가능성)
- Is there a clear trajectory from academic → industry?
- Does the portfolio show learning and adaptation?
- Are there signs of leadership (driving API design, proposing migrations)?

### Phase 3: Competitive Analysis

Compare against what top frontend engineer portfolios typically include:
- Personal brand clarity
- Open source contributions or public writing
- Interactive demos that showcase skills
- Mobile responsiveness
- Page load performance

### Phase 4: Red Flags Check

Look for things that would make HR hesitate:
- Vague claims without evidence
- Inconsistent dates or overlapping positions
- Missing contact information
- Broken links or placeholder content
- Spelling/grammar errors in Korean or English
- "Available 2026" — is this accurate and appropriate?

### Phase 5: Actionable Recommendations

Output a prioritized list:
1. **CRITICAL** — Things that could cause rejection
2. **HIGH** — Things that weaken the impression significantly
3. **MEDIUM** — Nice-to-have improvements
4. **LOW** — Polish items

## Output Format

```
## Portfolio HR Review Report

### Data Accuracy: ✅/⚠️/❌
[Findings]

### First Impression: [Score /10]
[Analysis]

### Problem-Solving Narrative: [Score /10]
[Analysis]

### Quantified Impact: [Score /10]
[Analysis]

### Technical Depth: [Score /10]
[Analysis]

### Growth Signal: [Score /10]
[Analysis]

### Red Flags: [Count]
[List]

### Recommendations (prioritized)
[CRITICAL → HIGH → MEDIUM → LOW]
```
