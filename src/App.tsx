import React from "react";
import { Route, Routes } from "react-router";
import { Template } from "./components/Template";
import { Data } from "./pages/Data";
import { Datum } from "./pages/Datum";
import { Home } from "./pages/Home";
import { Moths } from "./pages/Moths";
import { MothVideo } from "./pages/MothVideo";
import data from "../data.json";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<Home />} />
          <Route path="/moths" element={<Moths />} />
          <Route path="/moth-video" element={<MothVideo />} />

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
