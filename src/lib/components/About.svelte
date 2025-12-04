<script lang="ts">
import { Zap, Layers, Database } from "lucide-svelte";
import Reveal from "./Reveal.svelte";
import { t } from "$lib/i18n";
</script>

<section id="about" class="py-24 bg-white">
  <div class="container mx-auto px-6">
    <Reveal>
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">{t.about.title}</h2>
    </Reveal>

    <div class="grid md:grid-cols-2 gap-12 items-center">
      <Reveal delay={0.2}>
        <div class="space-y-6 text-lg text-gray-600 leading-relaxed">
          <p>
            {@html t.about.p1.replace(/\*\*(.*?)\*\*/g, '<strong class="text-green-600">$1</strong>')}
          </p>
          <p>
            {@html t.about.p2.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')}
          </p>
          <p>
            {@html t.about.p3.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')}
          </p>
        </div>
      </Reveal>

      <div class="grid gap-6">
        <Reveal delay={0.4}>
          <div class="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-green-200 hover:bg-green-50/30 transition-all duration-300 group">
            <div class="flex items-start gap-4">
              <div class="p-3 bg-green-100 rounded-lg text-green-600 group-hover:scale-110 transition-transform duration-300">
                <Zap size={24} />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-2">{t.about.cards.perf.title}</h3>
                <p class="text-gray-600 text-sm">{t.about.cards.perf.desc}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div class="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-green-200 hover:bg-green-50/30 transition-all duration-300 group">
            <div class="flex items-start gap-4">
              <div class="p-3 bg-emerald-100 rounded-lg text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                <Layers size={24} />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-2">{t.about.cards.scale.title}</h3>
                <p class="text-gray-600 text-sm">{t.about.cards.scale.desc}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <div class="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-green-200 hover:bg-green-50/30 transition-all duration-300 group">
            <div class="flex items-start gap-4">
              <div class="p-3 bg-teal-100 rounded-lg text-teal-600 group-hover:scale-110 transition-transform duration-300">
                <Database size={24} />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-2">{t.about.cards.system.title}</h3>
                <p class="text-gray-600 text-sm">{t.about.cards.system.desc}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </div>
</section>
