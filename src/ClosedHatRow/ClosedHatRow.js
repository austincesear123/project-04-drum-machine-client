import "./ClosedHatRow.css";
import { useEffect, useState } from "react";
import * as Tone from "tone";

const dist = new Tone.Distortion(0.1).toDestination();

const closedHatSynth = new Tone.MetalSynth({
  envelope: {
    attack: 0.001,
    decay: 0.05,
    sustain: 0,
    release: 0.03,
  },
  resonance: 8000,
}).connect(dist);
closedHatSynth.volume.value = -6;

const defaultSeq = [
  { time: "0:0:0", note: "C1", velocity: 1 },
  { time: "0:0:1", note: "C1", velocity: 1 },
  { time: "0:0:2", note: "C1", velocity: 1 },
  //   { time: "0:0:3", note: "C1", velocity: 0 },
  { time: "0:1:0", note: "C1", velocity: 1 },
  { time: "0:1:1", note: "C1", velocity: 1 },
  { time: "0:1:2", note: "C1", velocity: 1 },
  //   { time: "0:1:3", note: "C1", velocity: 0 },
  { time: "0:2:0", note: "C1", velocity: 1 },
  { time: "0:2:1", note: "C1", velocity: 1 },
  { time: "0:2:2", note: "C1", velocity: 1 },
  //   { time: "0:2:3", note: "C1", velocity: 0 },
  { time: "0:3:0", note: "C1", velocity: 1 },
  { time: "0:3:1", note: "C1", velocity: 1 },
  { time: "0:3:2", note: "C1", velocity: 1 },
  //   { time: "0:3:3", note: "C1", velocity: 0 },
];

const defaultStepChecked = [
  true,
  true,
  false,
  false,
  true,
  true,
  false,
  false,
  true,
  true,
  false,
  false,
  true,
  true,
  false,
  false,
];

const defaultStepChecked2 = [
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
  true,
  false,
];

const closedHatPart = new Tone.Part((time, value) => {
  if (value.open) {
    closedHatSynth.envelope.decay = 0.1;
  } else {
    closedHatSynth.envelope.decay = 0.03;
  }
  closedHatSynth.triggerAttackRelease(value.note, "16n", time, value.velocity);
}, defaultSeq);

