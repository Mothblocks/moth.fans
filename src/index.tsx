import { App } from "./App";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");
if (root === null) {
  throw new Error("Root element not found");
}

const BrowserApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const hotModule: typeof module & { hot?: unknown } = module;

if (root.hasChildNodes() && !hotModule.hot) {
  ReactDOM.hydrate(<BrowserApp />, root);
} else {
  ReactDOM.render(<BrowserApp />, root);
}
