<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Glass from '$lib/components/Glass.svelte';
  import { locale } from '$lib/i18n/runes.svelte';
  import type { BlogPost } from '$lib/data/blog';
  import type { ContentBlock } from '$lib/data/blog-content';

  interface PageData {
    postKo: BlogPost;
    postEn: BlogPost;
    contentKo: ContentBlock[];
    contentEn: ContentBlock[];
    idx: number;
    prevKo: BlogPost | null;
    prevEn: BlogPost | null;
    nextKo: BlogPost | null;
    nextEn: BlogPost | null;
    total: number;
  }

  let { data }: { data: PageData } = $props();
  const post = $derived(locale.current === 'ko' ? data.postKo : data.postEn);
  const content = $derived(locale.current === 'ko' ? data.contentKo : data.contentEn);
  const idx = $derived(data.idx);
  const prev = $derived(locale.current === 'ko' ? data.prevKo : data.prevEn);
  const next = $derived(locale.current === 'ko' ? data.nextKo : data.nextEn);
  const total = $derived(data.total);
  const postNum = $derived(String(idx + 1).padStart(2, '0'));
  const totalNum = $derived(String(total).padStart(2, '0'));
</script>

<svelte:head>
  <title>{post.title} -- Higeuni Blog</title>
</svelte:head>

<Nav active="blog" />

