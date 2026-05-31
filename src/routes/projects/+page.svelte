<script lang="ts">
  import { allCasesKo, allCasesEn } from '$lib/data/cases';
  import { blogPostsKo, blogPostsEn } from '$lib/data/blog';
  import { locale } from '$lib/i18n/runes.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import Glass from '$lib/components/Glass.svelte';

  const allCases = $derived(locale.current === 'ko' ? allCasesKo : allCasesEn);
  const blogPosts = $derived(locale.current === 'ko' ? blogPostsKo : blogPostsEn);

  const earlierKo = [
    { y: '2023', n: 'SW Maestro · Kumo Factory', d: '노코드 클라우드 아키텍처 빌더 (위 케이스)' },
    { y: '2024', n: '덱신 · Photobooth Admin', d: 'Lerna 모노레포 · 4단계 캐스케이딩 필터 · 15+ 관리 페이지' },
    { y: '2022', n: 'GDSC · 공유 냉장고', d: '사회 취약계층 음식 공유 서비스 · Optimistic Update' },
  ];

  const earlierEn = [
    { y: '2023', n: 'SW Maestro · Kumo Factory', d: 'No-code cloud architecture builder (case above)' },
    { y: '2024', n: 'Dexin · Photobooth Admin', d: 'Lerna monorepo · 4-stage cascading filters · 15+ admin pages' },
    { y: '2022', n: 'GDSC · Hearty Fridge', d: 'Food sharing service for underserved communities · Optimistic Update' },
  ];

  const earlier = $derived(locale.current === 'ko' ? earlierKo : earlierEn);

  function relatedPostCount(slugs: string[]): number {
    return slugs.filter((s) => blogPosts.some((p: { slug: string }) => p.slug === s)).length;
  }
</script>

<svelte:head>
  <title>Selected Projects -- Higeuni</title>
</svelte:head>

<Nav active="work" />

