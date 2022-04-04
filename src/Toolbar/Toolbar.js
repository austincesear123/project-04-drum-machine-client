import "./Toolbar.css";

const Toolbar = ({ clicked, initialClick, startStop, playState }) => {
  return (
    <>
      <div className="toolbar-container">
        <button
          className="btn btn-primary"
          style={{ display: !clicked ? "inline" : "none" }}
          onClick={initialClick}
        >
          First Click Here
        </button>
        <button
          className={playState === "stopped" ? "btn btn-success" : "btn btn-danger"}
          style={{ display: !clicked ? "none" : "inline" }}
          onClick={startStop}
        >
          {playState === "stopped" ? "Start" : "Stop"}
        </button>
      </div>
    </>
  );
};

export default Toolbar;
