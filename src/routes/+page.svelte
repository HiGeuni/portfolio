<script lang="ts">
  import { portfolio, routeMap } from '$lib/data/portfolio';
  import { hexAlpha, pickReadableInk } from '$lib/utils/theme';
  import BrutalistHeader from '$lib/components/BrutalistHeader.svelte';

  const D = portfolio;
  const accent = '#FFB454';
  const ink = '#0E0E0C';
  const paper = '#F2F0EA';
  const gridOpacity = 10;
  const gridSize = 80;
  const onAccent = pickReadableInk(accent, ink, paper);

  let scrollY = $state(0);

  const heroMeta = [
    { k: 'ROLE', v: 'Frontend Engineer' },
    { k: 'EXPERIENCE', v: '2 years · 2 startups' },
    { k: 'OWNERSHIP', v: 'Frontend-of-one' },
    { k: 'FOCUS', v: '0 → 1 · perf · canvas' },
  ];

  const timeline = [
    { y: '2018', t: 'ACM-ICPC Seoul Regional · Honorable Mention' },
    { y: '2021', t: 'B.S. Computer Science · Seoul Tech' },
    { y: '2021–2023', t: 'Computer Graphics Lab · Researcher' },
    { y: '2023', t: '1st-author paper · CIA (Computational Intelligence in Analytics)' },
    { y: '2023', t: '→ Kumo Factory · Frontend Engineer' },
    { y: '2024', t: '→ The Prestige · Frontend Engineer' },
    { y: '2025–', t: '→ Awarelab · Frontend Engineer' },
  ];

  const aboutCards = [
    {
      tag: 'PUBLICATION',
      title: 'CIA 2023',
      body: '1저자 논문. 컴퓨터 그래픽스 분야에서 좌표·기하 알고리즘을 다뤘고, 그 직관이 무한 캔버스 affine matrix 설계에 그대로 이어집니다.',
    },
    {
      tag: 'COMPETITION',
      title: 'ICPC · Honorable Mention',
      body: '2018 Seoul Regional. 제한 시간 안에 알고리즘을 설계·구현·디버깅하는 훈련 — 스타트업의 6주 마이그레이션 같은 압축된 환경에 그대로 쓰입니다.',
    },
    {
      tag: 'PRINCIPLE',
      title: '혼자 책임지는 프론트엔드',
      body: '두 회사 모두 디자인 시스템·CI/CD를 직접 세팅. 라이브러리가 막히면 직접 만들고, API 모양이 어색하면 백엔드와 다시 설계합니다.',
    },
  ];
</script>

<svelte:window bind:scrollY />

<div
  class="page-root"
  style="background-image: linear-gradient({ink}{hexAlpha(gridOpacity)} 1px, transparent 1px), linear-gradient(90deg, {ink}{hexAlpha(gridOpacity)} 1px, transparent 1px); background-size: {gridSize}px {gridSize}px;"
