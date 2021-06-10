import { readable, writable } from "svelte/store";
import { loadLayersModel, tensor } from "@tensorflow/tfjs";

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
  //let model = await loadLayersModel("/model/model.json")
  let model = await loadLayersModel("/model/model.json")

  inputs.subscribe(async data => {
    let result = model.predict(tensor(data).reshape([1,28,28]))
    setOutput(await result.data())   
  })

  })()

