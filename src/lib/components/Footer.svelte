<script lang="ts">
  import { Heart } from 'lucide-svelte';
</script>

<footer class="border-t border-gray-200 py-12 bg-gradient-to-b from-white to-gray-50">
  <div class="max-w-4xl mx-auto px-6 text-center">
    <p class="text-gray-500 font-medium">
      © {new Date().getFullYear()} Built with SvelteKit, TypeScript, and Tailwind CSS
    </p>
    <p class="text-gray-400 mt-3 flex items-center justify-center gap-2 text-sm">
      Designed & Developed with <Heart size={14} class="text-green-500 fill-current" />
    </p>
  </div>
</footer>
