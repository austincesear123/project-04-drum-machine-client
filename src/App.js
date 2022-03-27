import "./App.css";
import * as Tone from "tone";
import { useEffect, useState } from "react";

const bassSynth = new Tone.MembraneSynth().toDestination();
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

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [clock, setClock] = useState(0);
  const [seq, setSeq] = useState(defaultSeq);

  Tone.Transport.bpm.value = 140;

  useEffect(() => {
   return new Tone.Part((time, value) => {
      console.log(time);
      let currentBeat = Tone.Transport.position
        .split(":")
        .map((i) => parseInt(i));
      console.log(currentBeat);
      handleClock(currentBeat);
      bassSynth.triggerAttackRelease(value.note, "8n", time, value.velocity);
    }, seq).start();
  }, [seq]);

  function runClock() {
    if (!isPlaying) {
      setSeq(defaultSeq)
      setIsPlaying(true);
      Tone.Transport.loop = true;
      Tone.Transport.setLoopPoints(0, "1m");
      Tone.Transport.start();
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

  const note = [];
  for (let i = 0; i < 16; i++) {
    note.push(
      <div
        key={i}
        className={
          clock === i + 1
            ? "note red"
            : seq[i].velocity === 1
            ? "note green"
            : "note"
        }
      >
        {i + 1}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Drum Machine</h1>
      <button onClick={runClock}>Start</button>
      <button onClick={stopClock}>Stop</button>
      <div>Clock:{clock}</div>
      <div className="track">{note}</div>
    </div>
  );
}

export default App;
