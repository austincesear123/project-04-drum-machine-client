import "./Square.css";

const Square = ({ active, value, onClick, instrument }) => {
  let squareClass = ["square "];
  if (value) {
    if (instrument === "Kick") {
      squareClass.push("kick-active ");
    } else if (instrument === "Snare") {
      squareClass.push("snare-active ");
    } else if (instrument === "HiHat") {
      squareClass.push("hihat-active ");
    } else if (instrument === "Pluck") {
      squareClass.push("pluck-active ");
    } else if (instrument === "PolySynth") {
      squareClass.push("polysynth-active ");
    }
  }
  if (active) {
    squareClass.push("timeline-active ");
  }

  return <div className={squareClass.join("")} onClick={onClick}></div>;
};

export default Square;
