import "./DrumRows.css";
import Square from "../Square/Square";

const drumMap = ["Kick", "Snare", "HiHat", "Pluck"];

const DrumRows = ({ activeColumn, pattern, setPattern }) => {
  return (
    <>
      <div className="drums-container">
        {pattern.map((row, y) => {
          return (
            <>
              <div className="drum-title" style={{gridRow: y+1}}>{drumMap[y]}</div>
              <div className="drum-squares" style={{gridRow: y+1}}>
                {row.map((value, x) => (
                  <Square
                    key={x}
                    active={activeColumn === x}
                    value={value}
                    onClick={() => setPattern({ x, y, value })}
                  />
                ))}
              </div>
              <div className="three"></div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default DrumRows;
