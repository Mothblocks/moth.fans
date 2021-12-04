import { App } from "./src/App";
import cheerio from "cheerio";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import * as path from "path";

const BASE_URL = "https://moth.fans";

export async function build(Parcel, distDir, entry) {
  const bundler = new Parcel({
    entries: entry,
    mode: "production",
    targets: {
      default: {
        context: "browser",
        distDir,
        publicUrl: BASE_URL,
      },
    },
  });

  return bundler.run();
}

export async function buildDirectory(Parcel, distDir) {
  return build(Parcel, distDir, "./src/index.html");
}

export async function processFile(template, writeFile) {
  const routes = ["/"];
  const visitedRoutes = new Set(routes);

  while (routes.length > 0) {
    const route = routes.pop();
    visitedRoutes.add(route);
    console.log(`Processing ${route}`);

    const rendered = ReactDOMServer.renderToString(
      <StaticRouter location={route} basename="/">
        <App />
      </StaticRouter>
    );

    const $ = cheerio.load(template);
    $("#root").html(rendered);

    for (const link of $("a")) {
      const newRoute = link.attribs.href;

      if (/^\w+:\/\//.test(newRoute)) {
        continue;
      }

      if (!visitedRoutes.has(newRoute) && routes.indexOf(newRoute) === -1) {
        routes.push(newRoute);
      }
    }

    const filePath = routeToFilePath(route);
    console.log(`Writing to ${filePath}`);
    await writeFile(filePath, $.html());
  }
}

function routeToFilePath(route) {
  let current = "";

  for (const piece of route.split("/")) {
    if (piece.length === 0) {
      continue;
    }

    current = path.join(current, piece);
  }

  return path.join(current, "index.html");
}
