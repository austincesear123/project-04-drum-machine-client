import Square from "../Square/Square";

const DrumRows = ({ activeColumn, pattern, setPattern }) => {
  return (
    <>
      {pattern.map((row, y) => (
        <div key={y} style={{ display: "flex", justifyContent: "center" }}>
          {row.map((value, x) => (
            <Square
              key={x}
              active={activeColumn === x}
              value={value}
              onClick={() => setPattern({ x, y, value })}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default DrumRows;
