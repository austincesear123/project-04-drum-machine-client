import "./BassDrumRow.css";
import { useEffect, useState } from "react";
import * as Tone from "tone";

const bassSynth = new Tone.MembraneSynth().toDestination();
const defaultSeq = [
  { time: "0:0:0", note: "C1", velocity: 1 },
  { time: "0:0:1", note: "C1", velocity: 0 },
  { time: "0:0:2", note: "C1", velocity: 0 },
  { time: "0:0:3", note: "C1", velocity: 0 },
  { time: "0:1:0", note: "C1", velocity: 1 },
  { time: "0:1:1", note: "C1", velocity: 0 },
  { time: "0:1:2", note: "C1", velocity: 0 },
  { time: "0:1:3", note: "C1", velocity: 0 },
  { time: "0:2:0", note: "C1", velocity: 1 },
  { time: "0:2:1", note: "C1", velocity: 0 },
  { time: "0:2:2", note: "C1", velocity: 0 },
  { time: "0:2:3", note: "C1", velocity: 0 },
  { time: "0:3:0", note: "C1", velocity: 1 },
  { time: "0:3:1", note: "C1", velocity: 0 },
  { time: "0:3:2", note: "C1", velocity: 0 },
  { time: "0:3:3", note: "C1", velocity: 0 },
];

const BassDrumRow = ({ clock, setClock }) => {
  const [bassSeq, setBassSeq] = useState(defaultSeq);
  const [bassPartContainer, setBassPartContainer] = useState({});

  useEffect(() => {
    const bassPart = new Tone.Part((time, value) => {
      console.log(time);
      let currentBeat = Tone.Transport.position
        .split(":")
        .map((i) => parseInt(i));
      handleClock(currentBeat);
      bassSynth.triggerAttackRelease(value.note, "8n", time, value.velocity);
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
    console.log(`${index} clicked`);
    const updatedBassSeq = [...bassSeq];
    if (updatedBassSeq[index].velocity === 0) {
      updatedBassSeq[index] = { ...updatedBassSeq[index], velocity: 1 };
    } else if (updatedBassSeq[index].velocity === 1) {
      updatedBassSeq[index] = { ...updatedBassSeq[index], velocity: 0 };
    }
    setBassSeq(updatedBassSeq);
    const updatedBassPart = new Tone.Part((time, value) => {
      console.log(time);
      let currentBeat = Tone.Transport.position
        .split(":")
        .map((i) => parseInt(i));
      console.log(currentBeat);
      handleClock(currentBeat);
      bassSynth.triggerAttackRelease(value.note, "8n", time, value.velocity);
    }, updatedBassSeq).start("0:0:0");
    setBassPartContainer(updatedBassPart)
  }

  const bassNote = [];
  for (let i = 0; i < 16; i++) {
    bassNote.push(
      <div
        key={i}
        className={
          clock === i + 1
            ? "bass-note bass-red"
            : bassSeq[i].velocity === 1
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
