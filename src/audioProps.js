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

const drumsMasterChannel = new Tone.Channel().toDestination();

const bassSynth = new Tone.MembraneSynth().connect(drumsMasterChannel);
// bassSynth.volume.value = -6;

const dist = new Tone.Distortion(0.2).connect(drumsMasterChannel);
const snareChannel = new Tone.Channel(-11).connect(dist);
const snareSynth = new Tone.NoiseSynth({
  // volume: -11,
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
}).connect(snareChannel);

const hiHatChannel = new Tone.Channel(-3, -0.25).connect(dist);
const hiHatSynth = new Tone.MetalSynth({
  envelope: {
    attack: 0.001,
    decay: 0.05,
    sustain: 0,
    release: 0.03,
  },
  resonance: 8000,
}).connect(hiHatChannel);
// hiHatSynth.volume.value = -6;

const pluckSynthChannel = new Tone.Channel(0, 0.25).connect(drumsMasterChannel);
const pluckSynth = new Tone.PluckSynth().connect(pluckSynthChannel);
// pluckSynth.volume.value = -6;

const notes = ["A3", "C4", "D4", "E4", "G4", "A4"];
const initialPolySynthPattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const polySynthChannel = new Tone.Channel(-15).toDestination();
const reverb = new Tone.Reverb(3).connect(polySynthChannel);
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
// polySynth.volume.value = -18;

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
const monoSynthChannel = new Tone.Channel(-12).connect(filter);
const monoSynth = new Tone.MonoSynth({
  envelope: {
    attack: 0.01,
    decay: 0.4,
    sustain: 0,
    release: 0.01,
  },
}).connect(monoSynthChannel);
// monoSynth.volume.value = -9;
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
  drumsMasterChannel,
  polySynthChannel
};

export default audioProps;
