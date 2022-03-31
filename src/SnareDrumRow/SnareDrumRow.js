import "./SnareDrumRow.css";
import { useEffect, useState } from "react";
import * as Tone from "tone";

const dist = new Tone.Distortion(0.1).toDestination();

const lowPass = new Tone.Filter({
  frequency: 20000,
  type: "lowpass",
}).connect(dist);

const snareSynth = new Tone.NoiseSynth({
  volume: -9,
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
}).connect(lowPass);

const defaultSeq = [
  // { time: "0:0:0", note: "C1", velocity: 0 },
  // { time: "0:0:1", note: "C1", velocity: 0 },
  // { time: "0:0:2", note: "C1", velocity: 0 },
  // { time: "0:0:3", note: "C1", velocity: 0 },
  { time: "0:1:0", note: "C1", velocity: 1 },
  // { time: "0:1:1", note: "C1", velocity: 0 },
  // { time: "0:1:2", note: "C1", velocity: 0 },
  // { time: "0:1:3", note: "C1", velocity: 0 },
  // { time: "0:2:0", note: "C1", velocity: 0 },
  // { time: "0:2:1", note: "C1", velocity: 0 },
  // { time: "0:2:2", note: "C1", velocity: 0 },
  // { time: "0:2:3", note: "C1", velocity: 0 },
  { time: "0:3:0", note: "C1", velocity: 1 },
  // { time: "0:3:1", note: "C1", velocity: 0 },
  // { time: "0:3:2", note: "C1", velocity: 0 },
  // { time: "0:3:3", note: "C1", velocity: 0 },
];

const defaultStepChecked = [
  false,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
];

const snarePart = new Tone.Part((time, value) => {
  snareSynth.triggerAttackRelease("16n", time, value.velocity);
}, defaultSeq);

const SnareDrumRow = ({ clock }) => {
  // const [snareSeq, setSnareSeq] = useState(defaultSeq);
  // const [snarePartContainer, setSnarePartContainer] = useState({});
  const [snareStepChecked, setSnareStepChecked] = useState(defaultStepChecked);
  const [snareRow, setSnareRow] = useState([]);

  useEffect(() => {
    // const snarePart = new Tone.Part((time, value) => {
    //   snareSynth.triggerAttackRelease("16n", time, value.velocity);
    // }, defaultSeq).start("0:0:0");
    snarePart.start("+0.1");
    // setSnarePartContainer(snarePart);
  }, []);

  function toggleSnareActiveStep(index) {
    // Tone.Transport.clear(snarePartContainer)
    // snarePartContainer.dispose();
    snarePart.clear();
    const updatedSnareStepChecked = [...snareStepChecked];
    // const updatedSnareSeq = [];

    if (!updatedSnareStepChecked[index]) {
      updatedSnareStepChecked[index] = true;
    } else {
      updatedSnareStepChecked[index] = false;
    }

    for (let i = 0; i < updatedSnareStepChecked.length; i++) {
      if (updatedSnareStepChecked[i]) {
        if (i < 4) {
          snarePart.add({ time: `0:0:${i}`, note: "C0", velocity: 1 });
        } else if (i < 8) {
          snarePart.add({
            time: `0:1:${i - 4}`,
            note: "C0",
            velocity: 1,
          });
        } else if (i < 12) {
          snarePart.add({
            time: `0:2:${i - 8}`,
            note: "C0",
            velocity: 1,
          });
        } else if (i < 16) {
          snarePart.add({
            time: `0:3:${i - 12}`,
            note: "C0",
            velocity: 1,
          });
        }
      }
    }

    // if (updatedSnareSeq[index].velocity === 0) {
    //   updatedSnareSeq[index] = { ...updatedSnareSeq[index], velocity: 1 };
    // } else if (updatedSnareSeq[index].velocity === 1) {
    //   updatedSnareSeq[index] = { ...updatedSnareSeq[index], velocity: 0 };
    // }

    // const updatedSnarePart = new Tone.Part((time, value) => {
    //   snareSynth.triggerAttackRelease("16n", time, value.velocity);
    // }, updatedSnareSeq).start("0:0:0");
    // setSnareSeq(updatedSnareSeq);
    // setSnarePartContainer(updatedSnarePart);
    setSnareStepChecked(updatedSnareStepChecked);
  }

  useEffect(() => {
    const snareNote = [];
    for (let i = 0; i < 16; i++) {
      snareNote.push(
        <div
          key={i}
          className={
            clock === i + 1
              ? "snare-note snare-red"
              : snareStepChecked[i] === true
              ? "snare-note snare-green"
              : "snare-note"
          }
          onClick={() => toggleSnareActiveStep(i)}
        >
          {i + 1}
        </div>
      );
    }
    setSnareRow(snareNote)
  }, [snareStepChecked]);

  return (
    <div className="snare-track">
      <div className="snare-note">Snare</div>
      {snareRow}
    </div>
  );
};

export default SnareDrumRow;
