<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Career from '$lib/components/Career.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Portfolio | Full Stack Developer</title>
  <meta name="description" content="Professional portfolio of a Full Stack Developer specializing in modern web technologies." />
</svelte:head>

<div class="min-h-screen bg-white selection:bg-green-100 selection:text-green-900">
  <Navigation />
  <main>
    <Hero />
    <About />
    <Career />
    <Skills />
    <Projects />
    <Contact />
  </main>
  <Footer />
</div>
