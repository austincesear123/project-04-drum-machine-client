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
}).connect(dist);
closedHatSynth.volume.value = -12;

const defaultSeq = [
  { time: "0:0:0", note: "C1", velocity: 1, open: false },
  { time: "0:0:1", note: "C1", velocity: 1, open: false },
  { time: "0:0:2", note: "C1", velocity: 1, open: true },
  //   { time: "0:0:3", note: "C1", velocity: 0 },
  { time: "0:1:0", note: "C1", velocity: 1, open: false },
  { time: "0:1:1", note: "C1", velocity: 1, open: false },
  { time: "0:1:2", note: "C1", velocity: 1, open: true },
  //   { time: "0:1:3", note: "C1", velocity: 0 },
  { time: "0:2:0", note: "C1", velocity: 1, open: false },
  { time: "0:2:1", note: "C1", velocity: 1, open: false },
  { time: "0:2:2", note: "C1", velocity: 1, open: true },
  //   { time: "0:2:3", note: "C1", velocity: 0 },
  { time: "0:3:0", note: "C1", velocity: 1, open: false },
  { time: "0:3:1", note: "C1", velocity: 1, open: false },
  { time: "0:3:2", note: "C1", velocity: 1, open: true },
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

const ClosedHatRow = ({ clock }) => {
  const [closedHatSeq, setClosedHatSeq] = useState(defaultSeq);
  const [closedHatPartContainer, setClosedHatPartContainer] = useState({});
  const [closedHatStepChecked, setClosedHatStepChecked] =
    useState(defaultStepChecked);
  const [openHatStepChecked, setOpenHatStepChecked] =
    useState(defaultStepChecked2);

  useEffect(() => {
    const closedHatPart = new Tone.Part((time, value) => {
      if (value.open) {
        closedHatSynth.envelope.decay = 0.5;
      } else {
        closedHatSynth.envelope.decay = 0.05;
      }
      closedHatSynth.triggerAttackRelease(
        value.note,
        "16n",
        time,
        value.velocity
      );
    }, closedHatSeq).start("0:0:0");
    setClosedHatPartContainer(closedHatPart);
  }, []);

  function toggleActiveStep(index) {
    closedHatPartContainer.dispose();
    const updatedClosedHatStepChecked = [...closedHatStepChecked];
    const updatedClosedHatSeq = [];

    if (!updatedClosedHatStepChecked[index]) {
      updatedClosedHatStepChecked[index] = true;
    } else {
      updatedClosedHatStepChecked[index] = false;
    }

    for (let i = 0; i < updatedClosedHatStepChecked.length; i++) {
      if (updatedClosedHatStepChecked[i]) {
        if (i < 4) {
          updatedClosedHatSeq.push({
            time: `0:0:${i}`,
            note: "C1",
            velocity: 1,
          });
        } else if (i < 8) {
          updatedClosedHatSeq.push({
            time: `0:1:${i - 4}`,
            note: "C1",
            velocity: 1,
          });
        } else if (i < 12) {
          updatedClosedHatSeq.push({
            time: `0:2:${i - 8}`,
            note: "C1",
            velocity: 1,
          });
        } else if (i < 16) {
          updatedClosedHatSeq.push({
            time: `0:3:${i - 12}`,
            note: "C1",
            velocity: 1,
          });
        }
      }
    }

    const updatedClosedHatPart = new Tone.Part((time, value) => {
      closedHatSynth.triggerAttackRelease(
        value.note,
        "16n",
        time,
        value.velocity
      );
    }, updatedClosedHatSeq).start("0:0:0");
    setClosedHatSeq(updatedClosedHatSeq);
    setClosedHatPartContainer(updatedClosedHatPart);
    setClosedHatStepChecked(updatedClosedHatStepChecked);
  }

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
        onClick={() => toggleActiveStep(i)}
      >
        {i + 1}
      </div>
    );
  }
  return <div className="closed-hat-track">{closedHatNote}</div>;
};

export default ClosedHatRow;
