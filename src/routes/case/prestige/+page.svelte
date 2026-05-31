<script lang="ts">
  import { casePrestigeKo, casePrestigeEn, caseKumoKo, caseKumoEn } from '$lib/data/cases';
  import { blogPostsKo, blogPostsEn } from '$lib/data/blog';
  import { locale } from '$lib/i18n/runes.svelte';
  import Glass from '$lib/components/Glass.svelte';
  import Nav from '$lib/components/Nav.svelte';

  import ssMain from '$lib/assets/projects/screenshots/the-prestige/main.png';
  import ssBookmark from '$lib/assets/projects/screenshots/the-prestige/bookmark.png';
  import ssFacility from '$lib/assets/projects/screenshots/the-prestige/facility-detail.png';
  import ssInquiry from '$lib/assets/projects/screenshots/the-prestige/inquiry.png';

  const screenshots = [
    { src: ssMain, alt: 'The Prestige Main' },
    { src: ssBookmark, alt: 'Bookmark Page' },
    { src: ssFacility, alt: 'Facility Detail' },
    { src: ssInquiry, alt: 'Inquiry Page' },
  ];

  const D = $derived(locale.current === 'ko' ? casePrestigeKo : casePrestigeEn);
  const caseKumo = $derived(locale.current === 'ko' ? caseKumoKo : caseKumoEn);
  const blogPosts = $derived(locale.current === 'ko' ? blogPostsKo : blogPostsEn);
  const related = $derived(blogPosts.filter((p) => D.relatedPosts.includes(p.slug)));
</script>

<svelte:head>
  <title>The Prestige — Case Study | HyoGeun Kim</title>
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

  <!-- 5. Decisions -->
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

  <!-- 6. Outcome -->
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

  <!-- 7. Related Writing -->
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

  <!-- 8. Prev / Next -->
  <section class="nav-section">
    <div class="nav-cards">
      <a href={caseKumo.route} class="nav-card-link">
        <Glass hover>
          <div class="nav-card">
            <span class="nav-card-dir">&larr; Prev</span>
            <span class="nav-card-title">{caseKumo.q}</span>
          </div>
        </Glass>
      </a>
      <div class="nav-card-placeholder"></div>
    </div>
  </section>

  <!-- 9. Bottom link -->
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
  .nav-card-placeholder { }
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
    .outcome-section,
    .related-section,
    .nav-section { padding-left: 20px; padding-right: 20px; }
    .problem-section,
    .decisions-section { padding: 32px 20px; }
    .bottom-link-section { padding: 20px 20px 48px; }
    .gallery-scroll { padding: 0 20px; }
    .gallery-item { width: 400px; }
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
    .why-grid { grid-template-columns: 1fr; gap: 16px; }
    .nav-cards { grid-template-columns: 1fr; }
    .nav-card-placeholder { display: none; }
    .related-grid { grid-template-columns: 1fr; }
    .decision-row {
      grid-template-rows: auto auto auto;
    }
    .decision-n { font-size: 24px; }
  }

  @media (max-width: 480px) {
    .title-section { padding: 48px 16px 24px; }
    .why-section,
    .metrics-section,
    .outcome-section,
    .related-section,
    .nav-section { padding-left: 16px; padding-right: 16px; }
    .problem-section,
    .decisions-section { padding: 24px 16px; }
    .bottom-link-section { padding: 16px 16px 40px; }
    .gallery-scroll { padding: 0 16px; }
    .gallery-item { width: 300px; }
    .metrics-grid { grid-template-columns: 1fr; }
    .title-h1 { font-size: clamp(36px, 10vw, 56px); }
    .problem-q { font-size: clamp(24px, 6vw, 32px); }
    .metric-after { font-size: 22px; }
    .outcome-heading { font-size: clamp(28px, 7vw, 40px); }
    .meta-bar { gap: 12px; }
  }
</style>