<!-- Hero -->
<section class="hero">
  <div class="meta-bar">
    <span class="meta-left">/PROJECTS &middot; 2023&mdash;2026</span>
    <span class="grad-text meta-count">&bull; {allCases.length} CASE STUDIES</span>
    <span class="meta-right">FRONTEND-OF-ONE &times; 2 STARTUPS</span>
  </div>

  <h1 class="hero-title">
    Selected<br />
    <span class="grad-text hero-accent">projects.</span>
  </h1>

  <p class="hero-body">
    {#if locale.current === 'ko'}
      제품을 혼자 설계하고 배포한 기록. 각 프로젝트는 한 줄의 문제 정의에서
      시작했습니다 &mdash; 그 문제를 어떻게 정의하고 풀었는지 케이스 스터디와
      관련 글에서 자세히 다룹니다.
    {:else}
      A record of designing and shipping products solo. Each project started
      with a one-line problem definition &mdash; case studies and related posts
      cover how I defined and solved each one.
    {/if}
  </p>
</section>

<!-- Project cards -->
<section class="cards-section">
  {#each allCases as c, i}
    <Glass hover>
      <a href={c.route} class="card-link">
        <div class="card-top">
          <div class="card-meta-row">
            <span class="card-meta">0{i + 1} &middot; {c.year} &middot; {c.role}</span>
            <span class="card-badge">{c.stackBadge}</span>
          </div>
          <h2 class="card-title">{c.label}</h2>
          <p class="card-question">{c.problemQ}</p>
        </div>

        <div class="metric-strip" style="--cols: {c.metrics.length}">
          {#each c.metrics as m, mi}
            <div class="metric" class:metric-border={mi < c.metrics.length - 1}>
              <span class="metric-key">{m.k}</span>
              <span class="grad-text metric-value">{m.after}</span>
            </div>
          {/each}
        </div>

        <div class="card-footer">
          <span class="card-footer-text">
            {#if relatedPostCount(c.relatedPosts) > 0}
              {relatedPostCount(c.relatedPosts)} related posts
            {:else}
              Read case study
            {/if}
          </span>
          <span class="grad-text card-footer-arrow">&rarr;</span>
        </div>
      </a>
    </Glass>
  {/each}
</section>

<!-- Also / Earlier & Freelance -->
<section class="earlier-section">
  <div class="earlier-label">ALSO &middot; EARLIER & FREELANCE</div>
  <Glass>
    <div class="earlier-list">
      {#each earlier as row, ri}
        <div class="earlier-row" class:earlier-row-last={ri === earlier.length - 1}>
          <span class="earlier-year">{row.y}</span>
          <div class="earlier-info">
            <span class="earlier-name">{row.n}</span>
            <span class="earlier-desc">{row.d}</span>
          </div>
        </div>
      {/each}
    </div>
  </Glass>
</section>

<style>
  /* -------- Hero -------- */
  .hero {
    padding: 80px 40px 40px;
  }

  .meta-bar {
    display: flex;
    align-items: center;
    gap: 24px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.1em;
    color: var(--dim);
    margin-bottom: 32px;
    flex-wrap: wrap;
  }

  .meta-count {
    font-weight: 700;
  }

  .meta-right {
    margin-left: auto;
  }

  .hero-title {
    font-size: clamp(56px, 10vw, 140px);
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 0.9;
    margin: 0;
  }
  .hero-accent {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
  }
  .hero-body {
    margin-top: 40px;
    max-width: 720px;
    font-size: 17px;
    line-height: 1.65;
    color: #ECEEF2cc;
  }

  /* -------- Cards -------- */
  .cards-section {
    padding: 20px 40px 80px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .card-link {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  .card-top {
    padding: 36px 36px 28px;
  }

  .card-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .card-meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    letter-spacing: 0.05em;
  }

  .card-badge {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    letter-spacing: 0.05em;
  }

  .card-title {
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin: 16px 0 12px;
  }

  .card-question {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 17px;
    color: #ECEEF2cc;
    max-width: 760px;
    line-height: 1.5;
    margin: 0;
  }

  /* -------- Metric strip -------- */
  .metric-strip {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    border-top: 1px solid var(--line);
  }

  .metric {
    padding: 20px 36px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .metric-border {
    border-right: 1px solid var(--line);
  }

  .metric-key {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--dim);
    letter-spacing: 0.1em;
  }

  .metric-value {
    font-size: 26px;
    font-weight: 500;
  }

  /* -------- Card footer -------- */
  .card-footer {
    padding: 16px 36px;
    border-top: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-footer-text {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--dim);
  }

  .card-footer-arrow {
    font-size: 20px;
  }

  /* -------- Earlier section -------- */
  .earlier-section {
    padding: 0 40px 80px;
    margin-top: 48px;
  }

  .earlier-label {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--dim);
    letter-spacing: 0.1em;
    margin-bottom: 16px;
  }

  .earlier-list {
    /* no padding on Glass */
  }

  .earlier-row {
    display: grid;
    grid-template-columns: 100px 1fr;
    padding: 18px 28px;
    border-bottom: 1px solid var(--line);
    font-family: var(--font-mono);
    font-size: 13px;
    align-items: baseline;
  }

  .earlier-row-last {
    border-bottom: none;
  }

  .earlier-year {
    color: var(--dim);
  }

  .earlier-info {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px;
  }

  .earlier-name {
    font-family: var(--font-sans);
    font-size: 17px;
    font-weight: 500;
  }

  .earlier-desc {
    font-size: 12px;
    color: #ECEEF299;
    margin-left: 12px;
  }

  /* -------- Responsive 760px -------- */
  @media (max-width: 760px) {
    .hero {
      padding: 60px 20px 32px;
    }

    .meta-bar {
      gap: 12px;
    }

    .meta-right {
      margin-left: 0;
      width: 100%;
    }

    .cards-section {
      padding: 16px 20px 60px;
    }

    .card-top {
      padding: 28px 24px 20px;
    }

    .metric-strip {
      grid-template-columns: repeat(2, 1fr);
    }

    .metric-border {
      border-right: none;
    }

    .metric:nth-child(odd) {
      border-right: 1px solid var(--line);
    }

    .metric:nth-child(-n+2) {
      border-bottom: 1px solid var(--line);
    }

    .metric {
      padding: 16px 24px;
    }

    .card-footer {
      padding: 14px 24px;
    }

    .earlier-section {
      padding: 0 20px 60px;
    }

    .earlier-row {
      grid-template-columns: 80px 1fr;
      padding: 14px 20px;
    }

    .earlier-desc {
      margin-left: 0;
      display: block;
      width: 100%;
    }
  }

  /* -------- Responsive 480px -------- */
  @media (max-width: 480px) {
    .hero {
      padding: 40px 16px 24px;
    }

    .cards-section {
      padding: 12px 16px 48px;
    }

    .card-top {
      padding: 24px 20px 16px;
    }

    .card-title {
      font-size: clamp(28px, 7vw, 36px);
    }

    .card-question {
      font-size: 15px;
    }

    .metric-strip {
      grid-template-columns: 1fr;
    }

    .metric-border {
      border-right: none;
    }

    .metric:nth-child(odd) {
      border-right: none;
    }

    .metric:nth-child(-n+2) {
      border-bottom: none;
    }

    .metric {
      padding: 14px 20px;
      border-bottom: 1px solid var(--line);
    }

    .metric:last-child {
      border-bottom: none;
    }

    .card-footer {
      padding: 12px 20px;
    }

    .earlier-section {
      padding: 0 16px 48px;
    }

    .earlier-row {
      grid-template-columns: 1fr;
      gap: 4px;
      padding: 14px 16px;
    }

    .earlier-name {
      font-size: 15px;
    }

    .earlier-desc {
      margin-left: 0;
    }
  }
</style>
