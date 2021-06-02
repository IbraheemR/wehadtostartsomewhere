<script>
  import InputCanvas from "./InputCanvas.svelte";
  import HelloWorldDummy from "./HelloWorldDummy.svelte";

  export let model;
</script>

<main>
  <HelloWorldDummy {model} />
  <InputCanvas />
</main>

<style>
</style>
