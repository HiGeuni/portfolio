<script lang="ts">
  import { portfolioKo, portfolioEn } from '$lib/data/portfolio';
  import { locale } from '$lib/i18n/runes.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import Glass from '$lib/components/Glass.svelte';

  const D = $derived(locale.current === 'ko' ? portfolioKo : portfolioEn);

</script>

<svelte:head>
  <title>Higeuni — Frontend Engineer</title>
</svelte:head>

<Nav active="work" />

<!-- Hero -->
<section class="hero">
  <div class="hero-meta">
    <span class="grad-text">● open to work</span>
    <span>seoul, kr</span>
    <span>frontend engineer · 2 yrs · 1st-author paper</span>
  </div>
  <h1 class="hero-title">
    Measure.<br />
    <span class="grad-text hero-accent">Define.</span><br />
    Then build.
  </h1>
  <div class="hero-body">
    {#if locale.current === 'ko'}
      김효근 · Higeuni.
      두 스타트업에서 프론트엔드를 혼자 책임졌습니다.
      Lighthouse 52 → 87, 번들 −46%, 60fps 무한 캔버스.
      ACM-ICPC 본선, CIA 2023 1저자.
    {:else}
      HyoGeun Kim · Higeuni.
      Solo frontend engineer across two startups.
      Lighthouse 52 → 87, bundle −46%, 60fps infinite canvas.
      ACM-ICPC regionals, CIA 2023 first author.
    {/if}
  </div>
</section>

<!-- Selected Work -->
<section id="work" class="section work-section">
  <div class="work-header">
    <h2 class="work-title">
      <span class="section-num">02 /</span>
      Selected <span class="grad-text hero-accent">projects.</span>
    </h2>
    <a href="/projects" class="work-count">ALL PROJECTS →</a>
  </div>
  {#each D.problemProjects as p, i}
    <a href={p.route} class="work-row" class:work-row-last={i === D.problemProjects.length - 1}>
      <span class="work-num">0{i + 1}</span>
      <div class="work-content">
        <div class="work-meta">
          {p.year} · {p.stack.join(' · ')}
        </div>
        <h3 class="work-name">{p.name}</h3>
        <div class="work-question">"{p.problemQ}"</div>
        <div class="work-answer">
          <span style="color: var(--dim);">→ ANSWER</span>
          <span class="grad-text" style="font-weight: 700;">{p.answer}</span>
        </div>
      </div>
      <span class="grad-text work-arrow">→</span>
    </a>
  {/each}
</section>

<!-- Principles -->
<section id="principles" class="section">
  <div class="section-label"><span class="section-num-inline">03 /</span>HOW I WORK</div>
  <div class="principles-grid">
    {#each D.principles as p, i}
      <div class="principle-cell" class:border-r={i < 3}>
        <span class="grad-text principle-num">{p.n}</span>
        <div class="principle-title">{p.t}</div>
        <div class="principle-desc">{p.d}</div>
      </div>
    {/each}
  </div>
</section>

<!-- Experience -->
<section id="exp" class="section">
  <h2 class="section-heading">
    <span class="section-num">04 /</span>
    <span class="grad-text hero-accent">Experience.</span>
  </h2>
  <div class="exp-grid">
    {#each D.experience as e}
      <Glass hover>
        <div class="exp-card">
          <div class="exp-period">{e.period}</div>
          <div class="exp-company">{e.company}</div>
          <div class="exp-role">{e.role}</div>
          <div class="exp-summary">{e.summary}</div>
          <div class="exp-stack">
            {#each e.stack as s}
              <span class="tag">{s}</span>
            {/each}
          </div>
        </div>
      </Glass>
    {/each}
  </div>
</section>

<!-- About -->
<section id="about" class="section">
  <h2 class="section-heading">
    <span class="section-num">05 /</span>
    From <span class="grad-text hero-accent">research</span> to shipping.
  </h2>
  <div class="about-grid">
    <Glass>
      <div class="about-narrative">
        {#if locale.current === 'ko'}
          컴퓨터 그래픽스 연구실에서 2년을 보내며 1저자로 <strong>CIA 2023</strong>에 논문을 발표했고,
          ACM-ICPC Seoul Regional에서 <strong>Honorable Mention</strong>을 받았습니다.
          <br /><br />
          학교에서 배운 건 두 가지입니다 — <span class="grad-text" style="font-weight: 700;">어려운 문제를 끝까지 파는 끈기</span>,
          그리고 <span class="grad-text" style="font-weight: 700;">좌표 변환과 그래픽 수학</span>.
          이 둘은 나중에 무한 캔버스를 직접 만들 때 가장 큰 자산이 됐습니다.
          <br /><br />
          스타트업으로 옮긴 뒤로는 <strong>혼자 책임지는 프론트엔드</strong>를 두 번 경험했습니다.
          디자인 시스템 부재, CI/CD 부재, 레거시 마이그레이션 — 어려운 시작점일수록
          한 사람이 끝까지 가져가는 게 빠르다는 걸 배웠습니다.
        {:else}
          Spent two years in a Computer Graphics lab, publishing as first author at <strong>CIA 2023</strong>
          and earning <strong>Honorable Mention</strong> at ACM-ICPC Seoul Regional.
          <br /><br />
          Two things from university stuck — <span class="grad-text" style="font-weight: 700;">the persistence to dig into hard problems</span>,
          and <span class="grad-text" style="font-weight: 700;">coordinate transforms and graphics math</span>.
          Both became my greatest assets when I later built an infinite canvas from scratch.
          <br /><br />
          After moving to startups, I was <strong>the sole frontend engineer</strong> twice.
          No design system, no CI/CD, legacy migration — the harder the starting point,
          the faster it is when one person owns it end to end.
        {/if}
      </div>
    </Glass>
    <Glass>
      <div class="about-timeline">
        <div class="timeline-label">TIMELINE</div>
        {#each D.timeline as row, i}
          <div class="timeline-row" class:first={i === 0}>
            <span class="timeline-year">{row.y}</span>
            <span>{row.t}</span>
          </div>
        {/each}
      </div>
    </Glass>
  </div>
</section>

<!-- Stack -->
<section id="stack" class="section">
  <h2 class="section-heading">
    <span class="section-num">06 /</span>
    <span class="grad-text hero-accent">Stack.</span>
  </h2>
  <Glass>
    <div class="stack-grid">
      {#each Object.entries(D.skills) as [cat, items], i}
        <div class="stack-col" class:border-r={i < Object.entries(D.skills).length - 1}>
          <span class="grad-text stack-cat">{cat.toUpperCase()}</span>
          <div class="stack-items">
            {#each items as s}
              <div class="stack-item">{s}</div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </Glass>
</section>

<!-- Contact -->
<section id="contact" class="section contact-section">
  <div class="section-label"><span class="grad-text">07 / CONTACT</span></div>
  <h2 class="contact-title">
    Let's<br />
    <span class="grad-text hero-accent">talk.</span>
  </h2>
  <div class="contact-grid">
    {#each [
      { k: 'EMAIL', v: D.email, href: `mailto:${D.email}` },
      { k: 'GITHUB', v: 'HiGeuni', href: D.github },
      { k: 'LINKEDIN', v: 'HyoGeun Kim', href: D.linkedin },
      { k: 'SITE', v: D.site, href: `https://${D.site}` },
    ] as c}
      <a href={c.href} target="_blank" rel="noopener noreferrer" class="contact-link">
        <Glass hover>
          <div class="contact-card">
            <div class="contact-label">{c.k}</div>
            <div class="contact-value">{c.v}</div>
          </div>
        </Glass>
      </a>
    {/each}
  </div>
  <div class="contact-footer">
    <span>© 2026 HIGEUNI · 김효근</span>
    <span>Find the question first.</span>
  </div>
</section>

<style>
  .hero {
    padding: 100px 40px 80px;
  }
  .hero-meta {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--dim);
    margin-bottom: 32px;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .hero-title {
    font-size: clamp(64px, 12vw, 168px);
    line-height: 0.86;
    font-weight: 500;
    letter-spacing: -0.045em;
    margin: 0;
  }
  .hero-accent {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
  }
  .hero-body {
    margin-top: 48px;
    max-width: 720px;
    font-size: 19px;
    line-height: 1.55;
    color: #ECEEF2cc;
  }

  .section {
    padding: 60px 40px;
  }
  .section-label {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--dim);
    letter-spacing: 0.1em;
    margin-bottom: 24px;
  }
  .section-num {
    color: var(--dim);
    font-family: var(--font-mono);
    font-size: 14px;
    margin-right: 12px;
  }
  .section-num-inline {
    margin-right: 12px;
  }
  .section-heading {
    font-size: clamp(40px, 5vw, 56px);
    font-weight: 500;
    letter-spacing: -0.03em;
    margin: 0 0 40px;
  }

  /* Work */
  .work-section {
    padding: 80px 40px 60px;
    border-top: 1px solid var(--line);
  }
  .work-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 48px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .work-title {
    font-size: clamp(48px, 6vw, 76px);
    font-weight: 500;
    letter-spacing: -0.035em;
    margin: 0;
    line-height: 1;
  }
  .work-count {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    letter-spacing: 0.1em;
  }
  .work-row {
    display: grid;
    grid-template-columns: 60px 1fr 60px;
    padding: 40px 0;
    border-top: 1px solid var(--line);
    align-items: start;
    gap: 16px;
    color: var(--text);
    text-decoration: none;
    transition: background 0.2s;
    cursor: pointer;
  }
  .work-row:hover {
    background: #ECEEF204;
  }
  .work-row-last {
    border-bottom: 1px solid var(--line);
  }
  .work-num {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--dim);
    padding-top: 12px;
  }
  .work-meta {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--dim);
  }
  .work-name {
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 500;
    line-height: 1.05;
    margin: 12px 0 12px;
    letter-spacing: -0.03em;
  }
  .work-question {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 17px;
    color: #ECEEF2cc;
    line-height: 1.5;
    margin-bottom: 18px;
    max-width: 760px;
  }
  .work-answer {
    display: flex;
    gap: 16px;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 12px;
    flex-wrap: wrap;
  }
  .work-arrow {
    text-align: right;
    font-size: 28px;
    padding-top: 10px;
  }

  /* Principles */
  .principles-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  .principle-cell {
    padding: 28px 22px;
  }
  .principle-cell.border-r {
    border-right: 1px solid var(--line);
  }
  .principle-num {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    font-weight: 700;
  }
  .principle-title {
    font-size: 22px;
    font-weight: 500;
    margin-top: 12px;
    letter-spacing: -0.02em;
  }
  .principle-desc {
    font-size: 12px;
    color: var(--dim);
    margin-top: 10px;
    line-height: 1.6;
  }

  /* Experience */
  .exp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .exp-card {
    padding: 28px;
  }
  .exp-period {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    letter-spacing: 0.05em;
  }
  .exp-company {
    font-size: 28px;
    font-weight: 500;
    margin-top: 8px;
    letter-spacing: -0.02em;
  }
  .exp-role {
    font-family: var(--font-mono);
    font-size: 12px;
    margin-top: 4px;
    color: var(--dim);
  }
  .exp-summary {
    font-size: 14px;
    margin-top: 16px;
    line-height: 1.6;
    color: #ECEEF2cc;
  }
  .exp-stack {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .tag {
    font-family: var(--font-mono);
    font-size: 10px;
    padding: 3px 8px;
    border-radius: 999px;
    background: #ECEEF208;
    border: 1px solid var(--line);
  }

  /* About */
  .about-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 16px;
  }
  .about-narrative {
    padding: 32px;
    font-size: 17px;
    line-height: 1.75;
    color: #ECEEF2dd;
  }
  .about-timeline {
    padding: 32px;
    font-family: var(--font-mono);
    font-size: 13px;
  }
  .timeline-label {
    font-size: 11px;
    color: var(--dim);
    margin-bottom: 16px;
    letter-spacing: 0.1em;
  }
  .timeline-row {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 12px;
    padding: 10px 0;
    border-top: 1px solid var(--line);
  }
  .timeline-row.first {
    border-top: none;
  }
  .timeline-year {
    color: var(--dim);
  }

  /* Stack */
  .stack-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
  .stack-col {
    padding: 24px;
  }
  .stack-col.border-r {
    border-right: 1px solid var(--line);
  }
  .stack-cat {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    font-weight: 700;
  }
  .stack-items {
    margin-top: 16px;
  }
  .stack-item {
    font-size: 16px;
    line-height: 1.7;
    font-weight: 400;
    color: #ECEEF2ee;
  }

  /* Contact */
  .contact-section {
    padding: 100px 40px 80px;
  }
  .contact-title {
    font-size: clamp(56px, 9vw, 124px);
    font-weight: 500;
    line-height: 0.92;
    letter-spacing: -0.035em;
    margin: 0;
  }
  .contact-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 56px;
  }
  .contact-link {
    text-decoration: none;
    color: var(--text);
  }
  .contact-card {
    padding: 24px;
  }
  .contact-label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    letter-spacing: 0.1em;
  }
  .contact-value {
    font-size: 18px;
    margin-top: 8px;
  }
  .contact-footer {
    margin-top: 56px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    display: flex;
    justify-content: space-between;
  }

  /* Mobile */
  @media (max-width: 760px) {
    .hero { padding: 60px 20px 48px; }
    .hero-meta { gap: 12px; }
    .section { padding: 48px 20px; }
    .work-section { padding: 60px 20px 48px; }
    .work-row { grid-template-columns: 1fr; }
    .work-num { display: none; }
    .work-arrow { display: none; }
    .principles-grid { grid-template-columns: repeat(2, 1fr); }
    .principle-cell:nth-child(odd) { border-right: 1px solid var(--line); }
    .principle-cell:nth-child(even).border-r { border-right: none; }
    .principle-cell:nth-child(1), .principle-cell:nth-child(2) { border-bottom: 1px solid var(--line); }
    .exp-grid { grid-template-columns: 1fr; }
    .about-grid { grid-template-columns: 1fr; }
    .stack-grid { grid-template-columns: repeat(2, 1fr); }
    .stack-col:nth-child(odd) { border-right: 1px solid var(--line); }
    .stack-col:nth-child(even).border-r { border-right: none; }
    .contact-grid { grid-template-columns: repeat(2, 1fr); }
    .contact-section { padding: 60px 20px; }
  }

  @media (max-width: 480px) {
    .hero { padding: 40px 16px 32px; }
    .section { padding: 36px 16px; }
    .work-section { padding: 48px 16px; }
    .principles-grid { grid-template-columns: 1fr; }
    .principle-cell.border-r { border-right: none; }
    .principle-cell { border-bottom: 1px solid var(--line); }
    .principle-cell:last-child { border-bottom: none; }
    .stack-grid { grid-template-columns: 1fr; }
    .stack-col.border-r { border-right: none; }
    .stack-col { border-bottom: 1px solid var(--line); }
    .stack-col:last-child { border-bottom: none; }
    .contact-section { padding: 48px 16px; }
    .contact-footer { flex-direction: column; gap: 8px; }
  }
</style>
