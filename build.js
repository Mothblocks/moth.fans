const { Parcel } = require("@parcel/core");
const fs = require("fs").promises;
const path = require("path");

const OUT_DIR = "dist-release";

async function main() {
  await fs.rm(OUT_DIR, { recursive: true }).catch(() => {});
  await fs.mkdir(OUT_DIR);

  const bundler = new Parcel({
    entries: "./generator.js",
    mode: "production",
    env: {
      NODE_ENV: "production",
    },
    targets: {
      default: {
        distDir: ".cache/generator",
      },
    },
  });

  console.log("Building...");

  await bundler.run();

  console.log("Built, requiring generator");

  const generator = require("./.cache/generator/generator.js");

  await generator.buildDirectory(Parcel, OUT_DIR);

  const indexFile = await fs.readFile("./dist/index.html", "utf8");
  await generator.processFile(indexFile, async (filename, data) => {
    filename = path.join(OUT_DIR, filename);
    const directory = path.dirname(filename);
    await fs.mkdir(directory, { recursive: true });
    return fs.writeFile(filename, data, "utf8");
  });
}

main();
