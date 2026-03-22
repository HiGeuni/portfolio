<script lang="ts">
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { Menu, X } from 'lucide-svelte';
  import { page } from '$app/stores';

  let isMenuOpen = false;

  let isScrolled = false;

  $: navItems = [
    { label: 'About', href: '/#about' },
    { label: 'Career', href: '/#career' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Contact', href: '/#contact' },
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

  $: isHome = $page.url.pathname === '/';
</script>

<nav
  id="main-nav"
  class="fixed top-0 right-0 left-0 z-40 transition-all duration-300 {isScrolled || !isHome
    ? 'bg-white/90 py-4 shadow-sm backdrop-blur-md'
    : 'bg-transparent py-6'}"
>
  <div class="mx-auto flex max-w-6xl items-center justify-between px-6">
    <a
      href="/"
      class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent"
    >
      Higeuni
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
        href="/#contact"
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
