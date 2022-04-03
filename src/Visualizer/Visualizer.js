import * as Tone from "tone";
import Sketch from "react-p5";
import audioProps from "../audioProps";

const bassSynthWave = new Tone.Waveform();
audioProps.bassSynth.connect(bassSynthWave);

const snareSynthWave = new Tone.Waveform();
audioProps.snareSynth.connect(snareSynthWave);

const hiHatSynthWave = new Tone.Waveform();
audioProps.hiHatSynth.connect(hiHatSynthWave);

const pluckSynthWave = new Tone.Waveform();
audioProps.pluckSynth.connect(pluckSynthWave);

const Visualizer = ({ instrument }) => {
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(84, 42).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.stroke(255);
    let buffer;
    if (instrument === "Kick") {
      buffer = bassSynthWave.getValue(0);
    } else if (instrument === "Snare") {
      buffer = snareSynthWave.getValue(0);
    } else if (instrument === "HiHat") {
      buffer = hiHatSynthWave.getValue(0);
    } else if (instrument === "Pluck") {
      buffer = pluckSynthWave.getValue(0);
    }

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
