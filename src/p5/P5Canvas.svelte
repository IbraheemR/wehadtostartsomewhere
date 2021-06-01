<script>
  import p5 from "p5";
  import { onMount } from "svelte";

  export let setup;
  export let draw = () => {};

  let container;

  onMount(() => {
    console.log(container);

    const sketch = (p) => {
      p.setup = () => setup(p);
      p.draw = () => draw(p);
    };

    new p5(sketch, container);
  });
</script>

<div bind:this={container} />
