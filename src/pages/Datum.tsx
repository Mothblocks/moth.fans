import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Datum as DatumEntry } from "../data";
import moth_flying2 from "url:../../assets/moth_flying2.gif";

export const Datum = (props: { datum: DatumEntry }) => {
  const { datum } = props;

  // We need to execute script tags from the output.
  // This won't run during SSG, but it doesn't have to.
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = outputRef.current!;
    for (const script of element.querySelectorAll("script")) {
      const scriptElement = document.createElement("script");
      scriptElement.textContent = script.textContent;
      element.appendChild(scriptElement);
    }
  }, [datum, outputRef]);

  return (
    <div>
      <Helmet>
        <title>{datum.name}</title>

        <meta property="og:title" content={datum.name} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={moth_flying2} />
        <meta
          property="og:url"
          content={`https://moth.fans/data/${datum.name}`}
        />
      </Helmet>

      <h1>{datum.name}</h1>
      <p>Last updated: {datum.last_updated}</p>

      <div
        ref={outputRef}
        className="data-output"
        dangerouslySetInnerHTML={{ __html: datum.output }}
      />
    </div>
  );
};
