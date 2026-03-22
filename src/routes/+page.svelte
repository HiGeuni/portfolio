<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Career from '$lib/components/Career.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import { t } from '$lib/i18n';
</script>

<svelte:head>
  <title>{t.seo.title}</title>
  <meta name="description" content={t.seo.description} />
</svelte:head>

<Hero />
<About />
<Career />
<Skills />
<Projects />
<Contact />
