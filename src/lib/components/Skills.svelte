<script lang="ts">
  import { Motion } from 'svelte-motion';
  import { inview } from 'svelte-inview';
  import Reveal from './Reveal.svelte';
  import { t } from '$lib/i18n';

  const skills = $derived([
    {
      category: t.skills.categories.frontend,
      items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      category: t.skills.categories.styling,
      items: ['Tailwind CSS', 'Emotion', 'Framer Motion', 'Shadcn UI'],
    },
    {
      category: t.skills.categories.state,
      items: ['Zustand', 'Recoil', 'React Query', 'SWR'],
    },
    {
      category: t.skills.categories.infra,
      items: ['Git', 'GitHub Actions', 'Docker', 'Nginx', 'Vite'],
    },
    {
      category: t.skills.categories.integration,
      items: ['Stripe', 'Directus CMS', 'Kakao Map API', 'SSE'],
    },
  ]);
</script>

<section id="skills" class="bg-gray-50 py-24">
  <div class="container mx-auto px-6">
    <Reveal>
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{t.skills.title}</h2>
        <p class="text-lg text-gray-600">{t.skills.description}</p>
      </div>
    </Reveal>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each skills as skillGroup, i}
        <Reveal delay={i * 0.1}>
          <div
            class="group h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-green-200 hover:bg-green-50/30 hover:shadow-xl"
          >
            <h3
              class="mb-6 border-b border-gray-100 pb-2 text-xl font-bold text-gray-900 transition-colors group-hover:border-green-200"
            >
              {skillGroup.category}
            </h3>
            <div class="flex flex-wrap gap-3">
              {#each skillGroup.items as skill}
                <span
                  class="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition-all duration-300 group-hover:border-green-100 group-hover:bg-white group-hover:text-green-700"
                >
                  {skill}
                </span>
              {/each}
            </div>
          </div>
        </Reveal>
      {/each}
    </div>
  </div>
</section>
