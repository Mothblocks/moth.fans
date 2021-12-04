import { useEffect, useRef } from "react";
import { Datum as DatumEntry } from "../data";
import { useTitle } from "../useTitle";

export const Datum = (props: { datum: DatumEntry }) => {
  const { datum } = props;

  useTitle(datum.name);

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
  }, [outputRef]);

  return (
    <div>
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
