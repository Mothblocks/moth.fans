import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { DataEntries } from "../data";

export const Data = (props: { data: DataEntries }) => {
  return (
    <div
      style={{
        fontSize: "2em",
      }}
    >
      <Helmet>
        <title>Data</title>
      </Helmet>

      <b>SS13 Data</b>

      <ul>
        {Object.entries(props.data).map(([key, datum]) => (
          <li key={key}>
            <Link to={`/data/${key}`}>{datum.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
