<script lang="ts">
  interface Props {
    variant?: 'home' | 'case';
    caseNumber?: number;
    caseTotal?: number;
  }

  let { variant = 'home', caseNumber = 1, caseTotal = 3 }: Props = $props();
  let menuOpen = $state(false);

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'EXP', href: '#exp' },
    { label: 'ABOUT', href: '#about' },
    { label: 'STACK', href: '#stack' },
    { label: 'CONTACT', href: '#contact' },
  ];

  function openMenu() {
    menuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOpen = false;
    document.body.style.overflow = '';
  }

  function handleLinkClick() {
    closeMenu();
  }
</script>

<header class="brutalist-header">
  {#if variant === 'home'}
    <a href="/" class="logo">HIGEUNI / FRONTEND ENGINEER</a>
    <nav class="nav-links">
      {#each navLinks as link}
        <a href={link.href} class="nav-link">{link.label}</a>
      {/each}
      <a href="#contact" class="resume-link">RESUME ↓</a>
    </nav>
    <button class="hamburger" onclick={openMenu} aria-label="Open menu">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
  {:else}
    <a href="/" class="logo">← HIGEUNI / FRONTEND ENGINEER</a>
    <span class="case-label">CASE STUDY · {String(caseNumber).padStart(2, '0')} / {String(caseTotal).padStart(2, '0')}</span>
  {/if}
</header>

{#if variant === 'home'}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="sheet-backdrop"
    class:open={menuOpen}
    onclick={closeMenu}
    onkeydown={(e) => { if (e.key === 'Escape') closeMenu(); }}
  ></div>
  <nav class="sheet" class:open={menuOpen}>
    <button class="sheet-close" onclick={closeMenu} aria-label="Close menu">×</button>
    <div class="sheet-links">
      {#each navLinks as link}
        <a href={link.href} class="sheet-link" onclick={handleLinkClick}>{link.label}</a>
      {/each}
      <a href="#contact" class="sheet-link sheet-resume" onclick={handleLinkClick}>RESUME ↓</a>
    </div>
  </nav>
{/if}

<svelte:window onkeydown={(e) => { if (e.key === 'Escape' && menuOpen) closeMenu(); }} />

<style>
  .brutalist-header {
    position: sticky;
    top: 0;
    z-index: 20;
    background: var(--paper);
    border-bottom: 2px solid var(--ink);
    padding: 16px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.05em;
  }

  .logo {
    font-weight: 700;
    cursor: pointer;
    color: var(--ink);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 24px;
  }

  .nav-link {
    color: var(--ink);
    text-decoration: none;
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  .resume-link {
    background: var(--ink);
    color: var(--accent);
    padding: 2px 8px;
    text-decoration: none;
  }

  .case-label {
    opacity: 0.6;
  }

  /* Hamburger button */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: 36px;
    height: 36px;
    padding: 8px;
    background: var(--paper);
    border: 2px solid var(--ink);
    border-radius: 0;
    cursor: pointer;
    font-family: var(--font-mono);
  }

  .hamburger-line {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--ink);
  }

  /* Sheet backdrop */
  .sheet-backdrop {
    position: fixed;
    inset: 0;
    z-index: 25;
    background: rgba(14, 14, 12, 0.4);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  .sheet-backdrop.open {
    opacity: 1;
    pointer-events: auto;
  }

  /* Sheet panel */
  .sheet {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 30;
    width: 320px;
    height: 100dvh;
    background: var(--paper);
    border-left: 2px solid var(--ink);
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
    background: var(--paper);
    border: 2px solid var(--ink);
    border-radius: 0;
    font-family: var(--font-mono);
    font-size: 20px;
    cursor: pointer;
    color: var(--ink);
  }

  .sheet-close:hover {
    background: var(--ink);
    color: var(--paper);
  }

  .sheet-links {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 0;
  }

  .sheet-link {
    display: block;
    padding: 16px 12px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--ink);
    text-decoration: none;
    border-bottom: 2px solid var(--ink);
  }

  .sheet-link:first-child {
    border-top: 2px solid var(--ink);
  }

  .sheet-link:hover {
    background: var(--ink);
    color: var(--accent);
  }

  .sheet-resume {
    margin-top: 16px;
    background: var(--ink);
    color: var(--accent);
    border: 2px solid var(--ink);
  }

  .sheet-resume:hover {
    background: var(--accent);
    color: var(--ink);
  }

  @media (max-width: 760px) {
    .brutalist-header {
      padding: 12px 20px;
      font-size: 11px;
    }

    .nav-links {
      display: none;
    }

    .hamburger {
      display: flex;
    }
  }

  @media (max-width: 480px) {
    .brutalist-header {
      padding: 10px 16px;
      font-size: 10px;
      gap: 8px;
    }

    .logo {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    .case-label {
      font-size: 9px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .sheet {
      width: 100%;
    }
  }
</style>