>
  <BrutalistHeader variant="home" />

  <!-- Hero -->
  <section class="hero">
    <div class="hero-meta">
      <span>① INDEX / 2026</span>
      <span class="hero-badge" style="background: {accent}; color: {onAccent};">● AVAILABLE FOR HIRE</span>
      <span>SEOUL · KR</span>
      <span class="hero-scroll">SCROLL · {Math.min(99, Math.round(scrollY / 30))}</span>
    </div>
    <h1 class="hero-title">
      Frontend<br />
      of one.<br />
      <span style="background: {accent}; color: {onAccent}; padding: 0 8px;">Zero to one.</span>
    </h1>
    <div class="hero-body">
      연구실에서 논문을 쓰고 ICPC 본선을 뛰던 사람이 스타트업으로 옮겨,<br />
      두 회사에서 프론트엔드를 <strong>혼자</strong> 설계·개발·배포했습니다.<br />
      <span style="background: {accent}; padding: 0 4px; color: {onAccent};">무한 캔버스, 60fps, Lighthouse 87</span> — 어려운 문제를 맡아 끝까지 해결합니다.
    </div>
    <div class="hero-grid">
      {#each heroMeta as item, i}
        <div class="hero-grid-cell" class:border-r={i < 3}>
          <div class="hero-grid-label">{item.k}</div>
          <div class="hero-grid-value">{item.v}</div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Ticker -->
  <section class="ticker">
    <div class="ticker-track">
      {#each [...D.highlights, ...D.highlights, ...D.highlights] as h, i (i)}
        <span class="ticker-item">
          <span class="ticker-metric">{h.metric}</span>
          <span>{h.label}</span>
          <span class="ticker-sep">—</span>
        </span>
      {/each}
    </div>
  </section>

  <!-- Selected Work -->
  <section id="work" class="section">
    <div class="section-head">
      <div class="section-label">② SELECTED WORK · 0 → 1</div>
      <div class="section-count">{D.projects.length} CASE STUDIES</div>
    </div>
    {#each D.projects as p, i}
      {@const target = routeMap[p.id]}
      <a
        href={target}
        class="project-row"
        class:project-row-last={i === D.projects.length - 1}
      >
        <div class="project-num">0{i + 1}</div>
        <div class="project-info">
          <div class="project-name-row">
            <div class="project-name">{p.name}</div>
            {#if target}
              <span class="case-badge">CASE STUDY</span>
            {/if}
          </div>
          <div class="project-tagline">{p.tagline}</div>
        </div>
        <div class="project-metrics">
          {#each p.metrics as m}
            <div class="metric-row">
              <span class="metric-key">{m.k}</span>
              <span class="metric-val">{m.v}</span>
            </div>
          {/each}
        </div>
        <div class="project-year">
          <div>{p.year} · {p.role}</div>
          <div class="project-arrow">→</div>
        </div>
      </a>
    {/each}
  </section>

  <!-- Experience -->
  <section id="exp" class="section">
    <div class="section-label">③ EXPERIENCE · 2 STARTUPS, FRONTEND-OF-ONE</div>
    <div class="exp-grid">
      {#each D.experience as e, i}
        <div class="exp-card" class:exp-card-offset={i > 0}>
          <div class="exp-period">{e.period}</div>
          <div class="exp-company">{e.company}</div>
          <div class="exp-role">{e.role}</div>
          <div class="exp-summary">{e.summary}</div>
          <div class="exp-stack">
            {#each e.stack as s}
              <span class="stack-tag">{s}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <div class="research-box">
      <span style="background: {accent}; padding: 0 6px; color: {onAccent};">RESEARCH BACKGROUND</span>
      &nbsp;&nbsp;Seoul Tech, Computer Graphics Lab · 2 years · 1st-author paper at CIA 2023 · ACM-ICPC Seoul Regional 2018, Honorable Mention
    </div>
  </section>

  <!-- About / Background -->
  <section id="about" class="section">
    <div class="section-label">④ BACKGROUND · BEFORE THE STARTUPS</div>

    <div class="about-grid">
      <div class="about-narrative">
        <h2 class="about-heading">
          From <span style="background: {accent}; color: {onAccent}; padding: 0 6px;">research</span> to <span style="background: {accent}; color: {onAccent}; padding: 0 6px;">shipping.</span>
        </h2>
        <div class="about-body">
          컴퓨터 그래픽스 연구실에서 2년을 보내며 1저자로 <strong>CIA 2023</strong>에 논문을 발표했고,
          ACM-ICPC Seoul Regional에서 <strong>Honorable Mention</strong>을 받았습니다.
          <br /><br />
          학교에서 배운 건 두 가지입니다 — <span style="background: {accent}; padding: 0 4px; color: {onAccent};">어려운 문제를 끝까지 파는 끈기</span>,
          그리고 <span style="background: {accent}; padding: 0 4px; color: {onAccent};">좌표 변환과 그래픽 수학</span>. 이 둘은 나중에 무한 캔버스를 직접 만들 때 가장 큰 자산이 됐습니다.
          <br /><br />
          스타트업으로 옮긴 뒤로는 <strong>혼자 책임지는 프론트엔드</strong>를 두 번 경험했습니다.
          디자인 시스템 부재, CI/CD 부재, 레거시 마이그레이션 — 어려운 시작점일수록 한 사람이 끝까지 가져가는 게 빠르다는 걸 배웠습니다.
        </div>
      </div>
      <div class="about-timeline">
        <div class="timeline-label">TIMELINE</div>
        {#each timeline as row, i}
          <div class="timeline-row" class:timeline-row-first={i === 0}>
            <span class="timeline-year">{row.y}</span>
            <span>{row.t}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="about-cards">
      {#each aboutCards as c, i}
        <div class="about-card" class:border-r={i < 2}>
          <div class="card-tag">{c.tag}</div>
          <div class="card-title">
            <span style="background: {accent}; color: {onAccent}; padding: 0 4px;">{c.title}</span>
          </div>
          <div class="card-body">{c.body}</div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Stack -->
  <section id="stack" class="section">
    <div class="section-label">⑤ STACK</div>
    <div class="stack-grid">
      {#each Object.entries(D.skills) as [cat, items], i}
        <div class="stack-col" class:border-r={i < 4}>
          <div class="stack-cat">{cat.toUpperCase()}</div>
          {#each items as s}
            <div class="stack-item">{s}</div>
          {/each}
        </div>
      {/each}
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="contact-section">
    <div class="contact-label">⑥ CONTACT</div>
    <h2 class="contact-heading">
      Let's build<br />something <span style="color: {accent};">from 0.</span>
    </h2>
    <div class="contact-grid">
      <div>
        <div class="contact-key">EMAIL</div>
        <div class="contact-val">{D.email}</div>
      </div>
      <div>
        <div class="contact-key">PHONE</div>
        <div class="contact-val">{D.phone}</div>
      </div>
      <div>
        <div class="contact-key">SITE</div>
        <div class="contact-val">{D.site}</div>
      </div>
    </div>
    <div class="contact-footer">
      <span>© 2026 HIGEUNI · 김효근</span>
      <span>BUILT WITH GRID + MONOSPACE</span>
    </div>
  </section>
</div>

<style>
  .page-root {
    min-height: 100vh;
    position: relative;
    background-color: var(--paper);
    color: var(--ink);
    font-family: var(--font-display);
  }

  /* Hero */
  .hero {
    padding: 100px 40px 72px;
    border-bottom: 2px solid var(--ink);
  }
  .hero-meta {
    font-family: var(--font-mono);
    font-size: 12px;
    margin-bottom: 28px;
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }
  .hero-badge {
    padding: 2px 8px;
  }
  .hero-scroll {
    margin-left: auto;
    opacity: 0.5;
  }
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(72px, 14vw, 196px);
    line-height: 0.86;
    font-weight: 800;
    letter-spacing: -0.045em;
    margin: 0;
    text-transform: uppercase;
  }
  .hero-body {
    margin-top: 40px;
    max-width: 760px;
    font-family: var(--font-mono);
    font-size: 16px;
    line-height: 1.7;
  }
  .hero-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    margin-top: 72px;
    border-top: 2px solid var(--ink);
  }
  .hero-grid-cell {
    padding: 20px 24px;
    font-family: var(--font-mono);
  }
  .hero-grid-cell.border-r {
    border-right: 2px solid var(--ink);
  }
  .hero-grid-label {
    font-size: 11px;
    opacity: 0.5;
  }
  .hero-grid-value {
    font-size: 18px;
    margin-top: 6px;
    font-weight: 600;
  }

  /* Ticker */
  .ticker {
    border-bottom: 2px solid var(--ink);
    background: var(--ink);
    color: var(--paper);
    overflow: hidden;
  }
  .ticker-track {
    display: flex;
    padding: 20px 0;
    font-family: var(--font-mono);
    font-size: 16px;
    white-space: nowrap;
    animation: homeTicker 30s linear infinite;
  }
  .ticker-item {
    padding: 0 32px;
    display: inline-flex;
    gap: 12px;
    align-items: center;
  }
  .ticker-metric {
    color: var(--accent);
    font-weight: 700;
  }
  .ticker-sep {
    opacity: 0.4;
  }

  /* Sections */
  .section {
    padding: 72px 40px;
    border-bottom: 2px solid var(--ink);
  }
  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 32px;
  }
  .section-label {
    font-family: var(--font-mono);
    font-size: 12px;
    margin-bottom: 32px;
  }
  .section-count {
    font-family: var(--font-mono);
    font-size: 11px;
    opacity: 0.5;
  }

  /* Projects */
  .project-row {
    display: grid;
    grid-template-columns: 60px 1fr 280px 200px;
    border-top: 2px solid var(--ink);
    padding: 32px 0;
    align-items: start;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    color: var(--ink);
    text-decoration: none;
  }
  .project-row:hover {
    background: var(--accent);
  }
  .project-row-last {
    border-bottom: 2px solid var(--ink);
  }
  .project-num {
    font-family: var(--font-mono);
    font-size: 12px;
    padding-top: 8px;
  }
  .project-name-row {
    display: flex;
    align-items: baseline;
    gap: 12px;
  }
  .project-name {
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .case-badge {
    font-family: var(--font-mono);
    font-size: 10px;
    padding: 2px 6px;
    border: 1.5px solid currentColor;
  }
  .project-tagline {
    font-family: var(--font-mono);
    font-size: 13px;
    margin-top: 10px;
    opacity: 0.8;
  }
  .project-metrics {
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.6;
  }
  .metric-row {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed currentColor;
    opacity: 0.85;
  }
  .metric-key {
    opacity: 0.7;
  }
  .metric-val {
    font-weight: 700;
  }
  .project-year {
    font-family: var(--font-mono);
    font-size: 11px;
    text-align: right;
  }
  .project-arrow {
    margin-top: 12px;
    font-size: 22px;
  }

  /* Experience */
  .exp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .exp-card {
    padding: 28px;
    border: 2px solid var(--ink);
    background: var(--paper);
  }
  .exp-card-offset {
    margin-left: -2px;
  }
  .exp-period {
    font-family: var(--font-mono);
    font-size: 11px;
    opacity: 0.6;
  }
  .exp-company {
    font-size: 32px;
    font-weight: 700;
    margin-top: 8px;
    letter-spacing: -0.02em;
  }
  .exp-role {
    font-family: var(--font-mono);
    font-size: 13px;
    margin-top: 4px;
  }
  .exp-summary {
    font-size: 14px;
    margin-top: 16px;
    line-height: 1.6;
  }
  .exp-stack {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  .stack-tag {
    font-family: var(--font-mono);
    font-size: 10px;
    padding: 2px 6px;
    border: 1px solid var(--ink);
  }
  .research-box {
    margin-top: 32px;
    font-family: var(--font-mono);
    font-size: 12px;
    padding: 20px;
    border: 2px dashed var(--ink);
  }

  /* About */
  .about-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 0;
    border: 2px solid var(--ink);
  }
  .about-narrative {
    padding: 32px;
    border-right: 2px solid var(--ink);
  }
  .about-heading {
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 700;
    line-height: 1.0;
    letter-spacing: -0.03em;
    margin: 0;
  }
  .about-body {
    margin-top: 24px;
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.8;
  }
  .about-timeline {
    padding: 32px;
    font-family: var(--font-mono);
    font-size: 13px;
  }
  .timeline-label {
    font-size: 11px;
    opacity: 0.5;
    margin-bottom: 16px;
    letter-spacing: 0.1em;
  }
  .timeline-row {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 12px;
    padding: 10px 0;
    border-top: 1px solid color-mix(in srgb, var(--ink) 20%, transparent);
  }
  .timeline-row-first {
    border-top: none;
  }
  .timeline-year {
    opacity: 0.6;
  }
  .about-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    margin-top: 24px;
    border: 2px solid var(--ink);
  }
  .about-card {
    padding: 24px;
  }
  .about-card.border-r {
    border-right: 2px solid var(--ink);
  }
  .card-tag {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    opacity: 0.5;
  }
  .card-title {
    font-size: 22px;
    font-weight: 700;
    margin-top: 8px;
    letter-spacing: -0.01em;
  }
  .card-body {
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.7;
    margin-top: 12px;
  }

  /* Stack */
  .stack-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border: 2px solid var(--ink);
  }
  .stack-col {
    padding: 20px;
  }
  .stack-col.border-r {
    border-right: 2px solid var(--ink);
  }
  .stack-cat {
    font-family: var(--font-mono);
    font-size: 11px;
    opacity: 0.5;
    margin-bottom: 12px;
  }
  .stack-item {
    font-size: 16px;
    line-height: 1.6;
    font-weight: 500;
  }

  /* Contact */
  .contact-section {
    padding: 100px 40px;
    background: var(--ink);
    color: var(--paper);
  }
  .contact-label {
    font-family: var(--font-mono);
    font-size: 12px;
    margin-bottom: 24px;
    color: var(--accent);
  }
  .contact-heading {
    font-size: clamp(56px, 10vw, 120px);
    font-weight: 800;
    line-height: 0.9;
    letter-spacing: -0.03em;
    margin: 0;
  }
  .contact-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 56px;
    font-family: var(--font-mono);
    font-size: 14px;
  }
  .contact-key {
    opacity: 0.5;
    font-size: 11px;
  }
  .contact-val {
    margin-top: 6px;
    font-size: 17px;
  }
  .contact-footer {
    margin-top: 56px;
    font-family: var(--font-mono);
    font-size: 11px;
    display: flex;
    justify-content: space-between;
    opacity: 0.5;
  }

  /* Mobile */
  @media (max-width: 760px) {
    .hero {
      padding: 60px 20px 48px;
    }
    .hero-meta {
      gap: 16px;
      font-size: 11px;
    }
    .hero-scroll {
      display: none;
    }
    .hero-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .hero-grid-cell:nth-child(1),
    .hero-grid-cell:nth-child(3) {
      border-right: 2px solid var(--ink);
    }
    .hero-grid-cell:nth-child(2) {
      border-right: none;
    }
    .hero-grid-cell:nth-child(1),
    .hero-grid-cell:nth-child(2) {
      border-bottom: 2px solid var(--ink);
    }
    .hero-body {
      font-size: 14px;
    }
    .section {
      padding: 48px 20px;
    }
    .project-row {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .project-num {
      padding-top: 0;
    }
    .project-name {
      font-size: 32px;
    }
    .project-metrics {
      max-width: 280px;
    }
    .project-year {
      text-align: left;
    }
    .project-arrow {
      display: inline;
      margin-top: 0;
      margin-left: 8px;
    }
    .exp-grid {
      grid-template-columns: 1fr;
    }
    .exp-card-offset {
      margin-left: 0;
      margin-top: -2px;
    }
    .about-grid {
      grid-template-columns: 1fr;
    }
    .about-narrative {
      border-right: none;
      border-bottom: 2px solid var(--ink);
    }
    .about-cards {
      grid-template-columns: 1fr;
    }
    .about-card.border-r {
      border-right: none;
      border-bottom: 2px solid var(--ink);
    }
    .stack-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .stack-col:nth-child(odd) {
      border-right: 2px solid var(--ink);
    }
    .stack-col:nth-child(even).border-r {
      border-right: none;
    }
    .stack-col:not(:nth-last-child(-n+2)) {
      border-bottom: 2px solid var(--ink);
    }
    .contact-section {
      padding: 60px 20px;
    }
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .contact-footer {
      flex-direction: column;
      gap: 8px;
    }
    .timeline-row {
      grid-template-columns: 90px 1fr;
    }
  }

  @media (max-width: 480px) {
    .hero {
      padding: 40px 16px 32px;
    }
    .hero-title {
      font-size: clamp(48px, 12vw, 72px);
    }
    .hero-body {
      font-size: 13px;
    }
    .hero-grid {
      grid-template-columns: 1fr;
    }
    .hero-grid-cell.border-r {
      border-right: none;
    }
    .hero-grid-cell:not(:last-child) {
      border-bottom: 2px solid var(--ink);
    }
    .section {
      padding: 36px 16px;
    }
    .project-name {
      font-size: 24px;
    }
    .exp-company {
      font-size: 24px;
    }
    .exp-card {
      padding: 20px;
    }
    .ticker-track {
      font-size: 13px;
    }
    .about-narrative,
    .about-timeline {
      padding: 20px;
    }
    .about-body {
      font-size: 13px;
    }
    .about-card {
      padding: 16px;
    }
    .stack-grid {
      grid-template-columns: 1fr;
    }
    .stack-col.border-r {
      border-right: none;
    }
    .stack-col:not(:last-child) {
      border-bottom: 2px solid var(--ink);
    }
    .contact-section {
      padding: 48px 16px;
    }
    .contact-heading {
      font-size: clamp(40px, 10vw, 56px);
    }
    .contact-val {
      font-size: 14px;
    }
    .about-heading {
      font-size: clamp(28px, 6vw, 36px);
    }
    .card-title {
      font-size: 18px;
    }
    .research-box {
      font-size: 11px;
      padding: 16px;
    }
  }
</style>
