import { transformer } from "./swc.js";
import { createEffect } from "solid-js";
import eseval from "./eseval.js";
import react from "react";
import ReactDOMClient from "react-dom/client";

export default (props) => {
  const transformed = () => {
    try {
      const res = transformer(props.code, {
        jsc: {
          target: "es2022",
          parser: {
            syntax: "ecmascript",
            jsx: true,
          },
        },
      });
      return res.code;
    } catch {}
  };

  const evaled = () => {
    try {
      return eseval(`import * as React from "react";\n{${transformed()}}`, {
        react,
      }).default;
    } catch {}
  };

  let rdRoot;

  createEffect(() => {
    try {
      const component = evaled();
      if (!component) return;
      const elem = react.createElement(component);

      rdRoot.render(elem);
    } catch {}
  });

  const refCb = (ref) =>
    (rdRoot = ReactDOMClient.createRoot(ref.attachShadow({ mode: "open" })));

  return <div ref={refCb} />;
};
