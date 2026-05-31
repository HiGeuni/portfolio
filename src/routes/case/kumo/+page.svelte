<script lang="ts">
  import { caseKumoKo, caseKumoEn, caseAwarelabKo, caseAwarelabEn, casePrestigeKo, casePrestigeEn } from '$lib/data/cases';
  import { blogPostsKo, blogPostsEn } from '$lib/data/blog';
  import { locale } from '$lib/i18n/runes.svelte';
  import Glass from '$lib/components/Glass.svelte';
  import Nav from '$lib/components/Nav.svelte';

  import ssMain from '$lib/assets/projects/screenshots/kumo/main.gif';
  import ssAbstract from '$lib/assets/projects/screenshots/kumo/abstract.gif';
  import ssOption from '$lib/assets/projects/screenshots/kumo/optionChange.gif';
  import ssDeploy from '$lib/assets/projects/screenshots/kumo/application-deploy.jpg';
  import ssBranch from '$lib/assets/projects/screenshots/kumo/environment-branch.jpg';

  const screenshots = [
    { src: ssMain, alt: 'Kumo Main Canvas' },
    { src: ssAbstract, alt: 'Abstract View' },
    { src: ssOption, alt: 'Option Change' },
    { src: ssDeploy, alt: 'Application Deploy' },
    { src: ssBranch, alt: 'Environment Branch' },
  ];

  const D = $derived(locale.current === 'ko' ? caseKumoKo : caseKumoEn);
  const caseAwarelab = $derived(locale.current === 'ko' ? caseAwarelabKo : caseAwarelabEn);
  const casePrestige = $derived(locale.current === 'ko' ? casePrestigeKo : casePrestigeEn);
  const blogPosts = $derived(locale.current === 'ko' ? blogPostsKo : blogPostsEn);
  const related = $derived(blogPosts.filter((p) => D.relatedPosts.includes(p.slug)));

  /* ---- Interactive SVG canvas demo ---- */
  const nodes = [
    { x: 100, y: 100, label: 'VPC' },
    { x: 320, y: 100, label: 'ALB' },
    { x: 560, y: 80, label: 'ECS \u00B7 web' },
    { x: 560, y: 200, label: 'ECS \u00B7 api' },
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

    const pt = toWorld(e);
    const r = svgEl.getBoundingClientRect();
    const fx = (e.clientX - r.left) / r.width;
    const fy = (e.clientY - r.top) / r.height;

    let delta = e.deltaY / 1000;
    if (e.deltaY !== 0 && Math.abs(delta) < 0.05) {
      delta = 0.05 * Math.sign(e.deltaY);
    }
    scale = Math.max(SCALE_MIN, Math.min(SCALE_MAX, scale + delta));

    const nw = VB_ORIGIN.w * scale;
    const nh = VB_ORIGIN.h * scale;

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

<div class="case-page">
  <Nav active="work" />

  <!-- 1. Title Section -->
  <section class="title-section">
    <div class="meta-bar">
      <a href="/projects" class="back-link">&larr; /projects</a>
      <span class="grad-text shipped-badge">&bullet; shipped {D.year}</span>
      <span>{D.role}</span>
      <span>{D.stackBadge}</span>
    </div>
    <h1 class="title-h1">{D.label}</h1>
    <p class="one-liner">{D.oneLiner}</p>
  </section>

  <!-- 2. WHY Section -->
  {#if D.why}
    <section class="why-section">
      <Glass>
        <div class="why-grid">
          <div class="why-label">
            <span class="grad-text why-title">WHY</span>
            <span class="why-sub">I STARTED THIS</span>
          </div>
          <div class="why-body">{D.why}</div>
        </div>
      </Glass>
    </section>
  {/if}

  <!-- 3. Metrics -->
  <section class="metrics-section">
    <Glass>
      <div class="metrics-grid">
        {#each D.metrics as m}
          <div class="metric-cell">
            <div class="metric-label">{m.k}</div>
            <div class="metric-values">
              {#if m.before}
                <span class="metric-before">{m.before}</span>
                <span class="metric-arrow">&rarr;</span>
              {/if}
              <span class="metric-after grad-text">{m.after}</span>
            </div>
            <div class="metric-delta">{m.delta}</div>
            <div class="metric-note">{m.note}</div>
          </div>
        {/each}
      </div>
    </Glass>
  </section>

  <!-- 4. Problem -->
  <section class="problem-section">
    <div class="section-label">&textcircled;1 PROBLEM</div>
    <h2 class="problem-q">"{D.problemQ}"</h2>
    <p class="problem-def">DEF. {D.problemDef}</p>
  </section>

  <!-- 5. SVG Canvas Demo (Kumo only) -->
  <section class="demo-section">
    <div class="demo-bar">
      <span>LIVE &middot; /demo/canvas.svg</span>
      <span class="demo-dim">viewBox: {vb.x.toFixed(0)} {vb.y.toFixed(0)} {vb.w.toFixed(0)} {vb.h.toFixed(0)}</span>
      <span class="demo-dim">drag &middot; scroll to zoom</span>
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
      style="display: block; background: #0C0D10; cursor: {dragging ? 'grabbing' : 'grab'};"
    >
      <defs>
        <pattern id="kdots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#ECEEF21F" />
        </pattern>
      </defs>
      <rect x={vb.x - 2000} y={vb.y - 2000} width={vb.w + 4000} height={vb.h + 4000} fill="url(#kdots)" />
      {#each lines as l}
        <path d="M{l[0]} {l[1]} L{l[2]} {l[3]}" stroke="#7FE9E1" stroke-width="2" fill="none" opacity="0.7" />
      {/each}
      {#each nodes as n}
        <g>
          <rect x={n.x} y={n.y} width="160" height="64" rx="8" fill="#ECEEF2" stroke="#7FE9E1" stroke-width="2" />
          <text x={n.x + 12} y={n.y + 24} font-family="var(--font-mono)" font-size="11" fill="#7A8BAA">service</text>
          <text x={n.x + 12} y={n.y + 46} font-family="var(--font-mono)" font-size="14" font-weight="700" fill="#0C0D10">{n.label}</text>
        </g>
      {/each}
    </svg>
  </section>

  <!-- 6. Decisions -->
  <section class="decisions-section">
    <div class="section-label">&textcircled;3 DECISIONS</div>
    {#each D.decisions as d}
      <div class="decision-row">
        <span class="decision-n grad-text">{d.n}</span>
        <h3 class="decision-title">{d.title}</h3>
        <p class="decision-body">{d.body}</p>
      </div>
    {/each}
  </section>

  <!-- 7. Code Spotlight -->
  {#if D.code}
    <section class="code-section">
      <div class="section-label">&textcircled;4 CODE &middot; {D.code.label}</div>
      <div class="code-layout">
        <div class="code-info">
          <h3 class="code-title">{D.code.title}</h3>
          <p class="code-desc">{D.code.desc}</p>
        </div>
        <Glass>
          <pre class="code-block"><code>{D.code.body}</code></pre>
        </Glass>
      </div>
    </section>
  {/if}

  <!-- 8. Outcome -->
  <section class="outcome-section">
    <div class="section-label">&textcircled;5 OUTCOME</div>
    <h2 class="outcome-heading">
      {#each D.outcomeHeadline.split('|') as part, i}
        {#if i % 2 === 1}<span class="grad-text">{part}</span>{:else}{part}{/if}
      {/each}
    </h2>
    <Glass>
      <ul class="outcome-list">
        {#each D.outcomes as o}
          <li>{o}</li>
        {/each}
      </ul>
    </Glass>
  </section>

  <!-- Gallery -->
  <section class="gallery-section">
    <div class="gallery-scroll">
      {#each screenshots as ss}
        <div class="gallery-item">
          <img src={ss.src} alt={ss.alt} loading="lazy" />
          <span class="gallery-caption">{ss.alt}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- 9. Related Writing -->
  {#if related.length > 0}
    <section class="related-section">
      <div class="related-header">
        <span class="section-label">&textcircled;6 RELATED WRITING</span>
        <a href="/blog" class="all-posts-link">ALL POSTS &rarr;</a>
      </div>
      <div class="related-grid" class:single={related.length === 1}>
        {#each related as post}
          <a href="/blog/{post.slug}" class="related-card-link">
            <Glass hover>
              <div class="related-card">
                <div class="related-meta">
                  <span class="grad-text related-tag"># {post.tag}</span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h4 class="related-title">{post.title}</h4>
                <p class="related-excerpt">{post.excerpt}</p>
              </div>
            </Glass>
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <!-- 10. Prev / Next -->
  <section class="nav-section">
    <div class="nav-cards">
      <a href={caseAwarelab.route} class="nav-card-link">
        <Glass hover>
          <div class="nav-card">
            <span class="nav-card-dir">&larr; Prev</span>
            <span class="nav-card-title">{caseAwarelab.q}</span>
          </div>
        </Glass>
      </a>
      <a href={casePrestige.route} class="nav-card-link">
        <Glass hover>
          <div class="nav-card">
            <span class="nav-card-dir">Next &rarr;</span>
            <span class="nav-card-title">{casePrestige.q}</span>
          </div>
        </Glass>
      </a>
    </div>
  </section>

  <!-- 11. Bottom link -->
  <div class="bottom-link-section">
    <a href="/projects" class="bottom-back">&larr; ALL PROJECTS</a>
  </div>
</div>

<style>
  .case-page {
    min-height: 100vh;
    background: #0C0D10;
    color: #ECEEF2;
    font-family: var(--font-sans);
  }

  /* Section label */
  .section-label {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--dim);
    letter-spacing: 0.06em;
    margin-bottom: 24px;
  }

  /* Title Section */
  .title-section {
    padding: 80px 40px 40px;
    max-width: 960px;
    margin: 0 auto;
  }
  .meta-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--dim);
    margin-bottom: 32px;
  }
  .back-link {
    color: var(--dim);
    text-decoration: none;
    transition: color 0.2s;
  }
  .back-link:hover { color: #ECEEF2; }
  .shipped-badge {
    font-weight: 700;
  }
  .title-h1 {
    font-size: clamp(56px, 9vw, 124px);
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 0.92;
    margin: 0 0 24px;
    color: #ECEEF2;
  }
  .one-liner {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 22px;
    font-weight: 400;
    color: #ECEEF2cc;
    max-width: 700px;
    margin: 0;
    line-height: 1.4;
  }

  /* WHY Section */
  .why-section {
    padding: 0 40px 40px;
    max-width: 960px;
    margin: 0 auto;
  }
  .why-grid {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 32px;
    padding: 32px;
  }
  .why-label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .why-title {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
  }
  .why-sub {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--dim);
    letter-spacing: 0.06em;
  }
  .why-body {
    font-size: 18px;
    line-height: 1.7;
    color: #ECEEF2ee;
  }

  /* Metrics */
  .metrics-section {
    padding: 0 40px 32px;
    max-width: 960px;
    margin: 0 auto;
  }
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    padding: 24px;
  }
  .metric-cell { padding: 16px; }
  .metric-label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }
  .metric-values {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 6px;
  }
  .metric-before {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--dimmer);
    text-decoration: line-through;
  }
  .metric-arrow {
    font-size: 12px;
    color: var(--dimmer);
  }
  .metric-after {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .metric-delta {
    font-family: var(--font-mono);
    font-size: 12px;
    color: #7FE9E1;
    margin-bottom: 4px;
  }
  .metric-note {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dimmer);
  }

  /* Problem */
  .problem-section {
    padding: 48px 40px;
    max-width: 960px;
    margin: 0 auto;
  }
  .problem-q {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: clamp(32px, 4.5vw, 56px);
    line-height: 1.15;
    font-weight: 400;
    margin: 0 0 24px;
    color: #ECEEF2;
  }
  .problem-def {
    font-size: 16px;
    line-height: 1.7;
    color: #ECEEF2cc;
    max-width: 720px;
    margin: 0;
  }

  /* Demo */
  .demo-section {
    margin: 0 auto 48px;
    padding: 0 40px;
    max-width: 960px;
  }
  .demo-section > :global(:last-child) {
    border-radius: 0 0 16px 16px;
    overflow: hidden;
  }
  .demo-bar {
    padding: 14px 24px;
    background: #0E1730;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.06em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ECEEF2;
    border: 1px solid var(--line);
    border-bottom: none;
    border-radius: 16px 16px 0 0;
  }
  .demo-dim { color: var(--dim); }
  :global(.demo-svg) {
    height: 500px;
    display: block;
    border: 1px solid var(--line);
    border-top: none;
    border-radius: 0 0 16px 16px;
  }

  /* Decisions */
  .decisions-section {
    padding: 48px 40px;
    max-width: 960px;
    margin: 0 auto;
  }
  .decision-row {
    display: grid;
    grid-template-rows: 80px 1fr 2fr;
    padding: 24px 0;
    border-bottom: 1px solid var(--line);
  }
  .decision-row:first-of-type {
    border-top: 1px solid var(--line);
  }
  .decision-n {
    font-family: var(--font-mono);
    font-size: 32px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
  .decision-title {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    line-height: 1.3;
  }
  .decision-body {
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.7;
    color: var(--dim);
    margin: 0;
  }

  /* Code */
  .code-section {
    padding: 48px 40px;
    max-width: 960px;
    margin: 0 auto;
  }
  .code-layout {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 24px;
    align-items: start;
  }
  .code-title {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 26px;
    font-weight: 400;
    margin: 0 0 12px;
    line-height: 1.2;
  }
  .code-desc {
    font-size: 14px;
    line-height: 1.7;
    color: #ECEEF2cc;
    margin: 0;
  }
  .code-block {
    background: #06091A;
    color: #ECEEF2;
    padding: 24px;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.7;
    margin: 0;
    overflow-x: auto;
    white-space: pre;
    border-radius: 12px;
  }

  /* Outcome */
  .outcome-section {
    padding: 60px 40px;
    max-width: 960px;
    margin: 0 auto;
  }
  .outcome-heading {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: clamp(40px, 6vw, 76px);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 0 32px;
  }
  .outcome-list {
    list-style: none;
    padding: 24px;
    margin: 0;
  }
  .outcome-list li {
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.8;
    color: var(--dim);
    padding: 6px 0;
  }
  .outcome-list li::before {
    content: '\2192  ';
    color: #7FE9E1;
  }

  /* Related Writing */
  .related-section {
    padding: 48px 40px;
    max-width: 960px;
    margin: 0 auto;
  }
  .related-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .related-header .section-label {
    margin-bottom: 0;
  }
  .all-posts-link {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--dim);
    text-decoration: none;
    letter-spacing: 0.06em;
    transition: color 0.2s;
  }
  .all-posts-link:hover { color: #ECEEF2; }
  .related-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .related-grid.single {
    grid-template-columns: 1fr;
  }
  .related-card-link {
    text-decoration: none;
    color: #ECEEF2;
  }
  .related-card {
    padding: 24px;
  }
  .related-meta {
    display: flex;
    gap: 12px;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    margin-bottom: 12px;
  }
  .related-tag {
    font-weight: 700;
  }
  .related-title {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 20px;
    font-weight: 400;
    margin: 0 0 8px;
    line-height: 1.3;
  }
  .related-excerpt {
    font-size: 13px;
    line-height: 1.6;
    color: #ECEEF299;
    margin: 0;
  }

  /* Nav cards */
  .nav-section {
    padding: 40px;
    max-width: 960px;
    margin: 0 auto;
  }
  .nav-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .nav-card-link {
    text-decoration: none;
    color: #ECEEF2;
  }
  .nav-card {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .nav-card-dir {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    letter-spacing: 0.06em;
  }
  .nav-card-title {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
  }

  /* Bottom link */
  .bottom-link-section {
    padding: 20px 40px 60px;
    max-width: 960px;
    margin: 0 auto;
  }
  .bottom-back {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--dim);
    text-decoration: none;
    transition: color 0.2s;
  }
  .bottom-back:hover { color: #ECEEF2; }

  /* Gallery */
  .gallery-section {
    padding: 32px 0 40px;
    max-width: 100%;
    overflow: hidden;
  }
  .gallery-scroll {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding: 0 40px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .gallery-scroll::-webkit-scrollbar { display: none; }
  .gallery-item {
    flex: 0 0 auto;
    width: 560px;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .gallery-item img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    border: 1px solid var(--line);
    object-fit: cover;
  }
  .gallery-caption {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    letter-spacing: 0.04em;
  }

  /* Mobile */
  @media (max-width: 760px) {
    .title-section { padding: 60px 20px 32px; }
    .why-section,
    .metrics-section,
    .code-section,
    .outcome-section,
    .related-section,
    .nav-section { padding-left: 20px; padding-right: 20px; }
    .problem-section,
    .decisions-section { padding: 32px 20px; }
    .demo-section { padding: 0 20px; }
    .bottom-link-section { padding: 20px 20px 48px; }
    .gallery-scroll { padding: 0 20px; }
    .gallery-item { width: 400px; }
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
    .code-layout { grid-template-columns: 1fr; }
    .why-grid { grid-template-columns: 1fr; gap: 16px; }
    .nav-cards { grid-template-columns: 1fr; }
    .related-grid { grid-template-columns: 1fr; }
    .demo-bar { flex-wrap: wrap; gap: 8px; padding: 12px 16px; }
    .decision-row {
      grid-template-rows: auto auto auto;
    }
    .decision-n { font-size: 24px; }
  }

  @media (max-width: 480px) {
    .title-section { padding: 48px 16px 24px; }
    .why-section,
    .metrics-section,
    .code-section,
    .outcome-section,
    .related-section,
    .nav-section { padding-left: 16px; padding-right: 16px; }
    .problem-section,
    .decisions-section { padding: 24px 16px; }
    .demo-section { padding: 0 16px; }
    .bottom-link-section { padding: 16px 16px 40px; }
    .gallery-scroll { padding: 0 16px; }
    .gallery-item { width: 300px; }
    .metrics-grid { grid-template-columns: 1fr; }
    .title-h1 { font-size: clamp(36px, 10vw, 56px); }
    .problem-q { font-size: clamp(24px, 6vw, 32px); }
    .metric-after { font-size: 22px; }
    .outcome-heading { font-size: clamp(28px, 7vw, 40px); }
    .code-block { font-size: 11px; padding: 16px; }
    .demo-bar { font-size: 10px; }
    :global(.demo-svg) { height: 300px; }
    .meta-bar { gap: 12px; }
  }
</style>
