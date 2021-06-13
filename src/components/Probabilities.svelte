<script>
  import model from "../model/model";

  let { outputs } = model;
</script>

<h2>Model Output:</h2>

<div id="probs">
  {#each $outputs as output, i}
    <span>
      <strong>{i}</strong>&equals;{output.toFixed(2)}
    </span>
  {/each}
</div>

<style>
  #probs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    max-width: 22rem;

    margin: 0 auto;
  }

  #probs > * {
    flex-basis: 4rem;
  }
</style>
