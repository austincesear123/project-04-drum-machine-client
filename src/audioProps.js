import * as Tone from "tone";

const initialPattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const bassSynth = new Tone.MembraneSynth().toDestination();
bassSynth.volume.value = -6;

const dist = new Tone.Distortion(0.2).toDestination();
const snareSynth = new Tone.NoiseSynth({
  volume: -18,
  noise: {
    type: "white",
    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 0.2,
    sustain: 0,
    release: 0.05,
  },
}).connect(dist);

const hiHatSynth = new Tone.MetalSynth({
  envelope: {
    attack: 0.001,
    decay: 0.05,
    sustain: 0,
    release: 0.03,
  },
  resonance: 8000,
}).connect(dist);
hiHatSynth.volume.value = -6;

const pluckSynth = new Tone.PluckSynth().toDestination();
pluckSynth.volume.value = -6;

const notes = ["A3", "C4", "D4", "E4", "G4", "A4"];
const initialPolySynthPattern = [
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const reverb = new Tone.Reverb(3).toDestination();
reverb.wet.value = 0.5;
const delay = new Tone.PingPongDelay("3.5n", 0.3).connect(reverb);
delay.wet.value = 0.3;
const polySynth = new Tone.PolySynth(Tone.DuoSynth).connect(delay);
polySynth.set({
  harmonicity: 3,
  detune: -1200,
  voice0: {
    envelope: {
      attack: 0.001,
      decay: 0.5,
      sustain: 0,
      release: 0.01,
    },
  },
  voice1: {
    envelope: {
      attack: 0.001,
      decay: 0.5,
      sustain: 0,
      release: 0.01,
    },
  },
});
polySynth.volume.value = -24;

const initialMonoSynthPattern = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const filter = new Tone.Filter().toDestination();
const monoSynth = new Tone.MonoSynth({
  envelope: {
    attack: 0.01,
    decay: 0.4,
    sustain: 0,
    release: 0.01,
  },
}).connect(filter);
monoSynth.volume.value = -15;
const lfo = new Tone.LFO("2m", 100, 4000).start().connect(filter.frequency);

const audioProps = {
  initialPattern,
  initialPolySynthPattern,
  initialMonoSynthPattern,
  bassSynth,
  snareSynth,
  hiHatSynth,
  pluckSynth,
  notes,
  polySynth,
  monoSynth,
};

export default audioProps;
