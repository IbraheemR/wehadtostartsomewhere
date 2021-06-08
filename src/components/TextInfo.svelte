<script>
  import model from "../model/model";
  import ClearButton from "./ClearButton.svelte";

  let { outputs } = model;

  export let clearCanvas;
</script>

<p>
  {$outputs.map((x) => x.toFixed(2))} =>>
  {$outputs.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0)}
</p>

<ClearButton onclick={clearCanvas} />

<style>
</style>
