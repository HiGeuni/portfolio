<script lang="ts">
  import { Motion, AnimateSharedLayout, AnimatePresence } from 'svelte-motion';
  import { inview } from 'svelte-inview';
  import { X, ExternalLink, Github, ChevronRight, Target, Lightbulb, Zap } from 'lucide-svelte';
  import Reveal from './Reveal.svelte';
  import { t } from '$lib/i18n';

  let selectedId = $state<number | null>(null);
  let sectionInView = $state(false);
  let showFeaturedOnly = $state(true);

  let projects = $derived(t.projects.list);

  $effect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      selectedId = null;
    }
  }

  // Debugging removed
</script>

<svelte:window onkeydown={handleKeydown} />

<section id="projects" class="relative overflow-hidden bg-gray-50 py-24">
  <div class="relative z-10 container mx-auto px-6">
    <Reveal>
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{t.projects.title}</h2>
        <p class="text-lg text-gray-600">{t.projects.description}</p>
      </div>
    </Reveal>

    <div class="mb-8 flex items-center justify-end gap-3 px-1">
      <label for="featured-toggle" class="cursor-pointer text-sm font-medium text-gray-600">
        {t.projects.showFeatured}
      </label>
      <input
        id="featured-toggle"
        type="checkbox"
        class="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
        bind:checked={showFeaturedOnly}
      />
    </div>

    <!-- <AnimateSharedLayout type="crossfade"> -->
    <div
      class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      use:inview={{ unobserveOnEnter: true, rootMargin: '-100px' }}
      oninview_change={({ detail }) => (sectionInView = detail.inView)}
    >
      {#each projects.filter((p) => !showFeaturedOnly || p.isFeatured) as project, i (project.id)}
        <!-- <Motion layoutId={`card-container-${project.id}`} let:motion> -->
        <div
          class={`group relative z-10 cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl`}
          onclick={() => {
            selectedId = project.id;
          }}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              selectedId = project.id;
            }
          }}
          role="button"
          tabindex="0"
        >
          <!-- Image Area -->
          <!-- <Motion layoutId={`card-image-${project.id}`} let:motion> -->
          <div class="relative h-48 overflow-hidden bg-gray-200">
            {#if project.imageUrl}
              <img
                src={project.imageUrl}
                alt={project.title}
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            {:else}
              <div class={`absolute inset-0 ${project.image}`}></div>
            {/if}
            <div
              class="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/0"
            ></div>
            <div class="absolute top-4 left-4">
              <span
                class="rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md"
              >
                {project.category}
              </span>
            </div>
          </div>
          <!-- </Motion> -->

          <!-- Content Area -->
          <div class="p-6">
            <!-- <Motion layoutId={`card-title-${project.id}`} let:motion> -->
            <h3
              class="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-green-600"
            >
              {project.title}
            </h3>
            <!-- </Motion> -->

            <p class="mb-4 line-clamp-2 text-sm text-gray-600">
              {project.description}
            </p>

            <div class="mb-4 flex flex-wrap gap-2">
              {#each project.tech.slice(0, 3) as t}
                <span
                  class="rounded-md border border-gray-100 bg-gray-50 px-2 py-1 text-xs text-gray-600"
                >
                  {t}
                </span>
              {/each}
              {#if project.tech.length > 3}
                <span
                  class="rounded-md border border-gray-100 bg-gray-50 px-2 py-1 text-xs text-gray-400"
                >
                  +{project.tech.length - 3}
                </span>
              {/if}
            </div>

            <div
              class="flex items-center text-sm font-medium text-green-600 transition-transform group-hover:translate-x-1"
            >
              {t.projects.viewCaseStudy}
              <ChevronRight size={16} class="ml-1" />
            </div>
          </div>
        </div>
        <!-- </Motion> -->
      {/each}
    </div>

    <!-- <AnimatePresence list={[{ key: selectedId }]}> -->
    <!-- </AnimatePresence> -->
    <!-- </AnimateSharedLayout> -->
  </div>
</section>

{#if selectedId !== null}
  {@const selectedProject = projects.find((p) => p.id === selectedId)}
  {#if selectedProject}
    <!-- Backdrop -->
    <!-- <Motion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          let:motion
        > -->
    <div
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm md:p-8"
      onclick={() => (selectedId = null)}
      onkeydown={(e) => {
        if (e.key === 'Escape') selectedId = null;
      }}
      role="button"
      tabindex="0"
    >
      <!-- Modal Card -->
      <!-- <Motion layoutId={`card-container-${selectedProject.id}`} let:motion> -->
      <div
        class="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl shadow-2xl md:max-h-[85vh] md:flex-row"
        onclick={(e) => e.stopPropagation()}
        role="document"
        tabindex="-1"
        onkeydown={() => {}}
      >
        <!-- Left / Top Image Section -->
        <!-- <Motion layoutId={`card-image-${selectedProject.id}`} let:motion> -->
        <div
          class="relative flex h-64 w-full shrink-0 flex-col justify-between p-8 text-white md:h-auto md:w-1/3"
        >
          {#if selectedProject.imageUrl}
            <img
              src={selectedProject.imageUrl}
              alt={selectedProject.title}
              class="absolute inset-0 h-full w-full object-cover"
            />
            <div class="absolute inset-0 bg-black/60"></div>
          {:else}
            <div class={`absolute inset-0 ${selectedProject.image}`}></div>
          {/if}
          <div class="relative z-10">
            <!-- <Motion layoutId={`card-category-${selectedProject.id}`} let:motion> -->
            <span
              class="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-md"
            >
              {selectedProject.category}
            </span>
            <!-- </Motion> -->

            <!-- <Motion layoutId={`card-title-${selectedProject.id}`} let:motion> -->
            <h2 class="mb-2 text-3xl font-bold md:text-4xl">
              {selectedProject.title}
            </h2>
            <!-- </Motion> -->

            <p class="mb-6 text-lg text-white/80">
              {selectedProject.role}
            </p>
          </div>

          <div class="relative z-10 flex gap-4">
            <a
              href={selectedProject.links.github}
              target="_blank"
              class="rounded-full bg-white/20 p-3 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-green-600"
              onclick={(e) => e.stopPropagation()}
            >
              <Github size={20} />
            </a>
            <a
              href={selectedProject.links.demo}
              target="_blank"
              class="rounded-full bg-white/20 p-3 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-green-600"
              onclick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        <!-- </Motion> -->

        <!-- Right / Bottom Content Section -->
        <div class="w-full flex-1 overflow-y-auto bg-white p-8 md:w-2/3 md:p-12">
          <button
            class="absolute top-4 right-4 z-50 rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            onclick={() => (selectedId = null)}
          >
            <X size={20} />
          </button>

          <!-- <Motion
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    let:motion
                  > -->
          <div class="space-y-12">
            <!-- Problem & Solution -->
            <div class="grid gap-8">
              <div class="rounded-2xl border border-red-100 bg-red-50 p-6">
                <div class="mb-4 flex items-center gap-3 text-red-600">
                  <Target size={24} />
                  <h3 class="text-sm font-bold tracking-wider uppercase">
                    {t.projects.modal.problem}
                  </h3>
                </div>
                <p class="leading-relaxed text-gray-700">
                  {selectedProject.problem}
                </p>
              </div>

              <div class="rounded-2xl border border-green-100 bg-green-50 p-6">
                <div class="mb-4 flex items-center gap-3 text-green-600">
                  <Lightbulb size={24} />
                  <h3 class="text-sm font-bold tracking-wider uppercase">
                    {t.projects.modal.solution}
                  </h3>
                </div>
                <p class="leading-relaxed text-gray-700">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            <!-- Challenges -->
            <div class="rounded-2xl border border-amber-100 bg-amber-50 p-6">
              <div class="mb-4 flex items-center gap-3 text-amber-600">
                <Zap size={24} />
                <h3 class="text-sm font-bold tracking-wider uppercase">
                  {t.projects.modal.challenges}
                </h3>
              </div>
              <p class="leading-relaxed text-gray-700">
                {selectedProject.challenges}
              </p>
            </div>

            <div class="grid gap-12 md:grid-cols-2">
              <div>
                <h3
                  class="mb-6 flex items-center gap-2 text-sm font-bold tracking-wider text-gray-900 uppercase"
                >
                  <ChevronRight size={16} class="text-green-500" />
                  {t.projects.modal.features}
                </h3>
                <ul class="space-y-4">
                  {#each selectedProject.features as feature}
                    <li class="flex items-start gap-3 rounded-lg bg-gray-50 p-3 text-gray-600">
                      <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"></span>
                      {feature}
                    </li>
                  {/each}
                </ul>
              </div>

              <div>
                <h3
                  class="mb-6 flex items-center gap-2 text-sm font-bold tracking-wider text-gray-900 uppercase"
                >
                  <ChevronRight size={16} class="text-green-500" />
                  {t.projects.modal.impact}
                </h3>
                <ul class="space-y-4">
                  {#each selectedProject.impact as item}
                    <li class="flex items-start gap-3 text-gray-600">
                      <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"></span>
                      {item}
                    </li>
                  {/each}
                </ul>
              </div>
            </div>

            <div>
              <h3 class="mb-6 text-sm font-bold tracking-wider text-gray-900 uppercase">
                {t.projects.modal.tech}
              </h3>
              <div class="flex flex-wrap gap-3">
                {#each selectedProject.tech as t}
                  <span
                    class="rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-600 shadow-sm"
                  >
                    {t}
                  </span>
                {/each}
              </div>
            </div>

            {#if selectedProject.gallery && selectedProject.gallery.length > 0}
              <div>
                <h3 class="mb-6 text-sm font-bold tracking-wider text-gray-900 uppercase">
                  {t.projects.modal.gallery}
                </h3>
                <div class="grid gap-6 md:grid-cols-2">
                  {#each selectedProject.gallery as item}
                    <div class="space-y-3">
                      <div class="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                        <img
                          src={item.src}
                          alt={item.caption}
                          class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <p class="text-center text-sm font-medium text-gray-600">
                        {item.caption}
                      </p>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
          <!-- </Motion> -->
        </div>
      </div>
      <!-- </Motion> -->
    </div>
    <!-- </Motion> -->
  {/if}
{/if}
