<script lang="ts">
  interface Props {
    hover?: boolean;
    children: import('svelte').Snippet;
  }

  let { hover = false, children }: Props = $props();
  let hovered = $state(false);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="glass"
  class:hoverable={hover}
  class:hovered
  onmouseenter={() => hover && (hovered = true)}
  onmouseleave={() => hover && (hovered = false)}
>
  {@render children()}
</div>

<style>
  .glass {
    background: #ECEEF208;
    border: 1px solid #ECEEF215;
    border-radius: 16px;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
  }
  .glass.hoverable.hovered {
    background: #ECEEF20c;
    border-color: #ECEEF222;
  }
</style>
