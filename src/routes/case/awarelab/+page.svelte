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
    { k: 'LIGHTHOUSE', before: '52', after: '87', delta: '+35', note: 'Performance score' },
    { k: 'LCP', before: '9.0s', after: '3.8s', delta: '−44%', note: 'Largest Contentful Paint' },
    { k: 'BUNDLE', before: '100%', after: '54%', delta: '−46%', note: 'Initial JS payload' },
    { k: 'CLS', before: '0.126', after: '0', delta: '−100%', note: 'Cumulative Layout Shift' },
  ];

  const context = [
    { k: 'ROLE', v: 'Lead Software Engineer · Frontend-of-one' },
    { k: 'TIMELINE', v: '2025.04 → present (built in 6 months)' },
    { k: 'TEAM', v: '5 total · 4 dev · 1 frontend (me)' },
    { k: 'PRODUCT', v: 'Investment portfolio analysis · subscription' },
    { k: 'STACK', v: 'Next.js · TypeScript · Stripe · Directus · TanStack' },
    { k: 'SCOPE', v: 'Marketing site + Admin + CMS editor + i18n' },
  ];

  const decisions = [
    {
      n: '01',
      title: 'FSD architecture from day one',
      body: '기능이 늘어나도 폴더가 무너지지 않도록 Feature-Sliced Design을 채택. shared / entities / features / widgets / pages 5계층으로 분리해 의존성 방향을 단방향으로 강제.',
    },
    {
      n: '02',
      title: 'In-memory cache hook for race-prone fetches',
      body: '포트폴리오 탭/필터를 빠르게 전환하면 늦게 도착한 응답이 화면을 덮어쓰는 race condition 발생. 클로저 + Map 기반 인메모리 캐싱 훅을 자체 설계해 키 단위로 in-flight 요청을 식별·취소.',
    },
    {
      n: '03',
      title: 'Bundle 46% diet',
      body: '@next/bundle-analyzer로 리포트 → 미사용 패키지를 동적 임포트로 전환, 폰트 서브셋 적용, GSAP는 동적 로딩 + context().revert() 패턴으로 SPA 라우팅 시 메모리 누수 방지.',
    },
    {
      n: '04',
      title: 'Generic Zustand factory for filters',
      body: 'Admin에서 도메인별로 같은 모양의 필터 로직이 반복. 제네릭 기반 Zustand 팩토리 패턴으로 상태/액션을 추상화하여 도메인을 인자로만 추가.',
    },
    {
      n: '05',
      title: 'Stripe flow as a state machine',
      body: '결제 진입부터 완료까지의 상태를 단계별로 모델링. 모든 예외 경로(취소·실패·중단·중복)를 명시적으로 처리.',
    },
  ];

  const codeSnippet = `function useRequestCache<T>(fetcher: (key: string) => Promise<T>) {
  const cache = useRef(new Map<string, T>());
  const inflight = useRef(new Map<string, symbol>());
  const [state, setState] = useState<{key?: string; data?: T}>({});

  const get = useCallback(async (key: string) => {
    if (cache.current.has(key)) {
      setState({ key, data: cache.current.get(key) });
      return;
    }
    const token = Symbol(key);
    inflight.current.set(key, token);
    const data = await fetcher(key);
    if (inflight.current.get(key) !== token) return; // stale
    cache.current.set(key, data);
    setState({ key, data });
  }, [fetcher]);

  return [state, get] as const;
}`;
</script>

<svelte:head>
  <title>Awarelab Membership — Case Study | HyoGeun Kim</title>
</svelte:head>

<div
  class="page-root"
  style="background-image: linear-gradient({ink}{hexAlpha(gridOpacity)} 1px, transparent 1px), linear-gradient(90deg, {ink}{hexAlpha(gridOpacity)} 1px, transparent 1px); background-size: {gridSize}px {gridSize}px;"
