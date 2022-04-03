import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import * as d3 from "d3-random";
import Square from "../Square/Square";
import Visualizer from "../Visualizer/Visualizer";
import DrumRows from "../DrumRows/DrumRows";
import Toolbar from "../Toolbar/Toolbar";
import audioProps from "../audioProps";

Tone.Destination.volume.value = -6;

const Sequencer = () => {
  const [clicked, setClicked] = useState(false);
  const [playState, setPlayState] = useState(Tone.Transport.state);
  const [activeColumn, setColumn] = useState(-1);
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
          Tone.Draw.schedule(() => {
            setColumn(col);
          }, time + "+0.1");
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
    <div className="wrapper">
      <Toolbar
        clicked={clicked}
        initialClick={initialClick}
        startStop={startStop}
        playState={playState}
      />
      <DrumRows
        activeColumn={activeColumn}
        pattern={pattern}
        setPattern={setPattern}
      />
      <br />
      {polySynthPattern.map((row, y) => (
        <div key={y} style={{ display: "flex", justifyContent: "center" }}>
          {row.map((value, x) => (
            <Square
              key={x}
              active={activeColumn === x}
              value={value}
              instrument={"PolySynth"}
              // onClick={() => setPattern({ x, y, value })}
            />
          ))}
        </div>
      ))}
      {/* <Visualizer /> */}
    </div>
  );
};

export default Sequencer;
