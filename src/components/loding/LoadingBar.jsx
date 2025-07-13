import { useState } from "react";
import { BarLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoadingBar = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#0000ff");

  return (
    <div className="sweet-loading" style={{ textAlign: "center", padding: "1rem" }}>
      {loading ? (
        <BarLoader
          color={color}
          loading={loading}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <button
            type="button"
            onClick={() => setLoading(!loading)}
            style={{ marginBottom: "1rem" }}
          >
            Toggle Loader
          </button>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              Loader Color:&nbsp;
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Color of the loader"
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default LoadingBar;
