import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import data from "../../data.json";

const NavBar = () => {
  return (
    <div className="navbar">
      <nav
        style={{
          border: "double black",
          fontSize: "16px",
          padding: "3px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "28px",
          }}
        >
          <Link
            to="/"
            style={{
              color: "green",
            }}
          >
            moth.fans
          </Link>
        </div>

        <hr />

        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          <Link to="/data">SS13 Data</Link>
        </div>

        <ul>
          {Object.entries(data).map(([key, datum]) => (
            <li key={key}>
              <Link to={`/data/${key}`}>{datum.name}</Link>
            </li>
          ))}
        </ul>

        <hr />

        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Moths
        </div>

        <ul>
          <li>
            <Link to="/moths">Moth Pictures</Link>
          </li>

          <li>
            <Link to="/moth-video">Moth VIDEO</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export const Template = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <NavBar />

      <div
        style={{
          flexGrow: 1,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
