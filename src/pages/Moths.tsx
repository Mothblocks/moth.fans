import { Helmet } from "react-helmet";
import * as moths from "../../assets/moths/*";

export const Moths = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Helmet>
        <title>Moths</title>
      </Helmet>

      <h1>Moths</h1>

      {Object.values(moths).map((moth, index) => {
        return (
          <div key={moth}>
            <h2>Moth #{index + 1}</h2>
            <img
              style={{
                display: "inline-block",
                maxWidth: "700px",
              }}
              src={moth}
              alt="moth"
            />
            <hr />
          </div>
        );
      })}

      <h2>More moths...coming soon!</h2>
    </div>
  );
};
