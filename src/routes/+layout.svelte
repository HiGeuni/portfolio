<script lang="ts">
  import './layout.css';
  import 'prism-themes/themes/prism-one-dark.css';
  import { page } from '$app/stores';

  import favicon from '$lib/assets/favicon.svg';
  import appleIcon57 from '$lib/assets/favicon/apple-icon-57x57.png';
  import appleIcon60 from '$lib/assets/favicon/apple-icon-60x60.png';
  import appleIcon72 from '$lib/assets/favicon/apple-icon-72x72.png';
  import appleIcon76 from '$lib/assets/favicon/apple-icon-76x76.png';
  import appleIcon114 from '$lib/assets/favicon/apple-icon-114x114.png';
  import appleIcon120 from '$lib/assets/favicon/apple-icon-120x120.png';
  import appleIcon144 from '$lib/assets/favicon/apple-icon-144x144.png';
  import appleIcon152 from '$lib/assets/favicon/apple-icon-152x152.png';
  import appleIcon180 from '$lib/assets/favicon/apple-icon-180x180.png';
  import androidIcon192 from '$lib/assets/favicon/android-icon-192x192.png';
  import favicon32 from '$lib/assets/favicon/favicon-32x32.png';
  import favicon96 from '$lib/assets/favicon/favicon-96x96.png';
  import favicon16 from '$lib/assets/favicon/favicon-16x16.png';
  import msIcon144 from '$lib/assets/favicon/ms-icon-144x144.png';
  import manifest from '$lib/assets/favicon/manifest.json?url';
  import ogImage from '$lib/assets/og-image.png';

  import CursorFollower from '$lib/components/CursorFollower.svelte';

  let { children } = $props();

  const seo = {
    title: 'HyoGeun Kim | Frontend Engineer',
    description: 'Frontend Engineer with 2+ years shipping React, Next.js, TypeScript at scale. Zero-to-one builder.',
    ogTitle: 'HyoGeun Kim | Frontend Engineer',
    ogDescription: 'Frontend engineer who builds from 0 to 1. Performance, canvas, architecture.',
  };
</script>

<svelte:head>
  <link rel="icon" href={favicon32} />
  <link rel="apple-touch-icon" sizes="57x57" href={appleIcon57} />
  <link rel="apple-touch-icon" sizes="60x60" href={appleIcon60} />
  <link rel="apple-touch-icon" sizes="72x72" href={appleIcon72} />
  <link rel="apple-touch-icon" sizes="76x76" href={appleIcon76} />
  <link rel="apple-touch-icon" sizes="114x114" href={appleIcon114} />
  <link rel="apple-touch-icon" sizes="120x120" href={appleIcon120} />
  <link rel="apple-touch-icon" sizes="144x144" href={appleIcon144} />
  <link rel="apple-touch-icon" sizes="152x152" href={appleIcon152} />
  <link rel="apple-touch-icon" sizes="180x180" href={appleIcon180} />
  <link rel="icon" type="image/png" sizes="192x192" href={androidIcon192} />
  <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
  <link rel="icon" type="image/png" sizes="96x96" href={favicon96} />
  <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
  <link rel="manifest" href={manifest} />
  <meta name="msapplication-TileColor" content="#F2F0EA" />
  <meta name="msapplication-TileImage" content={msIcon144} />
  <meta name="theme-color" content="#F2F0EA" />

  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:title" content={seo.ogTitle} />
  <meta property="og:description" content={seo.ogDescription} />
  <meta property="og:image" content={new URL(ogImage, $page.url.origin).href} />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={$page.url.href} />
  <meta property="twitter:title" content={seo.ogTitle} />
  <meta property="twitter:description" content={seo.ogDescription} />
  <meta property="twitter:image" content={new URL(ogImage, $page.url.origin).href} />
</svelte:head>

<CursorFollower />
{@render children()}
