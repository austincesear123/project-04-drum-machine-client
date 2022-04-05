import "./PolySynthRows.css";
import Square from "../Square/Square";
import audioProps from "../audioProps";
import React from "react";
import Visualizer from "../Visualizer/Visualizer";

const PolySynthRows = ({
  polySynthPattern,
  activeColumn,
  index,
  clicked,
  updatePolySynthPattern,
  polySynthMode,
  handlePolySynthMode,
  polySynthMute,
  handlePolySynthMute,
  polySynthSolo,
  handlePolySynthSolo,
}) => {
  return (
    <div className="polysynth-container">
      <div className="polysynth-toolbar">
        <div className="polysynth-title">Polysynth</div>
        <div className="polysynth-buttons">
          <button
            className={
              polySynthMute
                ? "btn btn-danger btn-sm"
                : "btn btn-secondary btn-sm"
            }
            onClick={handlePolySynthMute}
          >
            Mute
          </button>
          <button
            className={
              polySynthSolo
                ? "btn btn-primary btn-sm"
                : "btn btn-secondary btn-sm"
            }
            onClick={handlePolySynthSolo}
          >
            Solo
          </button>
        </div>
        <div className="polysynth-select">
          Sequencer Mode:
          <select
            className="form-select"
            aria-label="Polysynth mode"
            onChange={handlePolySynthMode}
          >
            <option value="Randomize" defaultValue>
              Randomize
            </option>
            <option value="Manual">Manual</option>
          </select>
        </div>
      </div>
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
                  index={x}
                  clicked={clicked}
                  polySynthMode={polySynthMode}
                  onClick={
                    polySynthMode === "Manual"
                      ? () => updatePolySynthPattern({ x, y, value })
                      : () => {
                          return null;
                        }
                  }
                />
              ))}
            </div>
          </React.Fragment>
        );
      })}
      <div className="polysynth-visualizer">
        <Visualizer instrument={"Polysynth"} />
      </div>
    </div>
  );
};

export default PolySynthRows;
