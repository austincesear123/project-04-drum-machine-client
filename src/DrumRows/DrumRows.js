import "./DrumRows.css";
import Square from "../Square/Square";
import Visualizer from "../Visualizer/Visualizer";
import React from "react";

const drumMap = ["Kick", "Snare", "HiHat", "Pluck"];

const DrumRows = ({ activeColumn, pattern, setPattern }) => {
  return (
    <div className="drum-container">
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
                  onClick={() => setPattern({ x, y, value })}
                  instrument={drumMap[y]}
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
