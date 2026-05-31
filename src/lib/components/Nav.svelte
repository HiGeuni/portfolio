<script lang="ts">
  import { page } from '$app/stores';
  import { locale } from '$lib/i18n/runes.svelte';

  interface Props {
    active?: string;
  }

  let { active = 'work' }: Props = $props();
  let menuOpen = $state(false);

  const primary = [
    { label: 'work', href: '/projects' },
    { label: 'experience', href: '/#exp' },
    { label: 'about', href: '/#about' },
    { label: 'contact', href: '/#contact' },
  ];

  function openMenu() {
    menuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOpen = false;
    document.body.style.overflow = '';
  }
</script>

<header class="nav-header">
  <a href="/" class="nav-logo">
    higeuni<span class="grad-text">.</span>
  </a>
  <nav class="nav-links">
    {#each primary as link}
      <a href={link.href} class="nav-pill" class:active={active === link.label}>{link.label}</a>
    {/each}
    <a href="/#contact" class="nav-pill">resume ↓</a>
    <span class="nav-divider"></span>
    <button class="nav-pill nav-locale" onclick={() => locale.toggle()}>
      {locale.current === 'ko' ? 'EN' : 'KO'}
    </button>
    <a href="/blog" class="nav-blog" class:active={active === 'blog'}>/blog</a>
  </nav>
  <button class="hamburger" onclick={openMenu} aria-label="Open menu">
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  </button>
</header>

<!-- Mobile sheet -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="sheet-backdrop" class:open={menuOpen} onclick={closeMenu} onkeydown={(e) => { if (e.key === 'Escape') closeMenu(); }}></div>
<nav class="sheet" class:open={menuOpen}>
  <button class="sheet-close" onclick={closeMenu} aria-label="Close menu">×</button>
  <div class="sheet-links">
    {#each primary as link}
      <a href={link.href} class="sheet-link" onclick={closeMenu}>{link.label}</a>
    {/each}
    <a href="/#contact" class="sheet-link" onclick={closeMenu}>resume ↓</a>
    <a href="/blog" class="sheet-link" onclick={closeMenu}>/blog</a>
    <button class="sheet-link sheet-locale" onclick={() => { locale.toggle(); closeMenu(); }}>
      {locale.current === 'ko' ? 'Switch to EN' : 'KO로 전환'}
    </button>
  </div>
</nav>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape' && menuOpen) closeMenu(); }} />

<style>
  .nav-header {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--line);
    position: sticky;
    top: 0;
    z-index: 20;
    background: #0C0D10cc;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .nav-logo {
    font-weight: 700;
    letter-spacing: -0.01em;
    cursor: pointer;
    font-size: 18px;
    color: var(--text);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    align-items: center;
  }

  .nav-pill {
    padding: 8px 16px;
    border-radius: 999px;
    background: transparent;
    border: 1px solid #ECEEF210;
    cursor: pointer;
    color: var(--text);
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
  }

  .nav-pill:hover {
    background: #ECEEF210;
    border-color: #ECEEF220;
  }

  .nav-pill.active {
    background: #ECEEF215;
    border-color: #ECEEF230;
  }

  .nav-divider {
    width: 1px;
    height: 16px;
    background: #ECEEF220;
    margin: 0 8px;
  }

  .nav-locale {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.05em;
    font-weight: 600;
    cursor: pointer;
    min-width: 40px;
    text-align: center;
  }

  .sheet-locale {
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: var(--font-mono);
    color: var(--dim);
    border-bottom: none;
  }

  .nav-blog {
    color: var(--dim);
    text-decoration: none;
    cursor: pointer;
    padding: 8px 4px;
    opacity: 0.7;
    font-family: var(--font-mono);
    font-size: 12px;
    transition: opacity 0.2s;
  }

  .nav-blog:hover,
  .nav-blog.active {
    opacity: 1;
    color: var(--text);
  }

  /* Hamburger */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: 36px;
    height: 36px;
    padding: 8px;
    background: transparent;
    border: 1px solid #ECEEF220;
    border-radius: 8px;
    cursor: pointer;
  }

  .hamburger-line {
    display: block;
    width: 100%;
    height: 1.5px;
    background: var(--text);
  }

  /* Sheet */
  .sheet-backdrop {
    position: fixed;
    inset: 0;
    z-index: 25;
    background: rgba(12, 13, 16, 0.6);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  .sheet-backdrop.open {
    opacity: 1;
    pointer-events: auto;
  }

  .sheet {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 30;
    width: 320px;
    height: 100dvh;
    background: var(--surface);
    border-left: 1px solid var(--line);
    transform: translateX(100%);
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
    font-family: var(--font-mono);
  }

  .sheet.open {
    transform: translateX(0);
  }

  .sheet-close {
    align-self: flex-end;
    margin: 16px 20px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--line);
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
    color: var(--text);
  }

  .sheet-links {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .sheet-link {
    display: block;
    padding: 16px 12px;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: var(--text);
    text-decoration: none;
    border-bottom: 1px solid var(--line);
    transition: background 0.15s;
  }

  .sheet-link:first-child {
    border-top: 1px solid var(--line);
  }

  .sheet-link:hover {
    background: #ECEEF208;
  }

  @media (max-width: 760px) {
    .nav-header {
      padding: 16px 20px;
    }

    .nav-links {
      display: none;
    }

    .hamburger {
      display: flex;
    }
  }

  @media (max-width: 480px) {
    .nav-header {
      padding: 12px 16px;
    }

    .sheet {
      width: 100%;
    }
  }
</style>
