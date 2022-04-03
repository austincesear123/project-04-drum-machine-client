import * as Tone from "tone";
import Sketch from "react-p5";
import audioProps from "../audioProps";

const monoSynthWave = new Tone.Waveform();
audioProps.monoSynth.connect(monoSynthWave);

const Visualizer = () => {
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(50, 25).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.stroke(255);
    let buffer = monoSynthWave.getValue(0);
    for (let i = 0; i < buffer.length; i++) {
      let x = p5.map(i, 0, buffer.length, 0, p5.width);
      let y = p5.map(buffer[i], -1, 1, 0, p5.height);
      p5.point(x, y);
    }
    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
  };
  return <Sketch setup={setup} draw={draw} />;
};

export default Visualizer;
