<script lang="ts">
import "./layout.css";
import favicon from "$lib/assets/favicon.svg";
import CommandPalette from "$lib/components/CommandPalette.svelte";

let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<CommandPalette />
{@render children()}
