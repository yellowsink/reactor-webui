import { transformer } from "./swc.js";
import { createEffect, createSignal, Show } from "solid-js";
import eseval from "./eseval.js";
import react from "react";
import ReactDOMClient from "react-dom/client";
import MonacoEditor from "./MonacoEditor.jsx";

export default (props) => {
  const [err, setErr] = createSignal();

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
    } catch (e) {
      setErr(e);
    }
  };

  const evaled = () => {
    try {
      return eseval(`import * as React from "react";\n{${transformed()}}`, {
        react,
      }).default;
    } catch (e) {
      setErr(e);
    }
  };

  let rdRoot;

  createEffect(() => {
    try {
      const component = evaled();
      if (!component) return;
      const elem = react.createElement(component);

      // this is cancerous but its how you have to catch errors in react dom render()
      // and even then it still doesnt work great
      window.onerror = (e) => {
        setErr(e);
        return true;
      };

      setErr();
      rdRoot.render(elem);
    } catch (e) {
      setErr(e);
    }

    queueMicrotask(() => (window.onerror = null));
  });

  const refCb = (ref) =>
    (rdRoot = ReactDOMClient.createRoot(ref.attachShadow({ mode: "open" })));

  return (
    <>
      <div ref={refCb} style={{ display: err() ? "none" : "" }} />

      <Show when={err()}>
        <MonacoEditor value={err() + ""} readonly={true} />
      </Show>
    </>
  );
};
