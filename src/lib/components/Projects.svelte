<script lang="ts">
  import { Motion, AnimateSharedLayout, AnimatePresence } from 'svelte-motion';
  import { inview } from 'svelte-inview';
  import { X, ExternalLink, Github, ChevronRight, Target, Lightbulb, Zap } from 'lucide-svelte';
  import Reveal from './Reveal.svelte';
  import awarelabImg from '$lib/assets/projects/awarelab.png';
  import prestigeImg from '$lib/assets/projects/prestige.png';
  import kumoImg from '$lib/assets/projects/kumo.png';
  import awarelabLogo from '$lib/assets/projects/screenshots/awarelab/logo.png';
  import awarelabShot1 from '$lib/assets/projects/screenshots/awarelab/logo.png';
  import awarelabShot2 from '$lib/assets/projects/screenshots/awarelab_2.png';
  import prestigeBookmark from '$lib/assets/projects/screenshots/the-prestige/bookmark.png';
  import facilityDetail from '$lib/assets/projects/screenshots/the-prestige/facility-detail.png';
  import inquiry from '$lib/assets/projects/screenshots/the-prestige/inquiry.png';
  import main from '$lib/assets/projects/screenshots/the-prestige/main.png';
  import prestigeLogo from '$lib/assets/projects/screenshots/the-prestige/logo.png';
  import kumoAbstract from '$lib/assets/projects/screenshots/kumo/abstract.gif';
  import kumoMain from '$lib/assets/projects/screenshots/kumo/main.gif';
  import kumoLogo from '$lib/assets/projects/screenshots/kumo/logo.png';
  import kumoApplicationDeploy from '$lib/assets/projects/screenshots/kumo/application-deploy.jpg';
  import kumoEnvironmentBranch from '$lib/assets/projects/screenshots/kumo/environment-branch.jpg';
  import kumoOptionChange from '$lib/assets/projects/screenshots/kumo/optionChange.gif';

  let selectedId = $state<number | null>(null);
  let sectionInView = $state(false);
  let showFeaturedOnly = $state(true);

  const projects = [
    {
      id: 1,
      title: 'AwareLab Membership',
      category: 'Fintech / SaaS',
      imageUrl: awarelabLogo,
      isFeatured: true,
      gallery: [
        { src: awarelabShot1, caption: 'Real-time investment dashboard with advanced charting' },
        { src: awarelabShot2, caption: 'Seamless mobile responsiveness for on-the-go access' },
      ],
      image: 'bg-gradient-to-br from-green-400 to-emerald-600',
      role: 'Lead Frontend Engineer',
      description: 'Investment portfolio analysis platform with high-performance charts.',
      problem:
        'Users needed a fast, reliable platform for complex investment data analysis with real-time updates.',
      solution:
        'Built a high-performance web app using Next.js 16 and FSD architecture, integrating Stripe for payments and Directus for content.',
      challenges:
        'Optimizing large JS bundles and handling complex chart rendering. Solved by code splitting (46% load improvement) and dynamic imports.',
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Directus'],
      features: [
        'Real-time Charts',
        'Stripe Subscription',
        'Portfolio Analysis',
        'FSD Architecture',
      ],
      impact: [
        'Bundle size reduced 253KB → 136KB',
        '46% faster initial load',
        'Seamless payment integration',
      ],
      links: { demo: '#', github: '#' },
    },
    {
      id: 2,
      title: 'The Prestige',
      category: 'Location Service',
      imageUrl: prestigeLogo,
      isFeatured: true,
      gallery: [
        { src: main, caption: 'Main page with Kakao Map API' },
        { src: facilityDetail, caption: 'Facility detail page' },
        { src: inquiry, caption: 'Inquiry page' },
        { src: prestigeBookmark, caption: 'Bookmark page' },
      ],
      image: 'bg-gradient-to-br from-emerald-500 to-teal-700',
      role: 'Frontend Engineer',
      description: 'Funeral home location visualization service with map integration.',
      problem: 'Users found it difficult to find and filter funeral home locations efficiently.',
      solution:
        'Implemented a map-based visualization with Kakao Map API and optimized image loading for a smooth experience.',
      challenges:
        'Managing heavy image assets and complex filter logic. Solved with Image CDN + Lazy Loading and refactoring filter UX.',
      tech: ['Next.js', 'Vite', 'Recoil', 'Kakao Map API'],
      features: ['Map Visualization', 'Location Filtering', 'Image Gallery', 'Tab-based UI'],
      impact: ['Improved UX with tab-based filtering', 'Optimized image loading performance'],
      links: { demo: '#', github: '#' },
    },
    {
      id: 3,
      title: 'Kumo Factory',
      category: 'Cloud DevOps Tool',
      imageUrl: kumoLogo,
      isFeatured: true,
      gallery: [
        { src: kumoMain, caption: 'Intuitive Drag & Drop infrastructure designer' },
        { src: kumoAbstract, caption: 'Real-time deployment logs via SSE' },
        { src: kumoApplicationDeploy, caption: 'Real-time deployment logs via SSE' },
        { src: kumoOptionChange, caption: 'Real-time deployment logs via SSE' },
        { src: kumoEnvironmentBranch, caption: 'Real-time deployment logs via SSE' },
      ],
      image: 'bg-gradient-to-br from-teal-400 to-cyan-600',
      role: 'Frontend Engineer',
      description: 'No-Code Cloud Deployment Platform with Drag & Drop UI.',
      problem: 'Cloud deployment is complex and intimidating for beginners.',
      solution: 'Created a Drag & Drop interface for designing cloud infrastructure visually.',
      challenges:
        'Visualizing deployment status in real-time. Solved using Server-Sent Events (SSE) for live logs.',
      tech: ['Next.js 13', 'Tailwind CSS', 'Zustand', 'SSE'],
      features: ['Drag & Drop UI', 'Real-time Logs (SSE)', 'Cloud Architecture Design'],
      impact: ['Simplified cloud deployment process', 'SSR based UX optimization'],
      links: { demo: '#', github: '#' },
    },
  ];

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
        <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Featured Projects</h2>
        <p class="text-lg text-gray-600">A selection of my recent work.</p>
      </div>
    </Reveal>

    <div class="mb-8 flex items-center justify-end gap-3 px-1">
      <label for="featured-toggle" class="cursor-pointer text-sm font-medium text-gray-600">
        Show Featured Only
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
              View Case Study <ChevronRight size={16} class="ml-1" />
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
                  <h3 class="text-sm font-bold tracking-wider uppercase">The Problem</h3>
                </div>
                <p class="leading-relaxed text-gray-700">
                  {selectedProject.problem}
                </p>
              </div>

              <div class="rounded-2xl border border-green-100 bg-green-50 p-6">
                <div class="mb-4 flex items-center gap-3 text-green-600">
                  <Lightbulb size={24} />
                  <h3 class="text-sm font-bold tracking-wider uppercase">The Solution</h3>
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
                <h3 class="text-sm font-bold tracking-wider uppercase">Technical Challenges</h3>
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
                  Key Features
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
                  Impact
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
                Technologies Used
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
                  Gallery
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
