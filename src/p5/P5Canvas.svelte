<script>
  import p5 from "p5";
  import { onMount } from "svelte";

  export let setup;
  export let draw = () => {};
  export let mouseClicked = () => {};
  export let mouseReleased = () => {};

  let container;

  onMount(() => {
    const sketch = (p) => {
      p.setup = () => setup(p);
      p.draw = () => draw(p);
      p.mouseClicked = () => mouseClicked(p);
      p.mouseReleased = () => mouseReleased(p);
    };

    new p5(sketch, container);
  });
</script>

<div bind:this={container} />
