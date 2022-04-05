import "./MonoSynthRows.css"
import Visualizer from "../Visualizer/Visualizer";

const MonoSynthRows = () => {
  return (
    <div className="monosynth-container">
      <div>Monosynth</div>
      <Visualizer instrument={"Monosynth"} />
    </div>
  );
};

export default MonoSynthRows;
