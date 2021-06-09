<script>
  import model from "../model/model";
  import Button from "./Button.svelte";

  let { outputs } = model;

  export let clearCanvas;

  let maxProb;

  $: maxProb = $outputs.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );
</script>

<h1>MNIST Explorer</h1>

<h3>Output Probabilities:</h3>

<div id="probs">
  {#each $outputs as output, i}
    <div>
      <strong>{i}</strong> : {output.toFixed(3)}

      {#if i === 4}
        <br />
      {/if}
    </div>
  {/each}
</div>

<h2 id="output">
  <span>
    Prediction: <strong>{maxProb}</strong>
  </span>

  <span id="credit">
    (Ibraheem Rodrigues <a>Et Al</a>.)
    <!-- TODO: link this to credits or something -->
  </span>
</h2>

<Button onclick={clearCanvas}>Clear</Button>

<style>
  #probs {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    max-width: 30rem;
    margin: 0 auto;
  }

  #output {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  #credit {
    font-size: 1rem;
  }
</style>
