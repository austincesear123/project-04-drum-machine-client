import "./Toolbar.css";

const Toolbar = ({
  clicked,
  initialClick,
  startStop,
  playState,
  bpm,
  handleBPM,
}) => {
  return (
    <>
      <div className="toolbar-container">
        <div className="toolbar-buttons">
          <button
            className={
              playState === "stopped" ? "btn btn-success" : "btn btn-danger"
            }
            onClick={startStop}
          >
            {playState === "stopped" ? (
              <i className="bi bi-play-fill"></i>
            ) : (
              <i className="bi bi-stop-fill"></i>
            )}
          </button>
        </div>
        <div className="bpm-display">
          BPM:
          <input
            type="number"
            value={bpm}
            min="1"
            max="999"
            placeholder={bpm}
            onChange={handleBPM}
          />
        </div>
      </div>
    </>
  );
};

export default Toolbar;