<!-- Header -->
<header class="post-header">
  <div class="header-meta">
    <a href="/blog" class="back-link">&larr; /blog</a>
    <span class="header-tag grad-text"># {post.tag}</span>
    <span class="header-date">{post.date}</span>
    <span class="header-read">{post.readTime}</span>
  </div>

  <h1 class="post-title">{post.title}</h1>

  <p class="post-excerpt">{post.excerpt}</p>

  <div class="post-tags">
    {#each post.tags as t}
      <span class="pill">{t}</span>
    {/each}
  </div>
</header>

<!-- Article body -->
<article class="article">
  {#each content as block, i (i)}
    {#if block.type === 'blockquote'}
      <blockquote class="bq">{block.text}</blockquote>
    {:else if block.type === 'h2'}
      <h2 class="article-h2">{block.text}</h2>
    {:else if block.type === 'p'}
      <p class="article-p">{@html block.html}</p>
    {:else if block.type === 'code'}
      <Glass>
        <div class="code-block">
          <div class="code-header">
            <span class="code-lang">{block.lang}</span>
            <span class="code-file">{block.file}</span>
          </div>
          <pre class="code-pre"><code>{block.body}</code></pre>
        </div>
      </Glass>
    {:else if block.type === 'list'}
      <ul class="article-list">
        {#each block.items as item}
          <li>{@html item}</li>
        {/each}
      </ul>
    {/if}
  {/each}
</article>

<!-- Prev / Next -->
<nav class="pn-nav">
  {#if prev}
    <a href="/blog/{prev.slug}/" class="pn-card">
      <Glass hover>
        <div class="pn-inner">
          <span class="pn-label">&larr; PREV</span>
          <span class="pn-title">{prev.title}</span>
        </div>
      </Glass>
    </a>
  {:else}
    <div></div>
  {/if}

  {#if next}
    <a href="/blog/{next.slug}/" class="pn-card pn-next">
      <Glass hover>
        <div class="pn-inner pn-inner-next">
          <span class="pn-label">NEXT &rarr;</span>
          <span class="pn-title">{next.title}</span>
        </div>
      </Glass>
    </a>
  {:else}
    <div></div>
  {/if}
</nav>

<!-- Back link & counter -->
<footer class="post-footer">
  <a href="/blog" class="footer-back">&larr; BACK TO /BLOG</a>
  <span class="footer-counter">POST {postNum} / {totalNum}</span>
</footer>

<style>
  /* -------- Header -------- */
  .post-header {
    padding: 80px 40px 48px;
    max-width: 860px;
    margin: 0 auto;
  }

  .header-meta {
    display: flex;
    align-items: center;
    gap: 20px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--dim);
    margin-bottom: 32px;
    flex-wrap: wrap;
  }

  .back-link {
    color: var(--dim);
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--text);
  }

  .header-tag {
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .post-title {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    font-size: clamp(40px, 6vw, 80px);
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin: 0 0 24px;
  }

  .post-excerpt {
    font-size: 17px;
    line-height: 1.65;
    color: #ECEEF2cc;
    margin: 0 0 24px;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .pill {
    font-family: var(--font-mono);
    font-size: 10px;
    padding: 4px 12px;
    border-radius: 999px;
    background: #ECEEF208;
    border: 1px solid #ECEEF215;
    color: var(--dim);
    letter-spacing: 0.05em;
  }

  /* -------- Article -------- */
  .article {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 40px 80px;
  }

  .bq {
    border-left: 3px solid transparent;
    border-image: var(--gradient) 1;
    padding: 20px 24px;
    margin: 0 0 48px;
    font-size: 15px;
    line-height: 1.7;
    color: var(--dim);
    font-style: italic;
    background: #ECEEF204;
  }

  .article-h2 {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    font-size: 32px;
    margin: 48px 0 20px;
    letter-spacing: -0.01em;
  }

  .article-p {
    font-size: 16px;
    line-height: 1.75;
    color: #ECEEF2dd;
    margin: 0 0 32px;
  }

  .article-p :global(strong) {
    color: var(--text);
    font-weight: 600;
  }

  .article-p :global(em) {
    color: var(--mint);
    font-style: italic;
  }

  .article-p :global(code) {
    font-family: var(--font-mono);
    font-size: 14px;
    background: #ECEEF20a;
    border: 1px solid #ECEEF212;
    padding: 2px 6px;
    border-radius: 4px;
    color: var(--mint);
  }

  /* Code block */
  .code-block {
    padding: 0;
    overflow: hidden;
  }

  .code-header {
    display: flex;
    justify-content: space-between;
    padding: 12px 20px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    border-bottom: 1px solid #ECEEF210;
  }

  .code-pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.7;
    color: #ECEEF2dd;
  }

  .code-pre code {
    font-family: inherit;
  }

  /* List */
  .article-list {
    list-style: none;
    padding: 0;
    margin: 0 0 48px;
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.8;
    color: #ECEEF2cc;
  }

  .article-list li {
    padding: 6px 0;
    padding-left: 20px;
    position: relative;
  }

  .article-list li::before {
    content: '\2022';
    position: absolute;
    left: 0;
    color: var(--mint);
  }

  .article-list li :global(code) {
    font-family: var(--font-mono);
    font-size: 13px;
    background: #ECEEF20a;
    border: 1px solid #ECEEF212;
    padding: 1px 5px;
    border-radius: 4px;
    color: var(--mint);
  }

  .article-list li :global(strong) {
    color: var(--text);
    font-weight: 600;
  }

  /* -------- Prev / Next -------- */
  .pn-nav {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 40px 48px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .pn-card {
    text-decoration: none;
    color: var(--text);
    display: block;
  }

  .pn-inner {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pn-inner-next {
    text-align: right;
  }

  .pn-label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    letter-spacing: 0.1em;
  }

  .pn-title {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* -------- Footer -------- */
  .post-footer {
    max-width: 860px;
    margin: 0 auto;
    padding: 32px 40px 80px;
    border-top: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 12px;
  }

  .footer-back {
    color: var(--dim);
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }

  .footer-back:hover {
    color: var(--text);
  }

  .footer-counter {
    color: var(--dim);
    letter-spacing: 0.1em;
  }

  /* -------- Mobile 760 -------- */
  @media (max-width: 760px) {
    .post-header {
      padding: 60px 20px 36px;
    }

    .header-meta {
      gap: 12px;
    }

    .article {
      padding: 0 20px 60px;
    }

    .pn-nav {
      padding: 0 20px 36px;
      grid-template-columns: 1fr;
    }

    .pn-inner-next {
      text-align: left;
    }

    .post-footer {
      padding: 24px 20px 60px;
    }
  }

  /* -------- Mobile 480 -------- */
  @media (max-width: 480px) {
    .post-header {
      padding: 40px 16px 28px;
    }

    .post-excerpt {
      font-size: 15px;
    }

    .article {
      padding: 0 16px 48px;
    }

    .article-h2 {
      font-size: 26px;
    }

    .bq {
      padding: 16px 18px;
      font-size: 14px;
    }

    .code-pre {
      font-size: 12px;
      padding: 16px;
    }

    .pn-nav {
      padding: 0 16px 28px;
    }

    .post-footer {
      padding: 20px 16px 48px;
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
    }
  }
</style>
