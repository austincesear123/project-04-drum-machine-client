import "./Square.css";

const Square = ({ active, value, onClick, instrument, note, index }) => {
  let squareClass = ["square "];

  if(index === 0 || index === 4 || index === 8 || index === 12){
    squareClass.push("one-beat ")
  }
  if (value) {
    if (instrument === "Kick") {
      squareClass.push("kick-active ");
    } else if (instrument === "Snare") {
      squareClass.push("snare-active ");
    } else if (instrument === "HiHat") {
      squareClass.push("hihat-active ");
    } else if (instrument === "Pluck") {
      squareClass.push("pluck-active ");
    } else if (instrument === "Polysynth") {
      if (note === "A3") {
        squareClass.push("polysynth-a3 ");
      } else if (note === "C4") {
        squareClass.push("polysynth-c4 ");
      } else if (note === "D4") {
        squareClass.push("polysynth-d4 ");
      } else if (note === "E4") {
        squareClass.push("polysynth-e4 ");
      } else if (note === "G4") {
        squareClass.push("polysynth-g4 ");
      } else if (note === "A4") {
        squareClass.push("polysynth-a4 ");
      }
      squareClass.push("polysynth-active ");
    }
  }
  if (active) {
    squareClass.push("timeline-active ");
  }

  return <div className={squareClass.join("")} onClick={onClick}></div>;
};

export default Square;
