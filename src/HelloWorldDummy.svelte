<script>
  import model from "./model/model";

  let { outputs } = model;

  const clearCanvas = () => pass;
</script>

<div class="row mx-5 px-4">
  <div class="col">
    <h2 class="text-left">
      ^ Write a number here ^ 
    </h2> 
  </div>
  <div class="col text-right">
    <button class="btn-danger" on:click={clearCanvas}>Clear</button>
  </div>
</div>
<div class="row mx-5 px-4">
  <div class="col">
    <h1>Prediction is: {$outputs.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0)}</h1>
  </div>
</div>

<!--
<p>{$outputs.map((x) => x.toFixed(2))}</p>
<p>
  {$outputs.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0)}
</p>
-->
<style>
</style>
