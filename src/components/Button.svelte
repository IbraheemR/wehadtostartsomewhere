<script>
  export let buttonClass = "";
  export let onclick;
</script>

<button class={buttonClass} on:click={onclick}><slot /></button>
