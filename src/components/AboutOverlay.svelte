<script>
  import Button from "./Button.svelte";

  export let show;
</script>

<div class="blur" class:show>
  <section>
    <div class="right">
      <Button onclick={() => (show = false)} primaryStyle>Exit</Button>
    </div>

    <h2>MNIST Explorer - About</h2>
    <p>
      Draw a digit and see a simple MNIST classifier network process it in
      real-time.
      <br />
      <br />
      The model features a 28x28 input array, and two dense layers (128 and 10)
      <br />
      <br />
      This model was trained on the classic MNIST dataset. The model mis-predicts
      sometimes on our canvas, since we have done no further transfer learning, however
      this is intended.
      <br />
      <br />
    </p>
    <h3>Motivation</h3>
    <p>
      This project was completed in two weeks during June 2021 as an exploration
      into team dynamics.
    </p>
    <h3>Technologies Used</h3>
    <p>SvelteJS, p5.js, TensorFlow/Keras, tf.js, deployed on Netlify</p>
    <p>
      <a
        target="_blank"
        href="https://github.com/ibraheemr/wehadtostartsomewhere">Source Code</a
      >
    </p>
    <h3>Credits</h3>
    <ul>
      <li>
        <strong
          ><a target="_blank" href="http://ibraheemrodrigues.com"
            >Ibraheem Rodrigues</a
          ></strong
        > - Project Lead & Orchestration
      </li>
      <li>
        <strong
          ><a
            target="_blank"
            href="https://www.linkedin.com/in/aryenne-marie-oliveros/"
            >Aryenne Oliveros</a
          ></strong
        > - AI training & deployment
      </li>
      <li>
        <strong
          ><a
            target="_blank"
            href="https://www.linkedin.com/in/mihai-bogdan-cuciureanu-2b0a2120a"
            >Bogdan Cuciureanu</a
          ></strong
        > - Interactive & visual graphics
      </li>
      <li>
        <strong
          ><a target="_blank" href="https://github.com/ham-q">Hamzah Qureshi</a
          ></strong
        > - UI and Aesthetics/Theming
      </li>
    </ul>
  </section>
</div>

<style>
  .blur {
    position: fixed;

    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    display: none;

    background: rgba(1, 1, 1, 0.7);

    overflow: scroll;
  }

  .blur.show {
    display: block;
  }

  section {
    width: 90vmin;
    max-width: 1000px;

    padding: 2rem 1rem;
    margin: 1rem auto;

    background: var(--theme-bg);
  }

  .right {
    float: right;
  }

  a {
    color: var(--theme-text);
    text-decoration: underline;
  }

  h2 {
    font-size: 30px;
    font-weight: bold;
  }

  h3 {
    font-size: 24px;
    font-weight: bold;
  }
  * {
    font-size: 16px;
  }
</style>
