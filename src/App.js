import "./App.css";
import * as Tone from "tone";
import { useEffect, useState } from "react";
import BassDrumRow from "./BassDrumRow/BassDrumRow";
import SnareDrumRow from "./SnareDrumRow/SnareDrumRow";
import ClosedHatRow from "./ClosedHatRow/ClosedHatRow";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [clock, setClock] = useState(0);

  Tone.Transport.bpm.value = 140;
  Tone.Transport.loop = true;
  Tone.Transport.setLoopPoints(0, "1m");

  useEffect(() => {
    return new Tone.Loop(() => {
      let currentBeat = Tone.Transport.position
        .split(":")
        .map((i) => parseInt(i));
      handleClock(currentBeat);
    }, "16n").start(0);
  });

  function runClock() {
    if (!isPlaying) {
      Tone.Transport.start();

      setIsPlaying(true);
    }
  }

  function stopClock() {
    Tone.Transport.stop();

    setIsPlaying(false);
    setClock(0);
  }

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

  return (
    <div className="App">
      <h1>Drum Machine</h1>
      <button onClick={runClock}>Start</button>
      <button onClick={stopClock}>Stop</button>
      <div>Clock:{clock}</div>
      <BassDrumRow clock={clock} />
      <SnareDrumRow clock={clock} />
      <ClosedHatRow clock={clock} />
    </div>
  );
}

export default App;
