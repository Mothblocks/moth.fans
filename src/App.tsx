import React from "react";
import { Outlet, Route, Routes } from "react-router";
import { Links } from "./components/Links";
import { Data } from "./pages/Data";
import { Datum } from "./pages/Datum";
import { Home } from "./pages/Home";
import data from "../data.json";

const Index = () => {
  return (
    <div>
      <Links data={data} />

      <Outlet />
    </div>
  );
};

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />

          <Route path="data">
            <Route index element={<Data data={data} />} />

            {Object.entries(data).map(([key, value]) => (
              <Route key={key} path={key} element={<Datum datum={value} />} />
            ))}
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
