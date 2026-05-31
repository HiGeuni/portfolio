<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Glass from '$lib/components/Glass.svelte';
  import { blogPostsKo, blogPostsEn, blogTagsKo, blogTagsEn } from '$lib/data/blog';
  import type { BlogPost } from '$lib/data/blog';
  import { locale } from '$lib/i18n/runes.svelte';

  let tag = $state('All');

  const blogPosts = $derived(locale.current === 'ko' ? blogPostsKo : blogPostsEn);
  const blogTags = $derived(locale.current === 'ko' ? blogTagsKo : blogTagsEn);

  const posts = $derived(
    tag === 'All' ? blogPosts : blogPosts.filter((p) => p.tag === tag || p.tags.includes(tag))
  );

  /** Group posts by their primary tag. */
  function groupByTag(items: BlogPost[]) {
    const order = blogTags.filter((t) => t !== 'All');
    const groups: { tag: string; posts: BlogPost[] }[] = [];
    for (const t of order) {
      const matched = items.filter((p) => p.tag === t);
      if (matched.length > 0) groups.push({ tag: t, posts: matched });
    }
    return groups;
  }

  const grouped = $derived(tag === 'All' ? groupByTag(posts) : [{ tag, posts }]);
</script>

<svelte:head>
  <title>Blog -- Higeuni</title>
</svelte:head>

<Nav active="blog" />

