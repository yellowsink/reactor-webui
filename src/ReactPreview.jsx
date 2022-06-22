import { transformer } from "./transform.js";
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

  // lmao two reacts
  const evaled = () => eseval(transformed(), { react, React: react });

  let root;

  createEffect(() => {
    try {
      const component = evaled();
      if (!component) return;
      const elem = react.createElement(component);

      root.render(elem);
    } catch {}
  });

  return <div ref={(ref) => (root = ReactDOMClient.createRoot(ref))} />;
};
