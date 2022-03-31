import "./App.css";
import * as Tone from "tone";
import { useEffect, useState } from "react";
import BassDrumRow from "./BassDrumRow/BassDrumRow";
import SnareDrumRow from "./SnareDrumRow/SnareDrumRow";
import ClosedHatRow from "./ClosedHatRow/ClosedHatRow";
// import StartAudioContext from "startaudiocontext";

// const context = new AudioContext();
// Tone.start();

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [clock, setClock] = useState(0);
  // const [loop, setLoop] = useState({});

  // useEffect(() => {
  //   async function start() {
  //     await Tone.start();
  //   }
  //   start();
  // }, []);

  // useEffect(() => {
  //   StartAudioContext(Tone.context);
  //   StartAudioContext(context)
  //   Tone.Transport.bpm.value = 140;
  //   Tone.Transport.loop = true;
  //   Tone.Transport.setLoopPoints(0, "1m");
  //   return new Tone.Loop(() => {
  //     let currentBeat = Tone.Transport.position
  //       .split(":")
  //       .map((i) => parseInt(i));
  //     handleClock(currentBeat);
  //   }, "16n").start(0).stop("1m");
  // }, []);

  function runClock() {
    if (!isPlaying) {
      Tone.Transport.loop = true;
      Tone.Transport.loopStart = 0;
      Tone.Transport.loopEnd = 2;
      Tone.Transport.start("+0.1");

      setIsPlaying(true);
    }
  }

  function stopClock() {
    if (isPlaying) {
      Tone.Transport.stop();
      Tone.Transport.loop = false;
      Tone.Transport.loopEnd = 0;

      setIsPlaying(false);
      setClock(0);
    }
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
      {/* <SnareDrumRow clock={clock} /> */}
      {/* <ClosedHatRow clock={clock} /> */}
    </div>
  );
}

export default App;