const ClosedHatRow = ({ clock }) => {
  // const [closedHatSeq, setClosedHatSeq] = useState(defaultSeq);
  // const [closedHatPartContainer, setClosedHatPartContainer] = useState({});
  const [closedHatStepChecked, setClosedHatStepChecked] =
    useState(defaultStepChecked);
  const [openHatStepChecked, setOpenHatStepChecked] =
    useState(defaultStepChecked2);

  const [closedHatRow, setClosedHatRow] = useState([]);
  const [openHatRow, setOpenHatRow] = useState([]);

  useEffect(() => {
    closedHatPart.start("+0.1");
    // setClosedHatPartContainer(closedHatPart);
  }, []);

  function toggleClosedHatActiveStep(index, row) {
    // Tone.Transport.clear(closedHatPartContainer)
    // closedHatPartContainer.dispose();
    closedHatPart.clear();
    const updatedClosedHatStepChecked = [...closedHatStepChecked];
    const updatedOpenHatStepChecked = [...openHatStepChecked];
    // const updatedClosedHatSeq = [];

    if (row === "ch") {
      if (
        !updatedClosedHatStepChecked[index] &&
        updatedOpenHatStepChecked[index]
      ) {
        updatedClosedHatStepChecked[index] = true;
        updatedOpenHatStepChecked[index] = false;
      } else if (!updatedClosedHatStepChecked[index]) {
        updatedClosedHatStepChecked[index] = true;
      } else {
        updatedClosedHatStepChecked[index] = false;
      }
    }

    if (row === "oh") {
      if (!updatedOpenHatStepChecked[index] && updatedClosedHatStepChecked) {
        updatedOpenHatStepChecked[index] = true;
        updatedClosedHatStepChecked[index] = false;
      } else if (!updatedOpenHatStepChecked) {
        updatedOpenHatStepChecked[index] = true;
      } else {
        updatedOpenHatStepChecked[index] = false;
      }
    }

    for (let i = 0; i < updatedClosedHatStepChecked.length; i++) {
      if (updatedClosedHatStepChecked[i]) {
        if (i < 4) {
          closedHatPart.add({
            time: `0:0:${i}`,
            note: "C1",
            velocity: 1,
          });
        } else if (i < 8) {
          closedHatPart.add({
            time: `0:1:${i - 4}`,
            note: "C1",
            velocity: 1,
          });
        } else if (i < 12) {
          closedHatPart.add({
            time: `0:2:${i - 8}`,
            note: "C1",
            velocity: 1,
          });
        } else if (i < 16) {
          closedHatPart.add({
            time: `0:3:${i - 12}`,
            note: "C1",
            velocity: 1,
          });
        }
      } else if (updatedOpenHatStepChecked[i]) {
        if (i < 4) {
          closedHatPart.add({
            time: `0:0:${i}`,
            note: "C1",
            velocity: 1,
          });
        } else if (i < 8) {
          closedHatPart.add({
            time: `0:1:${i - 4}`,
            note: "C1",
            velocity: 1,
          });
        } else if (i < 12) {
          closedHatPart.add({
            time: `0:2:${i - 8}`,
            note: "C1",
            velocity: 1,
          });
        } else if (i < 16) {
          closedHatPart.add({
            time: `0:3:${i - 12}`,
            note: "C1",
            velocity: 1,
          });
        }
      }
    }

    // const updatedClosedHatPart = new Tone.Part((time, value) => {
    //   if (value.open) {
    //     closedHatSynth.envelope.decay = 0.1;
    //   } else {
    //     closedHatSynth.envelope.decay = 0.03;
    //   }
    //   closedHatSynth.triggerAttackRelease(
    //     value.note,
    //     "16n",
    //     time,
    //     value.velocity
    //   );
    // }, updatedClosedHatSeq).start("0:0:0");
    // setClosedHatSeq(updatedClosedHatSeq);
    // setClosedHatPartContainer(updatedClosedHatPart);
    setClosedHatStepChecked(updatedClosedHatStepChecked);
    setOpenHatStepChecked(updatedOpenHatStepChecked);
  }

  useEffect(() => {
    const closedHatNote = [];
    for (let i = 0; i < 16; i++) {
      closedHatNote.push(
        <div
          key={i}
          className={
            clock === i + 1
              ? "closed-hat-note closed-hat-red"
              : closedHatStepChecked[i] === true
              ? "closed-hat-note closed-hat-green"
              : "closed-hat-note"
          }
          onClick={() => toggleClosedHatActiveStep(i, "ch")}
        >
          {i + 1}
        </div>
      );
    }
    setClosedHatRow(closedHatNote);
  }, [closedHatStepChecked]);

  useEffect(() => {
    const openHatNote = [];
    for (let i = 0; i < 16; i++) {
      openHatNote.push(
        <div
          key={i}
          className={
            clock === i + 1
              ? "open-hat-note open-hat-red"
              : openHatStepChecked[i] === true
              ? "open-hat-note open-hat-green"
              : "open-hat-note"
          }
          onClick={() => toggleClosedHatActiveStep(i, "oh")}
        >
          {i + 1}
        </div>
      );
    }
    setOpenHatRow(openHatNote);
  }, [openHatStepChecked]);

  return (
    <>
      <div className="closed-hat-track">
        <div className="closed-hat-note">Closed HH</div>
        {closedHatRow}
      </div>
      <div className="open-hat-track">
        <div className="open-hat-note">Open HH</div>
        {openHatRow}
      </div>
    </>
  );
};

export default ClosedHatRow;
