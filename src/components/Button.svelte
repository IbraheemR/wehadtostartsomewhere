<script>
  export let primaryStyle = false;
  export let onclick;
</script>

<button class:primary={primaryStyle} on:click={onclick}><slot /></button>

<style>
  button {
    background: transparent;
    color: var(--theme-high);
    border: 2px solid var(--theme-high);

    outline: none;

    padding: 1rem;
    cursor: pointer;

    font-weight: bold;
  }
  .primary {
    background-color: var(--theme-high);
    color: var(--theme-text);
  }
</style>
