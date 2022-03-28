import "./BassDrumRow.css";
import { useEffect, useState } from "react";
import * as Tone from "tone";

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

const BassDrumRow = ({ clock, setClock }) => {
  const [bassSeq, setBassSeq] = useState(defaultSeq);
  const [bassPartContainer, setBassPartContainer] = useState({});
  const [bassStepChecked, setBassStepChecked] = useState(defaultStepChecked);

  useEffect(() => {
    const bassPart = new Tone.Part((time, value) => {
      let currentBeat = Tone.Transport.position
        .split(":")
        .map((i) => parseInt(i));
      handleClock(currentBeat);
      bassSynth.triggerAttackRelease(value.note, "16n", time, value.velocity);
    }, bassSeq).start("0:0:0");
    setBassPartContainer(bassPart);
  }, []);

  function handleClock(beat) {
    let beatArr = [
      parseInt(beat[0]) + 1,
      parseInt(beat[1]) + 1,
      parseInt(beat[2]) + 1,
    ];
    if (beatArr[1] === 1) {
      setClock(beatArr[2]);
    } else if (beatArr[1] === 2) {
      setClock(beatArr[2] + 4);
    } else if (beatArr[1] === 3) {
      setClock(beatArr[2] + 8);
    } else if (beatArr[1] === 4) {
      setClock(beatArr[2] + 12);
    }
  }

  function toggleActiveStep(index) {
    bassPartContainer.dispose();
    const updatedBassStepChecked = [...bassStepChecked];
    const updatedBassSeq = [];

    if (!updatedBassStepChecked[index]) {
      updatedBassStepChecked[index] = true;
    } else {
      updatedBassStepChecked[index] = false;
    }

    for (let i = 0; i < updatedBassStepChecked.length; i++) {
      if (updatedBassStepChecked[i]) {
        if (i < 4) {
          updatedBassSeq.push({ time: `0:0:${i}`, note: "C0", velocity: 1 });
        } else if (i < 8) {
          updatedBassSeq.push({
            time: `0:1:${i - 4}`,
            note: "C0",
            velocity: 1,
          });
        } else if (i < 12) {
          updatedBassSeq.push({
            time: `0:2:${i - 8}`,
            note: "C0",
            velocity: 1,
          });
        } else if (i < 16) {
          updatedBassSeq.push({
            time: `0:3:${i - 12}`,
            note: "C0",
            velocity: 1,
          });
        }
      }
    }

    // if (updatedBassSeq[index].velocity === 0) {
    //   updatedBassSeq[index] = { ...updatedBassSeq[index], velocity: 1 };
    // } else if (updatedBassSeq[index].velocity === 1) {
    //   updatedBassSeq[index] = { ...updatedBassSeq[index], velocity: 0 };
    // }
    const updatedBassPart = new Tone.Part((time, value) => {
      let currentBeat = Tone.Transport.position
        .split(":")
        .map((i) => parseInt(i));
      handleClock(currentBeat);
      bassSynth.triggerAttackRelease(value.note, "16n", time, value.velocity);
    }, updatedBassSeq).start("0:0:0");
    setBassSeq(updatedBassSeq);
    setBassPartContainer(updatedBassPart);
    setBassStepChecked(updatedBassStepChecked);
  }

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
        onClick={() => toggleActiveStep(i)}
      >
        {i + 1}
      </div>
    );
  }

  return <div className="bass-track">{bassNote}</div>;
};

export default BassDrumRow;
