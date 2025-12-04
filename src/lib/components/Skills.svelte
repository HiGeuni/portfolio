<script lang="ts">
import { Motion } from "svelte-motion";
import { inview } from "svelte-inview";
import Reveal from "./Reveal.svelte";

const skills = [
	{
		category: "Frontend Core",
		items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
	},
	{
		category: "Styling & UI",
		items: ["Tailwind CSS", "Emotion", "Framer Motion", "Shadcn UI"],
	},
	{
		category: "State & Data",
		items: ["Zustand", "Recoil", "React Query", "SWR"],
	},
	{
		category: "Infrastructure & Tools",
		items: ["Git", "GitHub Actions", "Docker", "Nginx", "Vite"],
	},
	{
		category: "Integrations",
		items: ["Stripe", "Directus CMS", "Kakao Map API", "SSE"],
	},
];
</script>

<section id="skills" class="py-24 bg-gray-50">
  <div class="container mx-auto px-6">
    <Reveal>
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
        <p class="text-gray-600 text-lg">Technologies I work with to bring ideas to life.</p>
      </div>
    </Reveal>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each skills as skillGroup, i}
        <Reveal delay={i * 0.1}>
          <div 
            class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-200 hover:bg-green-50/30 transition-all duration-300 h-full group"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 group-hover:border-green-200 transition-colors">
              {skillGroup.category}
            </h3>
            <div class="flex flex-wrap gap-3">
              {#each skillGroup.items as skill}
                <span class="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-100 group-hover:bg-white group-hover:text-green-700 group-hover:border-green-100 transition-all duration-300">
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
