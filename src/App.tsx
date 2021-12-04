import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router";
import { Template } from "./components/Template";
import { Data } from "./pages/Data";
import { Datum } from "./pages/Datum";
import { Home } from "./pages/Home";
import { Moths } from "./pages/Moths";
import { MothVideo } from "./pages/MothVideo";
import data from "../data.json";
import { Context } from "./context";

export const App = () => {
  const [title, setTitle] = useState("");

  return (
    <div>
      <Context.Provider value={{ title, setTitle }}>
        <Helmet>
          <title>{title && `${title} - `}moth.fans</title>
        </Helmet>

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
      </Context.Provider>
    </div>
  );
};
