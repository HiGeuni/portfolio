<script lang="ts">
  let x = $state(0);
  let y = $state(0);
  let visible = $state(false);

  function onMove(e: MouseEvent) {
    x = e.clientX;
    y = e.clientY;
    visible = true;
  }

  function onLeave() {
    visible = false;
  }

  $effect(() => {
    // Only attach on non-touch devices
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  });
</script>

{#if visible}
  <div
    class="cursor-follower"
    style="left: {x}px; top: {y}px;"
  ></div>
{/if}

<style>
  .cursor-follower {
    position: fixed;
    width: 14px;
    height: 14px;
    background: var(--accent);
    border: 2px solid var(--ink);
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 50;
    mix-blend-mode: multiply;
  }
</style>
