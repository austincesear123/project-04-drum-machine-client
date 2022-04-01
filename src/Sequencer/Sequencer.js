import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import * as d3 from "d3-random";
import Sketch from "react-p5";
import Square from "../Square/Square";
import audioProps from "../audioProps";

const Sequencer = () => {
  const [clicked, setClicked] = useState(false);
  const [playState, setPlayState] = useState(Tone.Transport.state);
  const [activeColumn, setColumn] = useState(0);
  const [pattern, updatePattern] = useState(audioProps.initialPattern);
  const [polySynthPattern, setPolySynthPattern] = useState(
    audioProps.initialPolySynthPattern
  );
  const [monoSynthPattern, setMonoSynthPattern] = useState(
    audioProps.initialMonoSynthPattern
  );

  useEffect(
    () => {
      const loop = new Tone.Sequence(
        (time, col) => {
          // Update active column for animation
          //   setColumn(col);
          // Loop current pattern
          pattern.forEach((row, noteIndex) => {
            // If active
            if (row[col] && noteIndex === 0) {
              // Play based on which row
              audioProps.bassSynth.triggerAttackRelease(
                "C0",
                "16nn",
                time + "+0.1"
              );
            } else if (row[col] && noteIndex === 1) {
              audioProps.snareSynth.triggerAttackRelease("8n", time + "+0.1");
            } else if (row[col] && noteIndex === 2) {
              audioProps.hiHatSynth.triggerAttackRelease(
                "C1",
                "16n",
                time + "+0.1"
              );
            } else if (row[col] && noteIndex === 3) {
              audioProps.pluckSynth.triggerAttackRelease(
                "C4",
                "16n",
                time + "+0.1"
              );
            }
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
    const row = psPatternCopy[tuneData % audioProps.notes.length];
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
        polySynthPattern.forEach((row, noteIndex) => {
          if (row[col]) {
            notesToPlay.push(audioProps.notes[noteIndex]);
          }
        });
        audioProps.polySynth.triggerAttackRelease(
          notesToPlay,
          "16n",
          time + "+0.1"
        );
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "16n"
    ).start(0);
    return () => polySynthLoop.dispose();
  }, [polySynthPattern]);

  useEffect(() => {
    let steps128 = 0;
    const monoSynthSequence = new Tone.Sequence(
      (time, col) => {
        if (steps128 < 64) {
          steps128++;
          audioProps.monoSynth.triggerAttackRelease("C2", "16n", time + "+0.1");
        } else if (steps128 >= 64 && steps128 < 127) {
          steps128++;
          audioProps.monoSynth.triggerAttackRelease("A1", "16n", time + "+0.1");
        } else {
          steps128 = 0;
          audioProps.monoSynth.triggerAttackRelease("A1", "16n", time + "+0.1");
        }
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "16n"
    ).start(0);
    return () => monoSynthSequence.dispose();
  }, [monoSynthPattern]);

  async function initialClick() {
    await Tone.start();
    // Tone.context.resume()
    console.log("running");
    setClicked(true);
  }

  function startStop() {
    if (clicked) {
      if (playState === "stopped") {
        Tone.Transport.start(Tone.now());
        setPlayState("started");
      } else {
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
              // onClick={() => setPattern({ x, y, value })}
            />
          ))}
        </div>
      ))}
      <P />
    </div>
  );
};

const monoSynthWave = new Tone.Waveform();
Tone.Destination.connect(monoSynthWave);
const P = (props) => {
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(400, 100).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.stroke(255);
    let buffer = monoSynthWave.getValue(0);
    for (let i = 0; i < buffer.length; i++) {
      let x = p5.map(i, 0, buffer.length, 0, p5.width);
      let y = p5.map(buffer[i], -1, 1, 0, p5.height);
      p5.point(x, y);
    }
    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
  };
  return <Sketch setup={setup} draw={draw} />;
};

export default Sequencer;
