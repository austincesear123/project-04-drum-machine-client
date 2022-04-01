const Toolbar = ({ clicked, initialClick, startStop, playState }) => {
  return (
    <>
      <button
        style={{ display: !clicked ? "inline" : "none" }}
        onClick={initialClick}
      >
        First Click here
      </button>
      <button
        style={{ display: !clicked ? "none" : "inline" }}
        onClick={startStop}
      >
        {playState}
      </button>
    </>
  );
};

export default Toolbar;
