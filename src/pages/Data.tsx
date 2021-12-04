import { Link } from "react-router-dom";
import { DataEntries } from "../data";

export const Data = (props: { data: DataEntries }) => {
  return (
    <div
      style={{
        fontSize: "2em",
      }}
    >
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
