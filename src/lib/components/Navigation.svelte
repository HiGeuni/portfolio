<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { Menu, X, Globe, Check } from 'lucide-svelte';
  import { t, locale } from '$lib/i18n';

  let isMenuOpen = false;
  let isLangMenuOpen = false;
  let isScrolled = false;

  $: navItems = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.career, href: '#career' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact, href: '#contact' },
  ];

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleScroll() {
    isScrolled = window.scrollY > 20;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav
  id="main-nav"
  class="fixed top-0 right-0 left-0 z-40 transition-all duration-300 {isScrolled
    ? 'bg-white/80 py-4 shadow-sm backdrop-blur-md'
    : 'bg-transparent py-6'}"
>
  <div class="mx-auto flex max-w-6xl items-center justify-between px-6">
    <a
      href="#"
      class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent"
    >
      Portfolio
    </a>

    <!-- Desktop Menu -->
    <div class="hidden items-center space-x-8 md:flex">
      {#each navItems as item}
        <a
          href={item.href}
          class="font-medium text-gray-600 transition-colors hover:text-green-600"
        >
          {item.label}
        </a>
      {/each}
      <div class="relative">
        <button
          class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-green-600"
          on:click={() => (isLangMenuOpen = !isLangMenuOpen)}
          aria-label="Select Language"
        >
          <Globe size={18} />
          <span class="text-sm font-bold">{locale.current === 'en' ? 'EN' : 'KO'}</span>
        </button>

        {#if isLangMenuOpen}
          <div class="fixed inset-0 z-0" on:click={() => (isLangMenuOpen = false)}></div>
          <div
            class="absolute top-full right-0 z-10 mt-2 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl"
            transition:slide={{ duration: 200 }}
          >
            <button
              class="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 {locale.current ===
              'en'
                ? 'bg-green-50/50 font-bold text-green-600'
                : 'text-gray-600'}"
              on:click={() => {
                locale.set('en');
                isLangMenuOpen = false;
              }}
            >
              <span>English</span>
              {#if locale.current === 'en'}
                <Check size={14} />
              {/if}
            </button>
            <button
              class="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 {locale.current ===
              'ko'
                ? 'bg-green-50/50 font-bold text-green-600'
                : 'text-gray-600'}"
              on:click={() => {
                locale.set('ko');
                isLangMenuOpen = false;
              }}
            >
              <span>한국어</span>
              {#if locale.current === 'ko'}
                <Check size={14} />
              {/if}
            </button>
          </div>
        {/if}
      </div>
      <button
        class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        on:click={() =>
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
        aria-label="Open Command Palette"
      >
        <div
          class="flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs font-medium"
        >
          <span>⌘</span><span>K</span>
        </div>
      </button>
      <a
        href="#contact"
        class="rounded-full bg-gray-900 px-5 py-2.5 font-medium text-white transition-transform hover:scale-105 hover:bg-gray-800 active:scale-95"
      >
        Let's Talk
      </a>
    </div>

    <!-- Mobile Menu Button -->
    <button class="text-gray-600 md:hidden" on:click={toggleMenu} aria-label="Toggle menu">
      {#if isMenuOpen}
        <X size={24} />
      {:else}
        <Menu size={24} />
      {/if}
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if isMenuOpen}
    <div
      transition:slide={{ duration: 300 }}
      class="absolute top-full right-0 left-0 border-t border-gray-100 bg-white shadow-lg md:hidden"
    >
      <div class="flex flex-col space-y-4 p-6">
        {#each navItems as item}
          <a
            href={item.href}
            class="text-lg font-medium text-gray-600 hover:text-green-600"
            on:click={() => (isMenuOpen = false)}
          >
            {item.label}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</nav>
