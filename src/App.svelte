<script>
  import HelloWorldDummy from "./HelloWorldDummy.svelte";
  import P5Canvas from "./p5/P5Canvas.svelte";

  export let model;
</script>

<main>
  <HelloWorldDummy {model} />

  <P5Canvas
    setup={(p) => {
      p.createCanvas(200, 200);
    }}
    draw={(p) => {
      p.background(0);
      p.stroke(255);
      p.rect(
        Math.random() * p.width,
        Math.random() * p.height,
        Math.random() * p.width,
        Math.random() * p.height
      );
    }}
  />
</main>

<style>
</style>
