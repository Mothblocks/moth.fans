import { Link } from "react-router-dom";
import { DataEntries } from "../data";

export const Links = (props: { data: DataEntries }) => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        Data
        <ul>
          {Object.entries(props.data).map(([key, datum]) => (
            <li key={key}>
              <Link to={`/data/${key}`}>{datum.name}</Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};
