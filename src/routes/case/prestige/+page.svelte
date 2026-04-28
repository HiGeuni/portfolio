<script lang="ts">
  import { hexAlpha, pickReadableInk } from '$lib/utils/theme';
  import BrutalistHeader from '$lib/components/BrutalistHeader.svelte';

  const accent = '#FFB454';
  const ink = '#0E0E0C';
  const paper = '#F2F0EA';
  const gridOpacity = 10;
  const gridSize = 80;
  const onAccent = pickReadableInk(accent, ink, paper);

  const metrics = [
    { k: 'PAGES MIGRATED', before: '0', after: '8', delta: '6 weeks', note: 'Core pages, full parity' },
    { k: 'DEPLOY TIME', before: '10m', after: '2m', delta: '−80%', note: 'Manual → Vercel' },
    { k: 'PAGE REFRESH', before: 'every nav', after: '0', delta: 'SPA', note: 'Filter / nav, no flash' },
    { k: 'DEMO RECEPTION', before: '', after: '✓', delta: 'positive', note: 'Severance, large clinics' },
  ];

  const decisions = [
    { n: '01', title: 'Full migration, 6 weeks, 8 pages', body: 'ASP.NET 라우팅·서버사이드 렌더링·LocalStorage 상태 관리 흐름을 Next.js로 1:1 매핑. 기능 삭제 없이 6주 안에 8개 핵심 페이지 이전.' },
    { n: '02', title: 'Kakao Map + Recoil with no-refresh filters', body: '필터 변경 시 새로고침 없이 지도와 검색이 즉시 반응하도록 상태 + 쿼리 파라미터를 동기화.' },
    { n: '03', title: 'Recoil effects ↔ LocalStorage', body: 'Recoil effects로 필터 상태를 LocalStorage와 양방향 동기화 — 새로고침해도 사용자가 보던 필터가 그대로 유지.' },
    { n: '04', title: 'Drove API design, then implemented', body: '백엔드와의 협업에서 응답 구조를 직접 설계해 요청. 프론트엔드 사용 시점에 가장 효율적인 모양으로.' },
    { n: '05', title: 'Manual builds → Vercel CI/CD', body: '수동 빌드 파일 전달 방식을 GitHub → Vercel 자동 배포로 전환.' },
  ];
</script>

<svelte:head>
  <title>The Prestige — Case Study | HyoGeun Kim</title>
</svelte:head>

<div
  class="page-root"
  style="background-image: linear-gradient({ink}{hexAlpha(gridOpacity)} 1px, transparent 1px), linear-gradient(90deg, {ink}{hexAlpha(gridOpacity)} 1px, transparent 1px); background-size: {gridSize}px {gridSize}px;"
