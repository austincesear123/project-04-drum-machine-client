import "./App.css";
import * as Tone from "tone";
import { useEffect, useState } from "react";
import BassDrumRow from "./BassDrumRow/BassDrumRow";
import SnareDrumRow from "./SnareDrumRow/SnareDrumRow";

const blankSeq = [
  { time: "0:0:0", note: "C1", velocity: 0 },
  { time: "0:0:1", note: "C1", velocity: 0 },
  { time: "0:0:2", note: "C1", velocity: 0 },
  { time: "0:0:3", note: "C1", velocity: 0 },
  { time: "0:1:0", note: "C1", velocity: 0 },
  { time: "0:1:1", note: "C1", velocity: 0 },
  { time: "0:1:2", note: "C1", velocity: 0 },
  { time: "0:1:3", note: "C1", velocity: 0 },
  { time: "0:2:0", note: "C1", velocity: 0 },
  { time: "0:2:1", note: "C1", velocity: 0 },
  { time: "0:2:2", note: "C1", velocity: 0 },
  { time: "0:2:3", note: "C1", velocity: 0 },
  { time: "0:3:0", note: "C1", velocity: 0 },
  { time: "0:3:1", note: "C1", velocity: 0 },
  { time: "0:3:2", note: "C1", velocity: 0 },
  { time: "0:3:3", note: "C1", velocity: 0 },
];

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [clock, setClock] = useState(0);

  Tone.Transport.bpm.value = 140;
  Tone.Transport.loop = true;
  Tone.Transport.setLoopPoints(0, "1m");

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

  return (
    <div className="App">
      <h1>Drum Machine</h1>
      <button onClick={runClock}>Start</button>
      <button onClick={stopClock}>Stop</button>
      <div>Clock:{clock}</div>
      <BassDrumRow clock={clock} setClock={setClock} />
      <SnareDrumRow clock={clock} />
    </div>
  );
}

export default App;
