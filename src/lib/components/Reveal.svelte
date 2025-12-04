<script lang="ts">
  import { inview } from 'svelte-inview';
  import { Motion } from 'svelte-motion';

  export let variants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  export let transition = { duration: 0.5 };
  export let delay = 0;

  let isInView = false;
</script>

<div
  use:inview={{ unobserveOnEnter: true, rootMargin: '-50px' }}
  on:inview_change={({ detail }) => (isInView = detail.inView)}
>
  <Motion
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    {variants}
    transition={{ ...transition, delay }}
    let:motion
  >
    <div use:motion>
      <slot />
    </div>
  </Motion>
</div>
