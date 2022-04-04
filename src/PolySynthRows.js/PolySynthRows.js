import "./PolySynthRows.css";
import Square from "../Square/Square";
import audioProps from "../audioProps";
import React from "react";

const PolySynthRows = ({ polySynthPattern, activeColumn }) => {
  return (
    <div className="polysynth-container">
      <div className="polysynth-title">Polysynth</div>
      {polySynthPattern.map((row, y) => {
        return (
          <React.Fragment key={y}>
            <div className="polysynth-notes">{audioProps.notes[y]}</div>
            <div key={y} className="polysynth-row">
              {row.map((value, x) => (
                <Square
                  key={x}
                  active={activeColumn === x}
                  value={value}
                  instrument={"Polysynth"}
                  note={audioProps.notes[y]}
                  // onClick={() => setPattern({ x, y, value })}
                />
              ))}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PolySynthRows;
