import { readable, writable } from "svelte/store";
import { loadLayersModel } from "@tensorflow/tfjs";

console.log(loadLayersModel);

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

// Dummy function to update the resto of the parameters, as if the model is being run.
inputs.subscribe(() => {
  if (setHiddenActivation) setHiddenActivation(randomArray(128));
  if (setOutput) setOutput(randomArray(10));
});

export default { inputs, activations, outputs };

function randomArray(n) {
  let o = [];
  for (let i = 0; i < n; i++) {
    o.push(Math.random());
  }
  return o;
}
