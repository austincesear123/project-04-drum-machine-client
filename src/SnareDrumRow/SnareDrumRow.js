import "./SnareDrumRow.css";
import { useEffect, useState } from "react";
import * as Tone from "tone";

const lowPass = new Tone.Filter({
  frequency: 8000,
  type: "lowpass",
}).toDestination();

const snareSynth = new Tone.NoiseSynth({
  volume: -12,
  noise: {
    type: "white",
    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 0.10,
    sustain: 0.05,
    release: 0.03,
  },
}).connect(lowPass);

const defaultSeq = [
  { time: "0:0:0", note: "C1", velocity: 0 },
  { time: "0:0:1", note: "C1", velocity: 0 },
  { time: "0:0:2", note: "C1", velocity: 0 },
  { time: "0:0:3", note: "C1", velocity: 0 },
  { time: "0:1:0", note: "C1", velocity: 1 },
  { time: "0:1:1", note: "C1", velocity: 0 },
  { time: "0:1:2", note: "C1", velocity: 0 },
  { time: "0:1:3", note: "C1", velocity: 0 },
  { time: "0:2:0", note: "C1", velocity: 0 },
  { time: "0:2:1", note: "C1", velocity: 0 },
  { time: "0:2:2", note: "C1", velocity: 0 },
  { time: "0:2:3", note: "C1", velocity: 0 },
  { time: "0:3:0", note: "C1", velocity: 1 },
  { time: "0:3:1", note: "C1", velocity: 0 },
  { time: "0:3:2", note: "C1", velocity: 0 },
  { time: "0:3:3", note: "C1", velocity: 0 },
];

const SnareDrumRow = ({ clock }) => {
  const [snareSeq, setSnareSeq] = useState(defaultSeq);
  const [snarePartContainer, setSnarePartContainer] = useState({});

  useEffect(() => {
    const snarePart = new Tone.Part((time, value) => {
      snareSynth.triggerAttackRelease("8n", time, value.velocity);
    }, snareSeq).start("0:0:0");
    setSnarePartContainer(snarePart);
  }, []);

  function toggleActiveStep(index) {
    snarePartContainer.dispose();
    const updatedSnareSeq = [...snareSeq];
    if (updatedSnareSeq[index].velocity === 0) {
      updatedSnareSeq[index] = { ...updatedSnareSeq[index], velocity: 1 };
    } else if (updatedSnareSeq[index].velocity === 1) {
      updatedSnareSeq[index] = { ...updatedSnareSeq[index], velocity: 0 };
    }
    setSnareSeq(updatedSnareSeq);
    const updatedSnarePart = new Tone.Part((time, value) => {
      snareSynth.triggerAttackRelease("8n", time, value.velocity);
    }, updatedSnareSeq).start("0:0:0");
    setSnarePartContainer(updatedSnarePart)
  }

  const snareNote = [];
  for (let i = 0; i < 16; i++) {
    snareNote.push(
      <div
        key={i}
        className={
          clock === i + 1
            ? "snare-note snare-red"
            : snareSeq[i].velocity === 1
            ? "snare-note snare-green"
            : "snare-note"
        }
        onClick={() => toggleActiveStep(i)}
      >
        {i + 1}
      </div>
    );
  }

  return <div className="snare-track">{snareNote}</div>;
};

export default SnareDrumRow;
