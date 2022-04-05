import "./DrumRows.css";
import Square from "../Square/Square";
import Visualizer from "../Visualizer/Visualizer";
import React from "react";

const drumMap = ["Kick", "Snare", "HiHat", "Pluck"];

const DrumRows = ({
  activeColumn,
  pattern,
  updatePattern,
  clicked,
  handleDrumsMute,
  drumsMute,
}) => {
  return (
    <div className="drum-container">
      <div className="drum-toolbar">
        <div className="drum-title">Drum Machine</div>
        <div className="drum-buttons">
          <button
            className={
              drumsMute ? "btn btn-danger btn-sm" : "btn btn-secondary btn-sm"
            }
            onClick={handleDrumsMute}
          >
            Mute
          </button>
        </div>
      </div>

      {pattern.map((row, y) => {
        return (
          <React.Fragment key={y}>
            <div className="drum-label">{drumMap[y]}</div>
            <div key={y} className="drum-row">
              {row.map((value, x) => (
                <Square
                  key={x}
                  active={activeColumn === x}
                  value={value}
                  onClick={() => updatePattern({ x, y, value })}
                  instrument={drumMap[y]}
                  index={x}
                  clicked={clicked}
                />
              ))}
            </div>
            <div className="drum-visualizer">
              <Visualizer instrument={drumMap[y]} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DrumRows;
