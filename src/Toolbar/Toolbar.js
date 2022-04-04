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
            className="btn btn-primary"
            style={{ display: !clicked ? "inline" : "none" }}
            onClick={initialClick}
          >
            First Click Here
          </button>
          <button
            className={
              playState === "stopped" ? "btn btn-success" : "btn btn-danger"
            }
            style={{ display: !clicked ? "none" : "inline" }}
            onClick={startStop}
          >
            {playState === "stopped" ? (
              <i className="bi bi-play-fill" width="16" height="16" viewBox="0 0 16 16"></i>
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
