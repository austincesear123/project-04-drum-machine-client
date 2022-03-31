import "./BassDrumRow.css";
import { useEffect, useState } from "react";
import * as Tone from "tone";

const defaultSeq = [
  { time: "0:0:0", note: "C0", velocity: 1 },
  // { time: "0:0:1", note: "C0", velocity: 0 },
  // { time: "0:0:2", note: "C0", velocity: 0 },
  // { time: "0:0:3", note: "C0", velocity: 0 },
  { time: "0:1:0", note: "C0", velocity: 1 },
  // { time: "0:1:1", note: "C0", velocity: 0 },
  // { time: "0:1:2", note: "C0", velocity: 0 },
  // { time: "0:1:3", note: "C0", velocity: 0 },
  { time: "0:2:0", note: "C0", velocity: 1 },
  // { time: "0:2:1", note: "C0", velocity: 0 },
  // { time: "0:2:2", note: "C0", velocity: 0 },
  // { time: "0:2:3", note: "C0", velocity: 0 },
  { time: "0:3:0", note: "C0", velocity: 1 },
  // { time: "0:3:1", note: "C0", velocity: 0 },
  // { time: "0:3:2", note: "C0", velocity: 0 },
  // { time: "0:3:3", note: "C0", velocity: 0 },
];
const defaultStepChecked = [
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
];

const bassSynth = new Tone.MembraneSynth({
  octaves: 10,
  pitchDecay: 0.1,
  envelope: {
    attack: 0.005,
    decay: 1,
    sustain: 1,
    release: 0.2,
  },
}).toDestination();
bassSynth.volume.value = -3;

const bassPart = new Tone.Part((time, value) => {
  bassSynth.triggerAttackRelease(value.note, "16n", time, value.velocity);
}, defaultSeq);

const BassDrumRow = ({ clock }) => {
  // const [bassSeq, setBassSeq] = useState(defaultSeq);
  // const [bassPartContainer, setBassPartContainer] = useState({});
  const [bassStepChecked, setBassStepChecked] = useState(defaultStepChecked);
  const [bassRow, setBassRow] = useState([]);

  useEffect(() => {
    // const bassPart = new Tone.Part((time, value) => {
    //   bassSynth.triggerAttackRelease(value.note, "16n", time, value.velocity);
    // }, defaultSeq).start("0:0:0");
    bassPart.start("+0.1");
    // setBassPartContainer(bassPart);
  }, []);

  useEffect(() => {
    const bassNote = [];
    for (let i = 0; i < 16; i++) {
      bassNote.push(
        <div
          key={i}
          className={
            clock === i + 1
              ? "bass-note bass-red"
              : bassStepChecked[i] === true
              ? "bass-note bass-green"
              : "bass-note"
          }
          onClick={() => toggleBassActiveStep(i)}
        >
          {i + 1}
        </div>
      );
    }
    setBassRow(bassNote);
  }, [bassStepChecked]);

  function toggleBassActiveStep(index) {
    // Tone.Transport.clear(bassPartContainer);
    // bassPartContainer.dispose();
    bassPart.dispose();
    const updatedBassStepChecked = [...bassStepChecked];
    // const updatedBassSeq = [];

    if (!updatedBassStepChecked[index]) {
      updatedBassStepChecked[index] = true;
    } else {
      updatedBassStepChecked[index] = false;
    }

    // for (let i = 0; i < updatedBassStepChecked.length; i++) {
    //   if (updatedBassStepChecked[i]) {
    //     if (i < 4) {
    //       bassPart.add({ time: `0:0:${i}`, note: "C0", velocity: 1 });
    //     } else if (i < 8) {
    //       bassPart.add({
    //         time: `0:1:${i - 4}`,
    //         note: "C0",
    //         velocity: 1,
    //       });
    //     } else if (i < 12) {
    //       bassPart.add({
    //         time: `0:2:${i - 8}`,
    //         note: "C0",
    //         velocity: 1,
    //       });
    //     } else if (i < 16) {
    //       bassPart.add({
    //         time: `0:3:${i - 12}`,
    //         note: "C0",
    //         velocity: 1,
    //       });
    //     }
    //   }
    // }

    // const updatedBassPart = bassPart;

    // setBassSeq(updatedBassSeq);
    // setBassPartContainer(updatedBassPart);
    bassPart.start("+0.1");
    setBassStepChecked(updatedBassStepChecked);
  }

  return (
    <div className="bass-track">
      <div className="bass-note">Kick</div>
      {bassRow}
    </div>
  );
};

export default BassDrumRow;
