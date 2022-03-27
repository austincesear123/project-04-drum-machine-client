import "./App.css";
import * as Tone from "tone";
import { useEffect, useState } from "react";

const bassSynth = new Tone.MembraneSynth().toDestination();
// const loopBeat = new Tone.Loop();
// const part = new Tone.Part((time, value) => {
//   bassSynth.triggerAttackRelease(value.note, "8n", time, value.velocity);
// }, [
//   {time: "0:0", note: "C1", velocity: 1},
//   {time: "0:1", note: "C1", velocity: 0},
//   {time: "0:2", note: "C1", velocity: 1},
//   {time: "0:3", note: "C1", velocity: 0},
//   {time: "1:0", note: "C1", velocity: 1},
//   {time: "1:1", note: "C1", velocity: 0},
//   {time: "1:2", note: "C1", velocity: 1},
//   {time: "1:3", note: "C1", velocity: 0},
//   {time: "2:0", note: "C1", velocity: 1},
//   {time: "2:1", note: "C1", velocity: 0},
//   {time: "2:2", note: "C1", velocity: 1},
//   {time: "2:3", note: "C1", velocity: 0},
//   {time: "3:0", note: "C1", velocity: 1},
//   {time: "3:1", note: "C1", velocity: 0},
//   {time: "3:2", note: "C1", velocity: 1},
//   {time: "3:3", note: "C1", velocity: 0}
// ]).start(0);

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [clock, setClock] = useState(0);
  const [seq, setSeq] = useState([
    { time: "0:0", note: "C1", velocity: 1 },
    { time: "0:1", note: "C1", velocity: 0 },
    { time: "0:2", note: "C1", velocity: 1 },
    { time: "0:3", note: "C1", velocity: 0 },
    { time: "1:0", note: "C1", velocity: 1 },
    { time: "1:1", note: "C1", velocity: 0 },
    { time: "1:2", note: "C1", velocity: 1 },
    { time: "1:3", note: "C1", velocity: 0 },
    { time: "2:0", note: "C1", velocity: 1 },
    { time: "2:1", note: "C1", velocity: 0 },
    { time: "2:2", note: "C1", velocity: 1 },
    { time: "2:3", note: "C1", velocity: 0 },
    { time: "3:0", note: "C1", velocity: 1 },
    { time: "3:1", note: "C1", velocity: 0 },
    { time: "3:2", note: "C1", velocity: 1 },
    { time: "3:3", note: "C1", velocity: 0 },
  ]);

  Tone.Transport.bpm.value = 280;

  // let clock = '';
  // let event_id = Tone.Transport.scheduleRepeat((time) => {
  //   console.log(time)
  //   let currentBeat = Tone.Transport.position.split(":");
  //   setClock(parseInt(currentBeat[1]));
  // }, "4n");

  useEffect(() => {
    return new Tone.Part((time, value) => {
      console.log(time);
      bassSynth.triggerAttackRelease(value.note, "8n", time, value.velocity);
    }, seq).start(0);
  }, []);

  function runClock() {
    if (!isPlaying) {
      // loopBeat.set({
      //   callback: song,
      //   interval: "4n",
      // });
      // loopBeat.start();
      setIsPlaying(true);
      Tone.Transport.loop = true;
      Tone.Transport.setLoopPoints(0, "4m");
      Tone.Transport.start();
    }
  }

  function stopClock() {
    setIsPlaying(false);
    setClock(0);
    // loopBeat.dispose();
    Tone.Transport.loop = false;
    Tone.Transport.setLoopPoints(0);
    Tone.Transport.stop();
  }

  // function song(time) {
  //   console.log(time);
  //   let currentBeat = Tone.Transport.position
  //     .split(":")
  //     .map((i) => parseInt(i));
  //   console.log(currentBeat);
  //   handleClock(currentBeat);
  //   if (currentBeat[1] === 0 || currentBeat[1] === 2) {
  //     bassSynth.triggerAttackRelease("C1", "8n", time);
  //   }
  // }

  function handleClock(beat) {
    let beatArr = [parseInt(beat[0]) + 1, parseInt(beat[1]) + 1];
    if (beatArr[0] === 1) {
      setClock(beatArr[1]);
    } else if (beatArr[0] === 2) {
      setClock(beatArr[1] + 4);
    } else if (beatArr[0] === 3) {
      setClock(beatArr[1] + 8);
    } else if (beatArr[0] === 4) {
      setClock(beatArr[1] + 12);
    }
  }

  // function handleClick()

  const note = [];
  for (let i = 0; i < 16; i++) {
    note.push(
      <div key={i} className={clock === i + 1 ? "note red" : "note"}>
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