<!-- Hero -->
<section class="hero">
  <div class="meta-bar">
    <span class="meta-left">/BLOG &middot; 2026</span>
    <span class="grad-text meta-count">&bull; {posts.length} POSTS</span>
    <span class="meta-right">NOTES ON DEFINING PROBLEMS</span>
  </div>

  <h1 class="hero-title">
    Pick a<br />
    <span class="grad-text hero-accent">thread.</span>
  </h1>

  <p class="hero-sub">
    {#if locale.current === 'ko'}
      어려운 부분을 어떻게 정의했는지에 대한 노트.
      캔버스&middot;성능&middot;상태&middot;마이그레이션
      &mdash; 실무에서 부딪힌 결정을 글로 남깁니다.
    {:else}
      Notes on how I defined the hard parts.
      Canvas&middot;performance&middot;state&middot;migration
      &mdash; documenting decisions from real work.
    {/if}
  </p>
</section>

<!-- Filter strip -->
<section class="filter-section">
  <Glass>
    <div class="filter-inner">
      <span class="filter-label">FILTER BY TAG</span>
      <div class="filter-tags">
        {#each blogTags as t}
          <button
            class="filter-btn"
            class:active={tag === t}
            onclick={() => (tag = t)}
          >
            {t}
          </button>
        {/each}
      </div>
    </div>
  </Glass>
</section>

<!-- Grouped post list -->
<section class="posts-section">
  {#each grouped as group}
    <div class="group">
      <div class="group-header">
        <span class="group-hash">#</span>
        <span class="grad-text group-name">{group.tag}</span>
        <span class="group-count">{group.posts.length}</span>
      </div>

      {#each group.posts as post}
        <a href="/blog/{post.slug}/" class="post-row">
          <span class="post-date">{post.date}</span>
          <div class="post-body">
            <div class="post-title-line">
              {#if post.pinned}<span class="grad-text post-pin">&starf;</span>{/if}
              <span class="post-title">{post.title}</span>
            </div>
            <div class="post-excerpt">{post.excerpt}</div>
          </div>
          <span class="post-read">{post.readTime}</span>
          <span class="post-arrow">&rarr;</span>
        </a>
      {/each}
    </div>
  {/each}
</section>

<!-- Footer -->
<footer class="blog-footer">
  <span>&copy; 2026 HIGEUNI</span>
  <span>Find the question first.</span>
</footer>

<style>
  /* -------- Hero -------- */
  .hero {
    padding: 100px 40px 48px;
  }

  .meta-bar {
    display: flex;
    align-items: center;
    gap: 24px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--dim);
    margin-bottom: 32px;
    flex-wrap: wrap;
  }

  .meta-right {
    margin-left: auto;
  }

  .meta-count {
    font-weight: 700;
  }

  .hero-title {
    font-size: clamp(56px, 10vw, 148px);
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 0.88;
    margin: 0;
  }
  .hero-accent {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
  }


  .hero-sub {
    margin-top: 40px;
    max-width: 680px;
    font-size: 16px;
    line-height: 1.7;
    color: var(--dim);
  }

  /* -------- Filter strip -------- */
  .filter-section {
    padding: 0 40px 48px;
  }

  .filter-inner {
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .filter-label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .filter-btn {
    font-family: var(--font-mono);
    font-size: 12px;
    padding: 6px 16px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--text);
    background: transparent;
    border: 1px solid #ECEEF220;
  }

  .filter-btn:hover {
    background: #ECEEF210;
    border-color: #ECEEF230;
  }

  .filter-btn.active {
    background: var(--gradient);
    color: #0C0D10;
    border-color: transparent;
    font-weight: 700;
  }

  /* -------- Groups -------- */
  .posts-section {
    padding: 0 40px 80px;
  }

  .group {
    margin-bottom: 56px;
  }

  .group-header {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--line);
  }

  .group-hash {
    font-family: var(--font-mono);
    font-size: 18px;
    color: var(--dim);
  }

  .group-name {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 26px;
    font-weight: 400;
  }

  .group-count {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    margin-left: 8px;
  }

  /* -------- Post rows -------- */
  .post-row {
    display: grid;
    grid-template-columns: 120px 1fr 100px 40px;
    align-items: start;
    padding: 20px 0;
    border-bottom: 1px solid #ECEEF208;
    text-decoration: none;
    color: var(--text);
    transition: transform 0.25s ease, background 0.2s;
  }

  .post-row:hover {
    transform: translateX(8px);
    background: #ECEEF204;
  }

  .post-date {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--dim);
    padding-top: 4px;
  }

  .post-body {
    min-width: 0;
  }

  .post-title-line {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .post-pin {
    font-size: 16px;
    flex-shrink: 0;
  }

  .post-title {
    font-size: 22px;
    font-weight: 500;
    font-family: var(--font-sans);
    line-height: 1.3;
  }

  .post-excerpt {
    font-size: 12px;
    color: var(--dim);
    margin-top: 6px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .post-read {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    text-align: right;
    padding-top: 6px;
  }

  .post-arrow {
    font-size: 20px;
    color: var(--dim);
    text-align: right;
    padding-top: 2px;
    transition: color 0.2s;
  }

  .post-row:hover .post-arrow {
    color: var(--mint);
  }

  /* -------- Footer -------- */
  .blog-footer {
    padding: 40px 40px 60px;
    border-top: 1px solid var(--line);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    display: flex;
    justify-content: space-between;
  }

  /* -------- Mobile 760 -------- */
  @media (max-width: 760px) {
    .hero {
      padding: 60px 20px 36px;
    }

    .meta-bar {
      gap: 12px;
    }

    .meta-right {
      margin-left: 0;
      width: 100%;
    }

    .hero-sub {
      font-size: 14px;
    }

    .filter-section {
      padding: 0 20px 36px;
    }

    .filter-inner {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .posts-section {
      padding: 0 20px 60px;
    }

    .post-row {
      grid-template-columns: 1fr 80px;
      gap: 0;
    }

    .post-date {
      grid-column: 1 / -1;
      margin-bottom: 6px;
    }

    .post-arrow {
      display: none;
    }

    .post-read {
      text-align: left;
      padding-top: 8px;
    }

    .blog-footer {
      padding: 32px 20px 48px;
    }
  }

  /* -------- Mobile 480 -------- */
  @media (max-width: 480px) {
    .hero {
      padding: 40px 16px 28px;
    }

    .filter-section {
      padding: 0 16px 28px;
    }

    .filter-inner {
      padding: 16px;
    }

    .posts-section {
      padding: 0 16px 48px;
    }

    .post-row {
      grid-template-columns: 1fr;
    }

    .post-read {
      text-align: left;
    }

    .post-title {
      font-size: 18px;
    }

    .group-name {
      font-size: 22px;
    }

    .blog-footer {
      padding: 24px 16px 40px;
      flex-direction: column;
      gap: 8px;
    }
  }
</style>