>
  <BrutalistHeader variant="case" caseNumber={1} caseTotal={3} />

  <!-- Title -->
  <section class="title-section">
    <div class="title-meta">
      <span class="shipped-badge" style="background: {accent}; color: {onAccent};">● SHIPPED 2025</span>
      <span>AWARELAB · MEMBERSHIP</span>
      <span>FRONTEND-OF-ONE</span>
      <span>NEXT.JS · TYPESCRIPT · STRIPE</span>
    </div>
    <h1 class="case-title">
      From <span style="background: {accent}; color: {onAccent}; padding: 0 8px;">52</span> to{' '}
      <span style="background: {accent}; color: {onAccent}; padding: 0 8px;">87.</span><br />
      Bundle, halved.
    </h1>
    <div class="title-desc">
      A subscription-grade investment-portfolio platform — built solo from architecture to deploy in 6 months.
      Stripe, Directus CMS, an admin dashboard, a TipTap editor with 12 custom extensions, and tri-lingual SEO. Then made it fast.
    </div>
  </section>

  <!-- Metrics -->
  <section class="metrics-section">
    <div class="metrics-grid">
      {#each metrics as m, i}
        <div class="metric-cell" class:border-r={i < 3}>
          <div class="metric-label">{m.k}</div>
          <div class="metric-values">
            <span class="metric-before">{m.before}</span>
            <span class="metric-after">{m.after}</span>
          </div>
          <div class="metric-delta" style="background: {accent}; color: {onAccent};">{m.delta}</div>
          <div class="metric-note">{m.note}</div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Context -->
  <section class="section">
    <div class="section-label">① CONTEXT</div>
    <div class="context-grid">
      {#each context as it, i}
        <div
          class="context-cell"
          class:border-r={(i + 1) % 3 !== 0}
          class:border-b={i < 3}
        >
          <div class="context-key">{it.k}</div>
          <div class="context-val">{it.v}</div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Problem -->
  <section class="section">
    <div class="section-label">② PROBLEM</div>
    <div class="problem-grid">
      <h2 class="problem-heading">
        Lighthouse 52.<br /><span style="background: {accent}; color: {onAccent}; padding: 0 6px;">LCP 9 seconds.</span><br />Race-prone fetches.
      </h2>
      <div class="problem-body">
        첫 배포 후 측정한 Lighthouse 점수는 <strong>52</strong>. LCP는 <strong>9.0초</strong>로 결제 페이지 진입 전에 사용자가 이탈할 수준이었습니다.
        CMS 콘텐츠와 차트 라이브러리가 첫 번들에 통째로 들어가 있었고, 포트폴리오 탭/필터를 빠르게 누르면 늦게 도착한 응답이 최신 화면을 덮어쓰는 race condition이 재현됐습니다.
        <br /><br />
        동시에 멤버십 결제 플로우는 <em>이번 분기 안에</em> 상용화돼야 했습니다.
      </div>
    </div>
  </section>

  <!-- Decisions -->
  <section class="section">
    <div class="section-label">③ DECISIONS</div>
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

  <!-- Code -->
  <section class="section">
    <div class="section-label">④ CODE · useRequestCache.ts</div>
    <div class="code-grid">
      <div>
        <h3 class="code-heading">The fetch that ignores stale answers.</h3>
        <div class="code-desc">
          키별로 in-flight 요청을 closure에 저장. 같은 키로 새 요청이 들어오면 이전 요청은 폐기 표시 → 응답이 늦게 도착해도 setState를 무시.
          결과는 Map에 캐싱돼 다음 호출은 즉시 응답합니다.
        </div>
      </div>
      <pre class="code-block">{codeSnippet}</pre>
    </div>
  </section>

  <!-- Outcome -->
  <section class="outcome-section">
    <div class="outcome-label">⑤ OUTCOME</div>
    <h2 class="outcome-heading">
      Shipped subscription.<br />
      <span style="color: {accent};">Halved bundle.</span> Killed race conditions.
    </h2>
    <div class="outcome-grid">
      <ul class="outcome-list">
        <li>Lighthouse <strong style="color: {accent};">52 → 87</strong>, LCP <strong style="color: {accent};">9.0s → 3.8s</strong>.</li>
        <li>Bundle <strong style="color: {accent};">−46%</strong>, CLS <strong style="color: {accent};">0.126 → 0</strong>.</li>
        <li>Membership Stripe flow live in production.</li>
      </ul>
      <ul class="outcome-list">
        <li>Vitest + MSW 기반 API 독립 테스트 환경 구축.</li>
        <li>i18n 3개 언어 (EN/KO/JA) + SEO 적용.</li>
        <li>Admin + TipTap CMS editor (12 custom extensions) 동시 운영.</li>
      </ul>
    </div>
  </section>

  <!-- Footer nav -->
  <section class="case-nav">
    <a href="/" class="case-nav-link">← BACK TO INDEX</a>
    <a href="/case/kumo/" class="case-nav-link">NEXT · KUMO FACTORY →</a>
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

  /* Title */
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
  .shipped-badge {
    padding: 2px 8px;
  }
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

  /* Metrics */
  .metrics-section {
    padding: 0;
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
    font-size: 36px;
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

  /* Context */
  .context-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0;
    border: 2px solid var(--ink);
  }
  .context-cell {
    padding: 20px;
  }
  .context-cell.border-r {
    border-right: 2px solid var(--ink);
  }
  .context-cell.border-b {
    border-bottom: 2px solid var(--ink);
  }
  .context-key {
    font-family: var(--font-mono);
    font-size: 11px;
    opacity: 0.5;
    letter-spacing: 0.1em;
  }
  .context-val {
    font-size: 16px;
    margin-top: 8px;
    font-weight: 500;
  }

  /* Problem */
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

  /* Decisions */
  .decision-row {
    display: grid;
    grid-template-columns: 100px 1fr 2fr;
    border-top: 2px solid var(--ink);
    padding: 28px 0;
  }
  .decision-row-last {
    border-bottom: 2px solid var(--ink);
  }
  .decision-num {
    font-family: var(--font-mono);
    font-size: 32px;
    font-weight: 700;
  }
  .decision-title {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
    padding-right: 24px;
  }
  .decision-body {
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.7;
  }

  /* Code */
  .code-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 32px;
    align-items: start;
  }
  .code-heading {
    font-size: 28px;
    font-weight: 700;
    line-height: 1.1;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .code-desc {
    margin-top: 16px;
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.7;
  }
  .code-block {
    background: var(--ink);
    color: var(--paper);
    padding: 24px;
    font-size: 12px;
    line-height: 1.7;
    font-family: var(--font-mono);
    border: 2px solid var(--ink);
    margin: 0;
    overflow: auto;
    white-space: pre;
  }

  /* Outcome */
  .outcome-section {
    padding: 72px 40px;
    border-bottom: 2px solid var(--ink);
    background: var(--ink);
    color: var(--paper);
  }
  .outcome-label {
    font-family: var(--font-mono);
    font-size: 12px;
    margin-bottom: 32px;
    color: var(--accent);
  }
  .outcome-heading {
    font-size: clamp(48px, 7vw, 88px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin: 0;
  }
  .outcome-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    margin-top: 48px;
  }
  .outcome-list {
    padding-left: 18px;
    margin: 0;
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.8;
  }

  /* Footer nav */
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
  .case-nav-link:hover {
    text-decoration: underline;
  }

  /* Mobile */
  @media (max-width: 760px) {
    .title-section {
      padding: 60px 20px 48px;
    }
    .title-meta {
      gap: 16px;
    }
    .section {
      padding: 48px 20px;
    }
    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .metric-cell:nth-child(1),
    .metric-cell:nth-child(3) {
      border-right: 2px solid var(--ink);
    }
    .metric-cell:nth-child(2).border-r {
      border-right: none;
    }
    .metric-cell:nth-child(1),
    .metric-cell:nth-child(2) {
      border-bottom: 2px solid var(--ink);
    }
    .context-grid {
      grid-template-columns: 1fr;
    }
    .context-cell.border-r {
      border-right: none;
    }
    .context-cell:not(:last-child) {
      border-bottom: 2px solid var(--ink);
    }
    .problem-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .problem-heading {
      font-size: 36px;
    }
    .decision-row {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .code-grid {
      grid-template-columns: 1fr;
    }
    .outcome-grid {
      grid-template-columns: 1fr;
    }
    .case-nav {
      padding: 40px 20px;
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }
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
    .metric-after { font-size: 28px; }
    .decision-title { font-size: 18px; }
    .code-heading { font-size: 22px; }
    .code-block { font-size: 11px; padding: 16px; }
    .case-nav { padding: 32px 16px; }
  }
</style>
