<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import CommandPalette from '$lib/components/CommandPalette.svelte';
  import { t } from '$lib/i18n';
  import { page } from '$app/stores';

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

  import ogImage from '$lib/assets/op-image.png';

  let { children } = $props();
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
  <meta name="msapplication-TileColor" content="#ffffff" />
  <meta name="msapplication-TileImage" content={msIcon144} />
  <meta name="theme-color" content="#ffffff" />

  <title>{t.seo.title}</title>
  <meta name="description" content={t.seo.description} />
  <meta name="keywords" content={t.seo.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:title" content={t.seo.ogTitle} />
  <meta property="og:description" content={t.seo.ogDescription} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={$page.url.href} />
  <meta property="twitter:title" content={t.seo.ogTitle} />
  <meta property="twitter:description" content={t.seo.ogDescription} />
  <!-- <meta property="twitter:image" content="" /> -->
</svelte:head>

<CommandPalette />
{@render children()}
