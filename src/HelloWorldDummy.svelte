<script>
  import model from "./model/model";

  let { outputs } = model;
</script>

<h1>Hello World!</h1>
<p>{$outputs.map((x) => x.toFixed(2))}</p>
<p>
  {$outputs.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0)}
</p>

<style>
  p {
    word-wrap: break-word;
  }
</style>
