<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import {
    Search,
    ArrowRight,
    User,
    Code,
    Mail,
    Github,
    Linkedin,
    Sparkles,
    FileText,
  } from 'lucide-svelte';
  import confetti from 'canvas-confetti';
  import { goto } from '$app/navigation';

  function handleNavigation(path: string) {
    goto(path);
    close();
  }

  let isOpen = false;
  let query = '';
  let selectedIndex = 0;
  let inputRef: HTMLInputElement;

  const groups = [
    {
      name: 'Navigation',
      items: [
        {
          id: 'home',
          label: 'Go to Home',
          icon: ArrowRight,
          action: () => goto('/'),
        },
        {
          id: 'about',
          label: 'Go to About',
          icon: User,
          action: () => handleNavigation('/#about'),
        },
        {
          id: 'projects',
          label: 'Go to Projects',
          icon: Code,
          action: () => handleNavigation('/#projects'),
        },
        {
          id: 'contact',
          label: 'Go to Contact',
          icon: Mail,
          action: () => handleNavigation('/#contact'),
        },
      ],
    },
    {
      name: 'Social',
      items: [
        {
          id: 'github',
          label: 'Visit GitHub',
          icon: Github,
          action: () => window.open('https://github.com', '_blank'),
        },
        {
          id: 'linkedin',
          label: 'Visit LinkedIn',
          icon: Linkedin,
          action: () => window.open('https://linkedin.com', '_blank'),
        },
        {
          id: 'email',
          label: 'Copy Email',
          icon: Mail,
          action: () => copyToClipboard('hello@example.com'),
        },
      ],
    },
    {
      name: 'Actions',
      items: [
        {
          id: 'surprise',
          label: 'Surprise Me!',
          icon: Sparkles,
          action: triggerConfetti,
        },
        {
          id: 'resume',
          label: 'Download Resume',
          icon: FileText,
          action: () => window.open('/resume.pdf', '_blank'),
        },
      ],
    },
  ];

  $: filteredGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    }))
    .filter((group) => group.items.length > 0);

  $: flatItems = filteredGroups.flatMap((g) => g.items);

  function scrollTo(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    close();
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    // Could add a toast here
    close();
  }

  function triggerConfetti() {
    close();
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  function close() {
    isOpen = false;
    query = '';
    selectedIndex = 0;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      isOpen = !isOpen;
    }

    if (!isOpen) return;

    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % flatItems.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + flatItems.length) % flatItems.length;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = flatItems[selectedIndex];
      if (item) item.action();
    }
  }

  // Reset selection when query changes
  $: if (query) selectedIndex = 0;

  // Focus input when opened
  $: if (isOpen && inputRef) {
    setTimeout(() => inputRef.focus(), 10);
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeydown);
    }
  });
</script>

{#if isOpen}
  <div
    class="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 px-4 pt-[20vh] backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
    on:click={close}
    on:keydown={(e) => e.key === 'Escape' && close()}
    role="button"
    tabindex="0"
  >
    <div
      class="w-full max-w-2xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl"
      transition:scale={{ start: 0.95, duration: 200 }}
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      on:keydown={() => {}}
    >
      <!-- Search Input -->
      <div class="flex items-center border-b border-gray-100 px-4">
        <Search class="mr-3 h-5 w-5 text-gray-400" />
        <input
          bind:this={inputRef}
          bind:value={query}
          type="text"
          placeholder="Type a command or search..."
          class="w-full bg-transparent py-4 text-lg text-gray-900 outline-none placeholder:text-gray-400"
        />
        <div class="hidden items-center gap-1 md:flex">
          <kbd class="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">ESC</kbd>
        </div>
      </div>

      <!-- Results -->
      <div class="max-h-[60vh] overflow-y-auto py-2">
        {#if flatItems.length === 0}
          <div class="px-4 py-8 text-center text-gray-500">No results found.</div>
        {:else}
          {#each filteredGroups as group}
            <div class="mb-2 px-2">
              <div class="px-2 py-1.5 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                {group.name}
              </div>
              {#each group.items as item}
                {@const isSelected = flatItems[selectedIndex] === item}
                <button
                  class="flex w-full items-center rounded-lg px-3 py-3 text-left transition-colors {isSelected
                    ? 'bg-green-50 text-green-900'
                    : 'text-gray-700 hover:bg-gray-50'}"
                  on:click={() => item.action()}
                  on:mouseenter={() => (selectedIndex = flatItems.indexOf(item))}
                >
                  <svelte:component
                    this={item.icon}
                    class="mr-3 h-5 w-5 {isSelected ? 'text-green-600' : 'text-gray-400'}"
                  />
                  <span class="flex-1 font-medium">{item.label}</span>
                  {#if isSelected}
                    <ArrowRight class="h-4 w-4 text-green-600" />
                  {/if}
                </button>
              {/each}
            </div>
          {/each}
        {/if}
      </div>

      <!-- Footer -->
      <div
        class="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-500"
      >
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1">
            <kbd
              class="flex h-5 w-5 items-center justify-center rounded border border-gray-200 bg-white shadow-sm"
              >↵</kbd
            >
            to select
          </span>
          <span class="flex items-center gap-1">
            <kbd
              class="flex h-5 w-5 items-center justify-center rounded border border-gray-200 bg-white shadow-sm"
              >↑↓</kbd
            >
            to navigate
          </span>
        </div>
        <div>Portfolio Command Palette</div>
      </div>
    </div>
  </div>
{/if}
