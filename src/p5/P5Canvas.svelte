<script>
  import p5 from "p5";
  import { onMount } from "svelte";

  export let setup;
  export let draw = () => {};
  export let mouseClicked = () => {};
  export let mouseReleased = () => {};
  export let mouseWheel = (event) => {};
  export let windowResized = () => {};
  let container;

  onMount(() => {

    const sketch = (p) => {
      p.setup = () => setup(p);
      p.draw = () => draw(p);
      p.mouseClicked = () => mouseClicked(p);
      p.mouseReleased = () => mouseReleased(p);
      p.mouseWheel = (event) => mouseWheel(p,event);
      p.windowResized = () => windowResized(p);
    };

    new p5(sketch, container);
  });
</script>

<div bind:this={container} />

<style>
  div{
    width : 100%;
    height : 100%;
    padding : 0;
    margin : 0;
  }
</style>
