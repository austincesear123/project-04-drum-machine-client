import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import * as d3 from "d3-random";

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

const dist = new Tone.Distortion(0.1).toDestination();

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
  envelope: {
    attack: 0.001,
    decay: 1,
    sustain: 0.1,
    release: 0.1,
  },
});
polySynth.volume.value = -24;

const Sequencer = () => {
  const [clicked, setClicked] = useState(false);
  const [playState, setPlayState] = useState(Tone.Transport.state);
  const [activeColumn, setColumn] = useState(0);
  const [pattern, updatePattern] = useState(initialPattern);
  const [polySynthPattern, setPolySynthPattern] = useState(
    initialPolySynthPattern
  );

  useEffect(
    () => {
      const loop = new Tone.Sequence(
        (time, col) => {
          // Update active column for animation
          //   setColumn(col);
          // Loop current pattern
          pattern.map((row, noteIndex) => {
            // If active
            if (row[col] && noteIndex === 0) {
              // Play based on which row
              bassSynth.triggerAttackRelease("C0", "8n", time + "+0.1");
            } else if (row[col] && noteIndex === 1) {
              snareSynth.triggerAttackRelease("8n", time + "+0.1");
            } else if (row[col] && noteIndex === 2) {
              hiHatSynth.triggerAttackRelease("C1", "8n", time + "+0.1");
            } else if (row[col] && noteIndex === 3) {
              pluckSynth.triggerAttackRelease("C4", "8n", time + "+0.1");
            }
            return null;
          });
        },
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "16n"
      ).start(0);
      return () => loop.dispose();
    },
    [pattern] // Retrigger when pattern changes
  );

  let tuneData = 0;

  useEffect(() => {
    Tone.Transport.scheduleRepeat(() => {
      randomizeSequencer();
    }, "2m");
  }, []);

  function randomizeSequencer() {
    const psPatternCopy = [...polySynthPattern];
    // Choose a % chance so that sometimes it is more busy, other times more sparse
    const chance = d3.randomUniform(0.5, 1.5)();

    // Loop through and create some random on/off values
    const row = psPatternCopy[tuneData % notes.length];
    tuneData++;
    for (let x = 0; x < row.length; x++) {
      row[x] = Math.abs(d3.randomNormal()()) > chance ? 1 : 0;
    }
    // Loop through again and make sure we don't have two
    // consectutive on values (it sounds bad)
    for (let x = 0; x < row.length - 1; x++) {
      if (row[x] === 1 && row[x + 1] === 1) {
        row[x + 1] = 0;
        x++;
      }
    }
    setPolySynthPattern(psPatternCopy);
  }

  useEffect(() => {
    const polySynthLoop = new Tone.Sequence(
      (time, col) => {
        let notesToPlay = [];
        polySynthPattern.map((row, noteIndex) => {
          if (row[col]) {
            notesToPlay.push(notes[noteIndex]);
          }
          return null;
        });
        polySynth.triggerAttackRelease(notesToPlay, "16n", time);
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "16n"
    ).start(0);
    return () => polySynthLoop.dispose();
  }, [polySynthPattern]);

  async function initialClick() {
    await Tone.start();
    // Tone.context.resume()
    console.log("running");
    setClicked(true);
  }

  // Toggle playing / stopped
  // const toggle = useCallback(() => {
  //   Tone.Transport.toggle();
  //   setPlayState(Tone.Transport.state);
  // }, []);

  function startStop() {
    if (clicked) {
      if (playState === "stopped") {
        console.log("start");
        Tone.Transport.start(Tone.now());
        setPlayState("started");
      } else {
        console.log("stop");
        Tone.Transport.stop();
        setPlayState("stopped");
      }
    }
  }

  // Update pattern by making a copy and inverting the value
  function setPattern({ x, y, value }) {
    const patternCopy = [...pattern];
    patternCopy[y][x] = +!value;
    updatePattern(patternCopy);
  }
  return (
    <div>
      <button
        style={{ display: !clicked ? "inline" : "none" }}
        onClick={initialClick}
      >
        First Click here
      </button>
      <button
        style={{ display: !clicked ? "none" : "inline" }}
        onClick={startStop}
      >
        {playState}
      </button>
      {pattern.map((row, y) => (
        <div key={y} style={{ display: "flex", justifyContent: "center" }}>
          {row.map((value, x) => (
            <Square
              key={x}
              active={activeColumn === x}
              value={value}
              onClick={() => setPattern({ x, y, value })}
            />
          ))}
        </div>
      ))}
      <br />
      {polySynthPattern.map((row, y) => (
        <div key={y} style={{ display: "flex", justifyContent: "center" }}>
          {row.map((value, x) => (
            <Square
              key={x}
              active={activeColumn === x}
              value={value}
              onClick={() => setPattern({ x, y, value })}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const Square = ({ active, value, onClick }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 25,
      height: 25,
      background: value ? "#999" : "",
      border: active ? "1px solid #999" : "1px solid #eee",
      cursor: "pointer",
    }}
    onClick={onClick}
  ></div>
);

export default Sequencer;
