<script lang="ts">
  import { Motion } from 'svelte-motion';
  import { inview } from 'svelte-inview';
  import Reveal from './Reveal.svelte';
  import { t } from '$lib/i18n';

  let isInView = $state(false);

  const jobs = $derived(t.career.jobs);
</script>

<section id="career" class="relative overflow-hidden bg-white py-24">
  <div class="relative z-10 container mx-auto px-6">
    <Reveal>
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{t.career.title}</h2>
        <p class="text-lg text-gray-600">{t.career.description}</p>
      </div>
    </Reveal>

    <div class="relative mx-auto max-w-4xl">
      <!-- Vertical Line -->
      <div
        class="absolute top-0 bottom-0 left-0 w-0.5 transform bg-gray-100 md:left-1/2 md:-translate-x-1/2"
        use:inview={{ unobserveOnEnter: true, rootMargin: '-100px' }}
        oninview_change={({ detail }) => (isInView = detail.inView)}
      >
        <Motion
          initial={{ height: '0%' }}
          animate={isInView ? { height: '100%' } : { height: '0%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          let:motion
        >
          <div
            use:motion
            class="w-full bg-gradient-to-b from-green-500 via-emerald-500 to-teal-500"
          ></div>
        </Motion>
      </div>

      <div class="space-y-12">
        {#each jobs as job, i}
          <div
            class={`relative flex flex-col gap-8 md:flex-row ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <!-- Timeline Dot -->
            <div
              class="absolute top-0 left-[-5px] z-10 mt-1.5 h-3 w-3 transform rounded-full border-2 border-green-500 bg-white shadow-[0_0_0_4px_rgba(255,255,255,1)] md:left-1/2 md:-translate-x-1/2"
            ></div>

            <!-- Content -->
            <div class="pl-8 md:w-1/2 md:pl-0">
              <Reveal
                delay={i * 0.2}
                variants={{
                  hidden: { opacity: 0, x: i % 2 === 0 ? 50 : -50, y: 0 },
                  visible: { opacity: 1, x: 0, y: 0 },
                }}
              >
                <div
                  class={`group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-green-200 hover:bg-green-50/30 hover:shadow-xl ${i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                >
                  <div class="mb-4 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3
                        class="text-xl font-bold text-gray-900 transition-colors group-hover:text-green-700"
                      >
                        {job.role}
                      </h3>
                      <div class="font-medium text-green-600">{job.company}</div>
                    </div>
                    <span
                      class="rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-bold text-gray-600"
                    >
                      {job.period}
                    </span>
                  </div>

                  <p class="mb-4 text-sm leading-relaxed text-gray-600">
                    {job.description}
                  </p>

                  <ul class="space-y-2">
                    {#each job.achievements as achievement}
                      <li class="flex items-start gap-2 text-sm text-gray-600">
                        <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400"></span>
                        <span>{achievement}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