>
  <BrutalistHeader variant="case" caseNumber={3} caseTotal={3} />

  <!-- Title -->
  <section class="title-section">
    <div class="title-meta">
      <span class="shipped-badge" style="background: {accent}; color: {onAccent};">● SHIPPED 2024</span>
      <span>THE PRESTIGE · BURIAL-SITE VISUALIZATION</span>
      <span>FRONTEND-OF-ONE</span>
      <span>ASP.NET → NEXT.JS</span>
    </div>
    <h1 class="case-title">
      ASP.NET <span style="background: {accent}; color: {onAccent}; padding: 0 8px;">→</span><br />
      Next.js. <span style="background: {accent}; color: {onAccent}; padding: 0 8px;">Six weeks.</span>
    </h1>
    <div class="title-desc">
      A legacy clinic-facing service that flashed white on every navigation. Eight core pages migrated from ASP.NET to Next.js with no functional regression — and demo'd successfully at Severance and other large medical centers.
    </div>
  </section>

  <!-- Metrics -->
  <section class="metrics-section">
    <div class="metrics-grid">
      {#each metrics as m, i}
        <div class="metric-cell" class:border-r={i < 3}>
          <div class="metric-label">{m.k}</div>
          <div class="metric-values">
            {#if m.before}
              <span class="metric-before">{m.before}</span>
            {/if}
            <span class="metric-after">{m.after}</span>
          </div>
          <div class="metric-delta" style="background: {accent}; color: {onAccent};">{m.delta}</div>
          <div class="metric-note">{m.note}</div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Problem -->
  <section class="section">
    <div class="section-label">① PROBLEM</div>
    <div class="problem-grid">
      <h2 class="problem-heading">
        Every click<br /><span style="background: {accent}; color: {onAccent}; padding: 0 6px;">flashed white.</span>
      </h2>
      <div class="problem-body">
        ASP.NET 기반 레거시는 페이지 전환마다 전체 새로고침이 발생했고, 의료원 시연에서 첫인상이 깎이는 핵심 원인이었습니다.
        배포는 빌드 산출물을 사람이 옮기는 방식이었고, 한 번에 10분이 걸렸습니다.
        <br /><br />
        요구는 명료했습니다: 기능 삭제 없이 SPA 경험을, 6주 안에.
      </div>
    </div>
  </section>

  <!-- Decisions -->
  <section class="section">
    <div class="section-label">② DECISIONS</div>
    {#each decisions as d, i}
      <div class="decision-row" class:decision-row-last={i === decisions.length - 1}>
        <div class="decision-num">{d.n}</div>
        <div class="decision-title">
          <span style="background: {accent}; color: {onAccent}; padding: 0 4px;">{d.title}</span>
        </div>
        <div class="decision-body">{d.body}</div>
      </div>
    {/each}
  </section>

  <!-- Outcome -->
  <section class="outcome-section">
    <div class="outcome-label">③ OUTCOME</div>
    <h2 class="outcome-heading">
      Eight pages.<br />
      <span style="color: {accent};">No flashes. No friction.</span>
    </h2>
    <ul class="outcome-list">
      <li>8개 핵심 페이지 6주 마이그레이션 완료, 기능 삭제 0건.</li>
      <li>배포 리드타임 <strong style="color: {accent};">10분 → 2분 (−80%)</strong>.</li>
      <li>세브란스 등 대형 의료원 시연 긍정 피드백.</li>
    </ul>
  </section>

  <!-- Footer nav -->
  <section class="case-nav">
    <a href="/" class="case-nav-link">← BACK TO INDEX</a>
    <a href="/case/awarelab/" class="case-nav-link">FIRST CASE · AWARELAB →</a>
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

  .section {
    padding: 72px 40px;
    border-bottom: 2px solid var(--ink);
  }
  .section-label {
    font-family: var(--font-mono);
    font-size: 12px;
    margin-bottom: 32px;
  }

  .title-section {
    padding: 100px 40px 64px;
    border-bottom: 2px solid var(--ink);
  }
  .title-meta {
    font-family: var(--font-mono);
    font-size: 12px;
    margin-bottom: 24px;
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }
  .shipped-badge { padding: 2px 8px; }
  .case-title {
    font-family: var(--font-display);
    font-size: clamp(64px, 11vw, 156px);
    line-height: 0.88;
    font-weight: 800;
    letter-spacing: -0.04em;
    margin: 0;
    text-transform: uppercase;
  }
  .title-desc {
    margin-top: 32px;
    max-width: 760px;
    font-family: var(--font-mono);
    font-size: 16px;
    line-height: 1.7;
  }

  .metrics-section {
    border-bottom: 2px solid var(--ink);
  }
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .metric-cell {
    padding: 32px 24px;
    font-family: var(--font-mono);
  }
  .metric-cell.border-r {
    border-right: 2px solid var(--ink);
  }
  .metric-label {
    font-size: 11px;
    opacity: 0.5;
    letter-spacing: 0.1em;
  }
  .metric-values {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-top: 12px;
  }
  .metric-before {
    font-size: 13px;
    opacity: 0.5;
    text-decoration: line-through;
  }
  .metric-after {
    font-size: 32px;
    font-weight: 800;
    font-family: var(--font-display);
    letter-spacing: -0.02em;
  }
  .metric-delta {
    display: inline-block;
    padding: 1px 6px;
    margin-top: 8px;
    font-size: 11px;
    font-weight: 700;
  }
  .metric-note {
    font-size: 11px;
    opacity: 0.6;
    margin-top: 8px;
  }

  .problem-grid {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 48px;
  }
  .problem-heading {
    font-size: 56px;
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin: 0;
  }
  .problem-body {
    font-family: var(--font-mono);
    font-size: 15px;
    line-height: 1.8;
  }

  .decision-row {
    display: grid;
    grid-template-columns: 100px 1fr 2fr;
    border-top: 2px solid var(--ink);
    padding: 28px 0;
  }
  .decision-row-last { border-bottom: 2px solid var(--ink); }
  .decision-num { font-family: var(--font-mono); font-size: 32px; font-weight: 700; }
  .decision-title { font-size: 22px; font-weight: 700; line-height: 1.2; padding-right: 24px; }
  .decision-body { font-family: var(--font-mono); font-size: 14px; line-height: 1.7; }

  .outcome-section {
    padding: 72px 40px;
    border-bottom: 2px solid var(--ink);
    background: var(--ink);
    color: var(--paper);
  }
  .outcome-label { font-family: var(--font-mono); font-size: 12px; margin-bottom: 32px; color: var(--accent); }
  .outcome-heading { font-size: clamp(48px, 7vw, 88px); font-weight: 800; line-height: 0.95; letter-spacing: -0.03em; margin: 0; }
  .outcome-list { padding-left: 18px; margin-top: 32px; font-family: var(--font-mono); font-size: 14px; line-height: 1.9; }

  .case-nav {
    padding: 60px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .case-nav-link {
    font-family: var(--font-mono);
    font-size: 13px;
    cursor: pointer;
    text-decoration: none;
    color: var(--ink);
  }
  .case-nav-link:hover { text-decoration: underline; }

  @media (max-width: 760px) {
    .title-section { padding: 60px 20px 48px; }
    .title-meta { gap: 16px; }
    .section { padding: 48px 20px; }
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
    .metric-cell:nth-child(1), .metric-cell:nth-child(3) { border-right: 2px solid var(--ink); }
    .metric-cell:nth-child(2).border-r { border-right: none; }
    .metric-cell:nth-child(1), .metric-cell:nth-child(2) { border-bottom: 2px solid var(--ink); }
    .problem-grid { grid-template-columns: 1fr; gap: 24px; }
    .problem-heading { font-size: 36px; }
    .decision-row { grid-template-columns: 1fr; gap: 12px; }
    .case-nav { padding: 40px 20px; flex-direction: column; gap: 16px; align-items: flex-start; }
  }

  @media (max-width: 480px) {
    .title-section { padding: 40px 16px 32px; }
    .title-meta { gap: 8px; font-size: 11px; }
    .section { padding: 36px 16px; }
    .case-title { font-size: clamp(40px, 10vw, 64px); }
    .title-desc { font-size: 14px; }
    .outcome-heading { font-size: clamp(32px, 7vw, 48px); }
    .outcome-section { padding: 48px 16px; }
    .problem-heading { font-size: 28px; }
    .metric-after { font-size: 24px; }
    .decision-title { font-size: 18px; }
    .case-nav { padding: 32px 16px; }
  }
</style>
