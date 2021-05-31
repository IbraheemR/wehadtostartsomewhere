import { readable } from "svelte/store";

let setPredictions, setActivations;

export default {
    sendData(data) {

    },

    predictions: readable(randomArray(10), set => {
        setPredictions = set;
    }),

    activations: readable(randomArray(128), set => {
        setActivations = set;
    })
}


function randomArray(n) {
    let o = [];
    for (let i=0; i<n;i++) {
        o.push(Math.random())
    }
    return o;
}
