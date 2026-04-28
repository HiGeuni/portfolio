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
    { k: 'FRAMERATE', before: '', after: '60', delta: 'fps', note: 'Pan + zoom + drag' },
    { k: 'MEMORY', before: '100%', after: '70%', delta: '−30%', note: 'After normalization' },
    { k: 'API CALLS', before: '100%', after: '50%', delta: '−50%', note: 'Selective subscriptions' },
    { k: 'SSE LATENCY', before: '', after: '<100ms', delta: 'live', note: 'Deploy → browser' },
  ];

  const decisions = [
    { n: '01', title: 'Throw out react-zoom-pan-pinch', body: '라이브러리는 캔버스 크기 제한이 있어 대규모 클라우드 아키텍처(노드 수백 개)를 한 화면에 담을 수 없었습니다. 직접 만들기로 결정.' },
    { n: '02', title: 'SVG viewBox + 3×3 affine matrix', body: '캔버스 자체는 무한. viewBox 좌표를 이동·확대해서 화면에 비추는 창만 움직임. 모든 변환은 3×3 행렬로 합성·역변환.' },
    { n: '03', title: 'Pointer-anchored zoom', body: '휠 줌은 마우스 포인터 기준으로 동작해야 자연스럽다. 비례 기반 좌표 재계산 — 포인터의 world position을 줌 전후 동일하게 유지.' },
    { n: '04', title: 'Five Zustand slices', body: 'Common · Service · Area · Line · Option. 선택적 구독으로 변경된 slice 구독자만 리렌더. 정규화로 메모리 30% 절감.' },
    { n: '05', title: 'SSE for live deploy', body: '배포 진행 상황을 100ms 이내에 브라우저로 푸시. 프론트엔드는 이벤트 스트림을 캔버스 노드 상태에 즉시 반영.' },
  ];

  const nodes = [
    { x: 100, y: 100, label: 'VPC' },
    { x: 320, y: 100, label: 'ALB' },
    { x: 560, y: 80, label: 'ECS · web' },
    { x: 560, y: 200, label: 'ECS · api' },
    { x: 800, y: 140, label: 'RDS' },
    { x: 100, y: 320, label: 'S3' },
    { x: 320, y: 320, label: 'CloudFront' },
    { x: 560, y: 380, label: 'Lambda' },
    { x: 800, y: 360, label: 'Aurora' },
    { x: 1040, y: 240, label: 'Redis' },
    { x: -180, y: 220, label: 'Route53' },
    { x: 1240, y: 80, label: 'SQS' },
    { x: 1240, y: 380, label: 'SNS' },
  ];

  const lines = [
    [100, 132, 320, 132], [320, 132, 560, 112], [320, 132, 560, 232],
    [560, 112, 800, 172], [560, 232, 800, 172], [100, 352, 320, 352],
    [320, 352, 560, 412], [560, 412, 800, 392], [800, 392, 1040, 272],
  ];

  const codeSnippet = `function zoomAtPointer(vb, factor, mouse, rect) {
  // mouse: { x, y } in screen px; rect: bounding rect of <svg/>
  const wx = (mouse.x / rect.width)  * vb.w + vb.x;
  const wy = (mouse.y / rect.height) * vb.h + vb.y;

  const nw = vb.w * factor;
  const nh = vb.h * factor;

  return {
    x: wx - (wx - vb.x) * factor,
    y: wy - (wy - vb.y) * factor,
    w: nw,
    h: nh,
  };
}`;

  // Interactive canvas state — mirrors real Kumo Factory zoom/pan algorithm
  const VB_ORIGIN = { w: 800, h: 500 };
  const SCALE_MIN = 0.5;
  const SCALE_MAX = 5;

  let scale = $state(1);
  let vb = $state({ x: 0, y: 0, w: VB_ORIGIN.w, h: VB_ORIGIN.h });
  let svgEl: SVGSVGElement | undefined = $state();
  let dragging = $state(false);
  let svgOrigin = $state({ x: 0, y: 0 });

  function toWorld(e: MouseEvent) {
    if (!svgEl) return { x: 0, y: 0 };
    const r = svgEl.getBoundingClientRect();
    return {
      x: vb.x + ((e.clientX - r.left) / r.width) * vb.w,
      y: vb.y + ((e.clientY - r.top) / r.height) * vb.h,
    };
  }

  function onSvgDown(e: MouseEvent) {
    svgOrigin = toWorld(e);
    dragging = true;
  }

  function onSvgMove(e: MouseEvent) {
    if (!dragging) return;
    const pt = toWorld(e);
    vb = {
      ...vb,
      x: vb.x - (pt.x - svgOrigin.x),
      y: vb.y - (pt.y - svgOrigin.y),
    };
  }

  function onSvgUp() {
    dragging = false;
  }

  function onSvgWheel(e: WheelEvent) {
    e.preventDefault();
    if (!svgEl) return;

    // 1. World point under cursor BEFORE scale change
    const pt = toWorld(e);
    const r = svgEl.getBoundingClientRect();
    const fx = (e.clientX - r.left) / r.width;
    const fy = (e.clientY - r.top) / r.height;

    // 2. Continuous zoom proportional to scroll speed
    let delta = e.deltaY / 1000;
    if (e.deltaY !== 0 && Math.abs(delta) < 0.05) {
      delta = 0.05 * Math.sign(e.deltaY);
    }
    scale = Math.max(SCALE_MIN, Math.min(SCALE_MAX, scale + delta));

    // 3. New viewBox dimensions
    const nw = VB_ORIGIN.w * scale;
    const nh = VB_ORIGIN.h * scale;

    // 4. Anchor: reposition so the same world point stays under cursor
    vb = {
      x: pt.x - fx * nw,
      y: pt.y - fy * nh,
      w: nw,
      h: nh,
    };
  }
