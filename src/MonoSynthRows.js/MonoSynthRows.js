import "./MonoSynthRows.css";
import Visualizer from "../Visualizer/Visualizer";

const MonoSynthRows = ({ monoSynthMute, handleMonoSynthMute }) => {
  return (
    <div className="monosynth-container">
      <div className="monosynth-toolbar">
        <div className="monosynth-title">Monosynth</div>
        <div className="monosynth-buttons">
          <button
            className={
              monoSynthMute
                ? "btn btn-danger btn-sm"
                : "btn btn-secondary btn-sm"
            }
            onClick={handleMonoSynthMute}
          >
            Mute
          </button>
        </div>
      </div>

      <Visualizer instrument={"Monosynth"} />
    </div>
  );
};

export default MonoSynthRows;
