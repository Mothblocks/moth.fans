import { Helmet } from "react-helmet";
import jigsaw from "../../assets/jigsaw.png";

export const MothVideo = () => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Helmet>
        <title>Moth Video</title>
      </Helmet>

      <h1 style={{ marginBottom: "0px" }}>Moth Video</h1>

      <h2 style={{ marginTop: "0px" }}>
        Powered by{" "}
        <span style={{ color: "red", textDecoration: "underline" }}>
          ADOBE FLASH
        </span>
      </h2>

      <div
        style={{
          alignItems: "center",
          background: "#f7f7f7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

          height: "250px",
          width: "425px",
        }}
      >
        <img src={jigsaw} />

        <p
          style={{
            color: "#646464",
            cursor: "default",
            fontFamily: "sans-serif",
            fontSize: "11px",
          }}
        >
          Adobe Flash Player is no longer supported.
        </p>
      </div>
    </div>
  );
};