</script>

<svelte:head>
  <title>Kumo Factory — Case Study | HyoGeun Kim</title>
</svelte:head>

<div
  class="page-root"
  style="background-image: linear-gradient({ink}{hexAlpha(gridOpacity)} 1px, transparent 1px), linear-gradient(90deg, {ink}{hexAlpha(gridOpacity)} 1px, transparent 1px); background-size: {gridSize}px {gridSize}px;"
>
  <BrutalistHeader variant="case" caseNumber={2} caseTotal={3} />

  <!-- Title -->
  <section class="title-section">
    <div class="title-meta">
      <span class="shipped-badge" style="background: {accent}; color: {onAccent};">● SHIPPED 2023</span>
      <span>KUMO FACTORY · NO-CODE CLOUD BUILDER</span>
      <span>FRONTEND-OF-ONE</span>
      <span>SVG · AFFINE · ZUSTAND · SSE</span>
    </div>
    <h1 class="case-title">
      <span style="background: {accent}; color: {onAccent}; padding: 0 8px;">Infinite</span> canvas.<br />
      Sixty <span style="background: {accent}; color: {onAccent}; padding: 0 8px;">frames.</span>
    </h1>
    <div class="title-desc">
      When the off-the-shelf zoom-pan library hit its size ceiling, I built one from scratch — viewBox + a 3×3 affine matrix.
      The result is below: drag to pan, scroll to zoom. Mouse-anchored, 60fps.
    </div>
  </section>

  <!-- Live Demo -->
  <section class="demo-section">
    <div class="demo-bar">
      <span>LIVE · /demo/canvas.svg</span>
      <span class="demo-dim">viewBox: {vb.x.toFixed(0)} {vb.y.toFixed(0)} {vb.w.toFixed(0)} {vb.h.toFixed(0)}</span>
      <span class="demo-dim">drag · scroll to zoom</span>
    </div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <svg
      bind:this={svgEl}
      viewBox="{vb.x} {vb.y} {vb.w} {vb.h}"
      width="100%"
      class="demo-svg"
      onmousedown={onSvgDown}
      onmousemove={onSvgMove}
      onmouseup={onSvgUp}
      onmouseleave={onSvgUp}
      onwheel={onSvgWheel}
      style="display: block; background: {ink}; cursor: {dragging ? 'grabbing' : 'grab'};"
    >
      <defs>
        <pattern id="kdots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="{paper}30" />
        </pattern>
      </defs>
      <rect x={vb.x - 2000} y={vb.y - 2000} width={vb.w + 4000} height={vb.h + 4000} fill="url(#kdots)" />
      {#each nodes as n}
        <g>
          <rect x={n.x} y={n.y} width="160" height="64" fill={paper} stroke={accent} stroke-width="2" />
          <text x={n.x + 12} y={n.y + 24} font-family="var(--font-mono)" font-size="11" fill="{ink}99">service</text>
          <text x={n.x + 12} y={n.y + 46} font-family="var(--font-mono)" font-size="14" font-weight="700" fill={ink}>{n.label}</text>
        </g>
      {/each}
      {#each lines as l}
        <path d="M{l[0]} {l[1]} L{l[2]} {l[3]}" stroke={accent} stroke-width="2" fill="none" opacity="0.7" />
      {/each}
    </svg>
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
        The library<br /><span style="background: {accent}; color: {onAccent}; padding: 0 6px;">hit its ceiling.</span>
      </h2>
      <div class="problem-body">
        노코드 클라우드 빌더는 사용자가 수백 개 노드의 아키텍처를 한 화면에서 그릴 수 있어야 했습니다.
        <strong>react-zoom-pan-pinch</strong>는 내부 transform 컨테이너에 크기 한계가 있어, 일정 규모를 넘으면 가장자리에서 잘리거나 좌표가 어긋났습니다.
        <br /><br />
        라이브러리를 패치하느니 직접 만드는 편이 빠르고 안정적이라고 판단했습니다.
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

  <!-- Code -->
  <section class="section">
    <div class="section-label">③ CODE · pointer-anchored zoom</div>
    <div class="code-grid">
      <div>
        <h3 class="code-heading">Keep the world point under the cursor.</h3>
        <div class="code-desc">
          줌 전후로 마우스가 가리키는 좌표가 같은 world point를 가리키도록 viewBox 원점을 재계산합니다.
        </div>
      </div>
      <pre class="code-block">{codeSnippet}</pre>
    </div>
  </section>

  <!-- Outcome -->
  <section class="outcome-section">
    <div class="outcome-label">④ OUTCOME</div>
    <h2 class="outcome-heading">
      A canvas <span style="color: {accent};">without limits</span>.<br />
      A frontend that <span style="color: {accent};">doesn't drop frames.</span>
    </h2>
    <ul class="outcome-list">
      <li>대규모 캔버스에서 <strong style="color: {accent};">60fps</strong> 유지.</li>
      <li>5-slice store + 정규화로 <strong style="color: {accent};">메모리 30%↓</strong>, <strong style="color: {accent};">API 호출 50%↓</strong>.</li>
      <li>SSE 기반 실시간 배포 시각화 — <strong style="color: {accent};">{'<100ms'}</strong> 지연.</li>
    </ul>
  </section>

  <!-- Footer nav -->
  <section class="case-nav">
    <a href="/" class="case-nav-link">← BACK TO INDEX</a>
    <a href="/case/prestige/" class="case-nav-link">NEXT · THE PRESTIGE →</a>
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

  /* Demo */
  .demo-section {
    border-bottom: 2px solid var(--ink);
    background: var(--ink);
  }
  .demo-bar {
    padding: 16px 40px;
    color: var(--paper);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    display: flex;
    justify-content: space-between;
  }
  .demo-dim { opacity: 0.6; }
  :global(.demo-svg) {
    height: 500px;
    display: block;
  }

  /* Metrics */
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

  .code-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 32px;
    align-items: start;
  }
  .code-heading { font-size: 28px; font-weight: 700; line-height: 1.1; margin: 0; letter-spacing: -0.02em; }
  .code-desc { margin-top: 16px; font-family: var(--font-mono); font-size: 14px; line-height: 1.7; }
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
    .demo-bar { padding: 12px 20px; flex-wrap: wrap; gap: 8px; }
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
    .metric-cell:nth-child(1), .metric-cell:nth-child(3) { border-right: 2px solid var(--ink); }
    .metric-cell:nth-child(2).border-r { border-right: none; }
    .metric-cell:nth-child(1), .metric-cell:nth-child(2) { border-bottom: 2px solid var(--ink); }
    .problem-grid { grid-template-columns: 1fr; gap: 24px; }
    .problem-heading { font-size: 36px; }
    .decision-row { grid-template-columns: 1fr; gap: 12px; }
    .code-grid { grid-template-columns: 1fr; }
    .case-nav { padding: 40px 20px; flex-direction: column; gap: 16px; align-items: flex-start; }
  }

  @media (max-width: 480px) {
    .title-section { padding: 40px 16px 32px; }
    .section { padding: 36px 16px; }
    .case-title { font-size: clamp(40px, 10vw, 64px); }
    .outcome-heading { font-size: clamp(32px, 7vw, 48px); }
    .outcome-section { padding: 48px 16px; }
    .problem-heading { font-size: 28px; }
    .metric-after { font-size: 28px; }
    :global(.demo-svg) { height: 300px; }
    .demo-bar { padding: 12px 16px; font-size: 10px; }
    .case-nav { padding: 32px 16px; }
  }
</style>
