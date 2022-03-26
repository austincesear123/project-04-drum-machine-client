import "./App.css";
import * as Tone from "tone";
import { useEffect, useState } from "react";

const bassSynth = new Tone.MembraneSynth().toDestination();
const loopBeat = new Tone.Loop;

function App() {
  

  const [clock, setClock] = useState("");

  Tone.Transport.bpm.value = 140;


  // let clock = '';
  // let event_id = Tone.Transport.scheduleRepeat((time) => {
  //   console.log(time)
  //   let currentBeat = Tone.Transport.position.split(":");
  //   setClock(parseInt(currentBeat[1]));
  // }, "4n");

  function runClock() {
    loopBeat.set({
      callback: song,
      interval: "4n"
    })
    loopBeat.start();
    Tone.Transport.start();
  }

  function stopClock() {
    loopBeat.dispose();
    Tone.Transport.stop();
  }

  function song(time) {
    console.log(time)
    let currentBeat = Tone.Transport.position.split(":");
    setClock(parseInt(currentBeat[1]));
    bassSynth.triggerAttackRelease("C1", "8n", time);
  }

  return (
    <div className="App">
      <h1>Drum Machine</h1>
      <button onClick={runClock}>Start</button>
      <button onClick={stopClock}>Stop</button>
      <div>Clock:{clock + 1}</div>
      <div className="track">
        <div className={clock === 0 ? "note red" : "note"}>1</div>
        <div className={clock === 1 ? "note red" : "note"}>2</div>
        <div className={clock === 2 ? "note red" : "note"}>3</div>
        <div className={clock === 3 ? "note red" : "note"}>4</div>
      </div>
    </div>
  );
}

export default App;
