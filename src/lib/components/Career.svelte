<script lang="ts">
import { Motion } from "svelte-motion";
import { inview } from "svelte-inview";
import Reveal from "./Reveal.svelte";

let isInView = $state(false);

const jobs = [
	{
		company: "AwareLab",
		role: "Frontend Engineer",
		period: "2025.04 - Present",
		description:
			"Building a high-performance membership platform for investment portfolio analysis.",
		achievements: [
			"Optimized bundle size by 46% (253KB → 136KB) through code splitting and dynamic imports.",
			"Implemented Feature-Sliced Design (FSD) architecture for scalable development.",
			"Integrated Stripe payments and Directus CMS with full type safety.",
			"Solved complex chart rendering issues with Lightweight Charts.",
		],
	},
	{
		company: "Daqda",
		role: "Frontend Engineer",
		period: "2024.06 - 2025.03",
		description:
			"Developed location visualization services and e-commerce platforms.",
		achievements: [
			"Built 'The Prestige', a funeral home location service using Kakao Map API.",
			"Improved UX by implementing tab-based filtering and Image CDN with Lazy Loading.",
			"Developed a web gift mall using React, Vite, and Zustand.",
			"Implemented robust data persistence using LocalStorage to prevent data loss.",
		],
	},
	{
		company: "SW Maestro",
		role: "Frontend Engineer",
		period: "2023.04 - 2023.11",
		description:
			"Selected as a trainee for the prestigious software talent nurturing program.",
		achievements: [
			"Developed 'Kumo Factory', a No-Code Cloud Deployment platform.",
			"Built a Drag & Drop UI for designing cloud infrastructure.",
			"Implemented real-time deployment logs using Server-Sent Events (SSE).",
			"Optimized UX with SSR (Server-Side Rendering) in Next.js 13.",
		],
	},
	{
		company: "GDSC Seoultech",
		role: "Frontend Developer",
		period: "2022.09 - 2023.04",
		description: "Core member of Google Developer Student Clubs.",
		achievements: [
			"Developed a Shared Fridge Service using Next.js 12 and React Query.",
			"Implemented optimistic updates for seamless user interaction.",
			"Built interactive map pages and donation forms.",
		],
	},
];
</script>

<section id="career" class="py-24 bg-white relative overflow-hidden">
  <div class="container mx-auto px-6 relative z-10">
    <Reveal>
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience</h2>
        <p class="text-gray-600 text-lg">My professional journey and key achievements.</p>
      </div>
    </Reveal>

    <div class="relative max-w-4xl mx-auto">
      <!-- Vertical Line -->
      <div 
        class="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 transform md:-translate-x-1/2"
        use:inview={{ unobserveOnEnter: true, rootMargin: '-100px' }}
        oninview_change={({ detail }) => (isInView = detail.inView)}
      >
        <Motion
          initial={{ height: "0%" }}
          animate={isInView ? { height: "100%" } : { height: "0%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          let:motion
        >
          <div use:motion class="w-full bg-gradient-to-b from-green-500 via-emerald-500 to-teal-500"></div>
        </Motion>
      </div>

      <div class="space-y-12">
        {#each jobs as job, i}
          <div class={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <!-- Timeline Dot -->
            <div class="absolute left-[-5px] md:left-1/2 top-0 w-3 h-3 rounded-full bg-white border-2 border-green-500 transform md:-translate-x-1/2 z-10 mt-1.5 shadow-[0_0_0_4px_rgba(255,255,255,1)]"></div>
            
            <!-- Content -->
            <div class="md:w-1/2 pl-8 md:pl-0">
              <Reveal 
                delay={i * 0.2} 
                variants={{
                  hidden: { opacity: 0, x: i % 2 === 0 ? 50 : -50, y: 0 },
                  visible: { opacity: 1, x: 0, y: 0 }
                }}
              >
                <div class={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-200 hover:bg-green-50/30 transition-all duration-300 group ${i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div class="flex flex-wrap justify-between items-start gap-2 mb-4">
                    <div>
                      <h3 class="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">{job.role}</h3>
                      <div class="text-green-600 font-medium">{job.company}</div>
                    </div>
                    <span class="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-full border border-gray-100">
                      {job.period}
                    </span>
                  </div>
                  
                  <p class="text-gray-600 mb-4 text-sm leading-relaxed">
                    {job.description}
                  </p>
                  
                  <ul class="space-y-2">
                    {#each job.achievements as achievement}
                      <li class="flex items-start gap-2 text-sm text-gray-600">
                        <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"></span>
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
