import { readable, writable } from "svelte/store";
import { loadLayersModel, model, softmax, tensor } from "@tensorflow/tfjs";

let setInput, setOutput, setHiddenActivation;

let inputs = writable(new Array(28 * 28).fill(0), (set) => {
  setInput = set;
});

let activations = readable(randomArray(128), (set) => {
  setHiddenActivation = set;
});

let outputs = readable(randomArray(10), (set) => {
  setOutput = set;
});


export default { inputs, activations, outputs };

function randomArray(n) {
  let o = [];
  for (let i = 0; i < n; i++) {
    o.push(Math.random());
  }
  return o;
}

(async () => {

  let mnist_model = await loadLayersModel("/model/model.json");
  let hidden_model = model({inputs: mnist_model.inputs, outputs: mnist_model.getLayer("", 2).getOutputAt(0)});

  inputs.subscribe(async data => {
    const shorthand = tensor(data).reshape([1,28,28]);
    
    let result = mnist_model.predict(shorthand);
    result = softmax(result);
    setOutput(await result.data());

    let hidden_layer = hidden_model.predict(shorthand);
    setHiddenActivation(await hidden_layer.data());

  });

  })();

