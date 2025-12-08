<script lang="ts">
  import { onMount } from 'svelte';
  import { Motion } from 'svelte-motion';
  import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-svelte';
  import { t, locale } from '$lib/i18n';

  // Typewriter effect logic
  let displayText = $state('');

  $effect(() => {
    const roles = t.hero.role;

    // Reset state when language changes
    let roleIndex = 0;
    let isDeleting = false;
    let currentText = '';
    displayText = ''; // Sync initial state

    if (!Array.isArray(roles)) {
      displayText = roles; // Fallback if string
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const loop = () => {
      const currentRole = roles[roleIndex % roles.length];

      let nextSpeed = 100;

      if (isDeleting) {
        currentText = currentRole.substring(0, currentText.length - 1);
        nextSpeed = 50;
      } else {
        currentText = currentRole.substring(0, currentText.length + 1);
        nextSpeed = 100;
      }

      displayText = currentText;

      if (!isDeleting && currentText === currentRole) {
        nextSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        roleIndex++;
        nextSpeed = 500; // Pause before next word
      }

      timer = setTimeout(loop, nextSpeed);
    };

    loop();

    return () => clearTimeout(timer);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
</script>

<section
  class="relative flex max-h-[1080px] min-h-screen flex-col overflow-hidden bg-gray-50 pt-16"
>
  <!-- Background Elements -->
  <div class="absolute inset-0 z-0">
    <div
      class="absolute top-0 left-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-100/50 via-transparent to-transparent"
    ></div>
    <div
      class="absolute bottom-0 left-0 h-full w-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent"
    ></div>

    <!-- Animated shapes -->
    <Motion
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      let:motion
    >
      <div
        use:motion
        class="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-green-200/30 blur-3xl"
      ></div>
    </Motion>

    <Motion
      animate={{
        y: [0, 30, 0],
        rotate: [0, -5, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      let:motion
    >
      <div
        use:motion
        class="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl"
      ></div>
    </Motion>
  </div>

  <div class="relative z-10 container mx-auto flex flex-1 flex-col justify-center px-6 py-12">
    <div class="mx-auto max-w-4xl text-center">
      <Motion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        let:motion
      >
        <div use:motion>
          <span
            class="mb-6 inline-block rounded-full border border-green-200 bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
          >
            {t.hero.available}
          </span>

          <h1 class="mb-6 text-5xl font-bold tracking-tight text-gray-900 md:text-7xl">
            {t.hero.greeting}
            <br />
            <span
              class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
              >{t.hero.name}</span
            >
            <br />
            <span class="mt-2 block min-h-[1.2em] text-4xl font-medium text-gray-700 md:text-6xl">
              {displayText}<span class="animate-pulse text-green-500">|</span>
            </span>
          </h1>
        </div>
      </Motion>

      <Motion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        let:motion
      >
        <p use:motion class="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600">
          {@html t.hero.description.replace(
            /\*\*(.*?)\*\*/g,
            '<strong class="text-gray-900">$1</strong>'
          )}
        </p>
      </Motion>

      <Motion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        let:motion
      >
        <div use:motion class="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            class="flex items-center gap-2 rounded-full bg-gray-900 px-8 py-4 font-medium text-white shadow-lg shadow-gray-900/20 transition-all hover:scale-105 hover:bg-gray-800"
            onclick={() => scrollToSection('projects')}
          >
            {t.hero.viewProjects}
            <ArrowRight size={20} />
          </button>
          <a
            href={`/resume_${locale.current}.pdf`}
            download
            class="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 font-medium text-gray-900 shadow-lg shadow-gray-100/50 transition-all hover:scale-105 hover:border-green-200 hover:text-green-600"
          >
            {t.hero.downloadResume}
            <Download size={20} />
          </a>
        </div>
      </Motion>

      <!-- Social Links -->
      <Motion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        let:motion
      >
        <div use:motion class="flex items-center justify-center gap-6 text-gray-500">
          <a
            href="https://github.com/HiGeuni"
            target="_blank"
            class="transform transition-colors duration-200 hover:scale-110 hover:text-gray-900"
          >
            <Github size={24} />
          </a>
          <a
            href="mailto:khyogeun_@naver.com"
            class="transform transition-colors duration-200 hover:scale-110 hover:text-gray-900"
          >
            <Mail size={24} />
          </a>
        </div>
      </Motion>
    </div>
  </div>

  <!-- Stats/Tech Badge -->
  <div class="relative w-full border-t border-gray-100 bg-white/50 py-6 backdrop-blur-sm">
    <div class="container mx-auto px-6">
      <div class="flex flex-wrap justify-center gap-8 text-center md:gap-16">
        <div>
          <div class="text-3xl font-bold text-gray-900">1.5+</div>
          <div class="text-sm font-medium tracking-wider text-gray-500 uppercase">
            {t.hero.yearsExp}
          </div>
        </div>
        <div>
          <div class="text-3xl font-bold text-gray-900">46%</div>
          <div class="text-sm font-medium tracking-wider text-gray-500 uppercase">
            {t.hero.perfBoost}
          </div>
        </div>
        <div>
          <div class="text-3xl font-bold text-gray-900">FSD</div>
          <div class="text-sm font-medium tracking-wider text-gray-500 uppercase">
            {t.hero.architecture}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
